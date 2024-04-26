import { collection, setDoc, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "./firebaseSetup";

export const addWalk = async (walk) => {
  try {
    const docRef = await addDoc(collection(db, "walks"), walk);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export const getWalks = async () => {
  try {
    const walks = [];
    const querySnapshot = await getDocs(collection(db, "walks"));
    querySnapshot.forEach((doc) => {
      walks.push({ id: doc.id, ...doc.data() });
    });
    return walks;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

export const getWalk = async (id) => {
  try {
    const docRef = doc(db, "walks", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("No such document!");
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
}

export const updateWalk = async (id, walk) => {
  try {
    const docRef = doc(db, "walks", id);
    await updateDoc(docRef, walk);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export const deleteWalk = async (id) => {
  try {
    await deleteDoc(doc(db, "walks", id));
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}