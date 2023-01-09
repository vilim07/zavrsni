import { useState, useEffect } from "react";
import { onSnapshot, collection, addDoc, serverTimestamp, updateDoc, doc, orderBy, query } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import Image from "next/image";
export const Chat = ({ chat }) => {

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState([])
    const user = auth.currentUser;
    const ref = collection(db, "Chats/" + chat.id + "/Messages");
    let q = query(ref, orderBy("sent", "asc"))
    const lastRef = doc(db, "Chats/" + chat.id);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (input.length) {
            await addDoc(ref, {
                sender: user.uid,
                content: input,
                sent: serverTimestamp()
            });
            await updateDoc(lastRef, {
                lastActivity: serverTimestamp(),
                lastContent: {
                    message: input,
                    seen: false,
                }
            });
            setInput([])

        }

    }


    useEffect(() => {
        const unsub = onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
            setMessages(snapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id })))
        })
    }, [chat]);

    return (
        <>
            <div className="flex flex-col lg:w-3/4 bg-base-100 prose max-w-none h-[70vh]">
                {chat.id != null ? (
                    <>
                        <div className="bg-base-100 px-10 py-4 border-b border-b-base-300">
                            <h3 className="m-0 ">{chat.user.name}</h3>
                        </div>
                        <div className="lg:px-10 pt-3 pb-4 mt-auto flex flex-col-reverse h-full overflow-y-auto">
                            {messages.length == 0 ?
                                (
                                    <h3 className=" py-2 px-4 w-fit rounded-xl bg-base-300">Currently there are no messages! <br /> Write something ;)</h3>
                                ) :
                                (
                                    <ul className="mt-auto w-full pl-0">
                                        {messages.map(message =>
                                            <li key={message.id} className={"py-2 px-4 w-fit flex flex-wrap rounded-xl max-w-[70%] " + (user.uid == message.sender ? "ml-auto w-fit flex-row-reverse" : "")}>
                                                <div className="overflow-hidden w-[24px] h-[24px] rounded-full">
                                                <Image
                                                    src={user.uid == message.sender ? user.photoURL : chat.user.picture}
                                                    alt="User Image"
                                                    width="24"
                                                    height="24"
                                                />
                                                </div>
                                                <div className={"py-2 px-4 mx-2 w-fit flex flex-wrap rounded-xl " + (user.uid == message.sender ? " w-fit bg-primary" : "bg-base-300")}>{message.content}</div>
                                            </li>
                                        )}
                                    </ul>
                                )}

                        </div>
                        <form className="px-3 mb-4 flex" action="" onSubmit={handleSubmit}>
                            <input type="text" value={input} placeholder="Start typing..." className="input rounded-full input-bordered w-full mr-2" onChange={e => setInput(e.target.value)} />
                            <button className="btn btn-circle" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-center my-auto">Open a chat</h2>
                    </>
                )}
            </div>
        </>

    )
}