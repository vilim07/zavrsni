import { query } from "firebase/database";
import { collection, doc, getDoc, getDocs, where } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function ChatList({ }) {
    const user = auth.currentUser;
    const chatsRef = collection(db, "Chats");
    const [chats, setChats] = useState({ chatsMap: [], state: "waiting" })
    const [users, setUsers] = useState([])

    let q = query(chatsRef, where("users", "array-contains", user.uid))
    
    useEffect(() => {

        const fetchUser = async (snap) =>{
            const other = doc(db, "Users", snap.users.find(element => element != user.uid));
            const otherData = await getDoc(other);
            return(otherData.data())
        }

        const fetchData = async () => {
            const querySnapshot = await getDocs(q);
            const tmp = querySnapshot.docs.map(snap => Object.assign(snap.data(), { id: snap.id }))

            tmp.forEach( async (snap, i) => {
                const userData = await fetchUser(snap);
                console.log(userData);
                setUsers(current => [...current, userData])
            });

            setChats(tmp)
            
        }

        fetchData();
    }, []);


    useEffect(() => {
        console.log(chats[0]);  
    }, [chats]);
    
    useEffect(() => {
        console.log(users);  
    }, [users]);

    return (
        <>

            {(chats.length > 0 && users.length > 0)  ? (
                <motion.div>
                    {chats.map((chat, i) =>
                        <motion.div key={chat.id}>
                            <h2>{chat.id}</h2>
                            <h2>{users[i].name}</h2>

                        </motion.div>
                    )}

                </motion.div>
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