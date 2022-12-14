import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";


export const removeAlbum = async (id) => {
    await deleteDoc(doc(db, "Vinyls", id));
}

export const toggleTrade = async (id, state) => {
    const docRef = doc(db, "Vinyls", id);
    await updateDoc(docRef, {
        Trade: state
    });
}