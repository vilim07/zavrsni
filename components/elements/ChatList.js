import { query } from "firebase/database";
import { collection, doc, getDoc, getDocs, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChatElement } from "./ChatElement";

function ChatList({ activeChat, setActiveChat }) {
    const user = auth.currentUser;

    const chatsRef = collection(db, "Chats");
    let q = query(chatsRef, where("users", "array-contains", user.uid))

    const [chats, setChats] = useState({ chatsMap: [], state: "waiting" })


    useEffect(() => {
        const unsub = onSnapshot(q, { includeMetadataChanges: true }, async (snapshot) => {
            setChats(snapshot.docs.map(snap => Object.assign(snap.data(), { id: snap.id })))
        })
    }, []);



    return (
        <>

            {(chats.length > 0 && chats.state != "waiting") ? (
                <motion.ul className="w-fit max-w-full flex flex-row lg:flex-col lg:w-1/4 rounded-tr-xl lg:rounded-tr-none lg:rounded-bl-xl lg:overflow-hidden lg:overflow-y-auto overflow-x-auto h-fit max-h-[70vh]">
                    {chats.map((chat, i) =>
                        <ChatElement key={chat.id} chat={chat} activeChat={activeChat} setActiveChat={setActiveChat} />
                    )}
                </motion.ul>
            ) :
                <>
                    <div className="prose mx-auto mt-16 text-center">
                        <h2>Nobody here but us chickens 🐤</h2>
                    </div>
                </>
            }
        </>
    )
}

export default ChatList