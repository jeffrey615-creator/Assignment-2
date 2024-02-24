import { collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"; 
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
      const docRef = doc(database, "activities", id); // Correctly get a reference to the document
      await deleteDoc(docRef); // Delete the document
      console.log("Document successfully deleted!");
    } catch (err) {
      console.error("Error removing document: ", err);
    }
  }

 export async function updateInDB(id, data) {
    try {
        const docRef = doc(database, "activities", id);
        await updateDoc(docRef, data);
        console.log("Document updated with ID: ", id);
        // Additional logic post-update, if necessary
    } catch (err) {
        console.error("Error updating document: ", err);
    }
}