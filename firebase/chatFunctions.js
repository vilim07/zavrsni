import { collection, where, query, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from 'next/router'
import { auth, db } from "./firebase";



export const contactOwner = async (owner, router) => {

    const user = auth.currentUser;
    const users = [owner, user.uid].sort();
    console.log(users);
    const chats = collection(db, "Chats")
    let q = query(chats, where("users", "in", [users]))


    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs.length);

    if (querySnapshot.docs.length == 0){
        await addDoc(collection(db, "Chats"), {
            users: users,
            lastActivity: serverTimestamp(),
            lastContent: {
                message: "",
                sender: user.uid,
                seen: true
            },
            registered: serverTimestamp()
        });
    }
    router.push("/messanger")


}

