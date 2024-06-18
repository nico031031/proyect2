// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
// Librería que permite utilizar funciones de Firestore
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLhKJ9AeVQ4lY2LcVoH7mxXtlvGr00ljs",
    authDomain: "proyecto1-482d1.firebaseapp.com",
    projectId: "proyecto1-482d1",
    storageBucket: "proyecto1-482d1.appspot.com",
    messagingSenderId: "963821766843",
    appId: "1:963821766843:web:9b55d534f815bf6665419e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const save = (consola) => {
    addDoc(collection(db, 'Consolas'), consola)
}

export const getData = (data) => {
    onSnapshot(collection(db, 'Consolas'), data)
}

export const eliminar = (id) => {
    deleteDoc(doc(db, 'Consolas', id))
}

export const obtener = (id) => getDoc(doc(db, 'Consolas', id))

export const update = (id, consola) => {
    updateDoc(doc(db, 'Consolas', id), consola)
}
