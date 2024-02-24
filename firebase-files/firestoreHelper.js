import { collection, addDoc } from "firebase/firestore"; 
import { database } from "./firebaseSetup";

export async function writeToDB (data){
    try {
        await addDoc(collection(database, "activities"), data);
    }
    catch (err) {
        console.log(err)
    }
 }

export async function deleteFromDB(id) {
    try {
      await deleteDoc(doc(database, "goals", id));
    } catch (err) {
      console.log(err);
    }
 }