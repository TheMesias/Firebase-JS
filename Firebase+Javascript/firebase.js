
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHNb9pkmhpTFjFGHKx3eWppSOOJovZ65A",
  authDomain: "bdjuegos-ff280.firebaseapp.com",
  projectId: "bdjuegos-ff280",
  storageBucket: "bdjuegos-ff280.appspot.com",
  messagingSenderId: "726004091477",
  appId: "1:726004091477:web:9d062a269bc9688e81a2dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(); 

export const saveTask = (name,surname,email,age,gen) => {
    addDoc(collection(db, 'players'), {name,surname,email,age,gen})
}

export const getTasks = () => getDocs(collection(db, "players"));

export const onGetTasks = (callback) =>  onSnapshot(collection(db, 'players'), callback)


export const deleteTask = (id) => deleteDoc(doc(db, "players", id));

export const getTask = (id) => getDoc(doc(db, "players", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "players", id), newFields);
