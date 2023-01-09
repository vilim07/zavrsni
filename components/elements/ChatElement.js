import Image from "next/image";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";

export const ChatElement = ({ chat, activeChat, setActiveChat }) => {

    const [oUser, setOUser] = useState(null);

    useEffect(() => {
        const fetchUser = async (snap) => {
            const other = doc(db, "Users", snap.users.find(element => element != auth.currentUser.uid));
            const otherData = await getDoc(other);
            setOUser(otherData.data())
        }

       fetchUser(chat);

    }, []);


    const clickHanlder = () =>{
        setActiveChat({
            id: chat.id,
            user: oUser
        })
    }

    return (
        <>
        {oUser ? (
            <li className={"flex px-4 py-2 xl:px-8 xl:py-4 border-r border-r-base-300 cursor-pointer transition " + (chat.id == activeChat.id ? "bg-primary" : "bg-base-100 hover:bg-base-200")} onClick={()=>{clickHanlder()}}>
            <div className="w-14 h-14 relative overflow-hidden rounded-full lg:mr-8">
                <Image
                    src={oUser.picture}
                    alt="User Image"
                    layout='fill'
                />
            </div>
            <div className="items-center prose hidden md-flex">   
                <h3>{oUser.name}</h3>
            </div>
        </li>
        ):
        null}
        </>
    )
}