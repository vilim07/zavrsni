import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
export const removeAlbum = async (id) => {

    await deleteDoc(doc(db, "Vinyls", id));
    console.log("works");


}

