import { query } from "firebase/database";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChatElement } from "./ChatElement";

function ChatList({ setActiveChat }) {
    const user = auth.currentUser;
    const chatsRef = collection(db, "Chats");
    const [chats, setChats] = useState({ chatsMap: [], state: "waiting" })
    const [users, setUsers] = useState([])

    let q = query(chatsRef, where("users", "array-contains", user.uid))

    useEffect(() => {

        const fetchUser = async (snap) => {
            const other = doc(db, "Users", snap.users.find(element => element != user.uid));
            const otherData = await getDoc(other);
            return (otherData.data())
        }

        const fetchData = async () => {
            const querySnapshot = await getDocs(q);


            const tmp = querySnapshot.docs.map(snap => Object.assign(snap.data(), { id: snap.id }))
            tmp.forEach(async (snap, i) => {
                const userData = await fetchUser(snap);
                if (i == 0) {
                    setActiveChat({
                        ref: querySnapshot.docs[0].id,
                        user: userData,
                    })
                }
                setUsers(current => [...current, userData])
            });


            setChats(tmp)

        }

        fetchData();
    }, []);





    return (
        <>

            {(chats.length > 0 && users.length > 0) ? (
                <motion.ul>
                    {chats.map((chat, i) =>
                        <ChatElement key={chat.id} oUser={users[i]} chat={chat} user={user.uid} />
                    )}

                </motion.ul>
            ) :
                <>
                    {chats.length == 0 && chats.state != "waiting" &&
                        (
                            <div className="prose mx-auto mt-16 text-center">
                                <h2>Nobody here but us chickens 🐤</h2>
                            </div>
                        )
                    }
                </>
            }
        </>
    )
}

export default ChatList