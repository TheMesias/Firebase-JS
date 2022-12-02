import {onGetTasks,
saveTask,
deleteTask,
getTask,
updateTask,
getTasks} from './firebase.js'

const taskContainer =  document.getElementById('tasks-container')
const taskForm = document.getElementById('task-form')

let editStatus = false; 
let id = ""; 
window.addEventListener('DOMContentLoaded',async () => {
   
    onGetTasks((querySnapshot) => {
        let html = ''
        querySnapshot.forEach(doc => {
            const player = doc.data()
            html += `
                
                <div class="card" style="width: 23%;">
                <div class="img">    
                    <img class="card-img-top" src=${"./img.png"} alt="Card image cap">
                </div>
                    <div class="card-body">
                        <h5 class="card-title">${player.name}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${player.surname}</li>
                        <li class="list-group-item">${player.email}</li>
                        <li class="list-group-item">${player.age}</li>
                    </ul>
                    <div class="card-body">
                        <button class='btn-delete' data-id=${doc.id}>Eliminar</button>
                        <button class='btn-edit' data-id=${doc.id}>Editar</button>
                    </div>
                </div>
            `
    
        })
    
        taskContainer.innerHTML = html; 
        const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({target: {dataset}}) => {
               deleteTask(dataset.id)
            })
        })

        const btnsEdit = taskContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            try {
              const doc = await getTask(e.target.dataset.id);
              const task = doc.data();

              taskForm['name'].value = task.name
              taskForm['surname'].value = task.surname
              taskForm['email'].value = task.email
              taskForm['age'].value = task.age
              taskForm['gen'].value = task.gen
    
              editStatus = true;
              id = doc.id;
              taskForm["btn-task-save"].innerText = "Actualizar";
            } catch (error) {
              console.log(error);
            }
          });
        });
    })

})


taskForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const name = taskForm['name'] 
    const surname = taskForm['surname'] 
    const email = taskForm['email'] 
    const age = taskForm['age'] 
    const gen = taskForm['gen'] 


    if (!editStatus) {
        await saveTask(name.value,surname.value,email.value,age.value,gen.value);
      } else {
        await updateTask(id, {
          name: name.value,
          surname: surname.value,
          email: email.value,
          age: age.value,
          gen: gen.value,
        });
  
        editStatus = false;
        id = "";
        taskForm["btn-task-save"].innerText = "Save";
    }

    taskForm.reset()
})