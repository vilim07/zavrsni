import { motion, LayoutGroup } from "framer-motion";
import { collection, getFirestore, where, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Card from "./elements/Card";
import { useEffect, useState, useContext } from "react";
import { auth } from "../firebase/firebase";
import React from "react";
import { AlbumForm } from "./elements/AlbumForm";
import QueryContext from "../contexts/QueryContext";



export default function Collection() {

    const db = getFirestore();

    const [vinyls, setVinyls] = useState({ vinylsMap: [], state: "waiting" })

    const user = auth.currentUser;
    const [newCard, setNewCard] = useState([]);

    ////ANIMATIONS

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
            }
        }
    }

    const cardItem = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                duration: 1
            }
        }
    }

    ////


    const removeVinyl = async(id)=>{
        await deleteDoc(doc(db, "Vinyls", id));
        console.log("works");
    }


    ///FETCH VINYL

    const { searchQuery, setSearchQuery } = useContext(QueryContext);


    useEffect(() => {
        let q;
        if (searchQuery.keywords[0].length > 0){
            q = query(collection(db, "Vinyls"), where("Owner", "==", user.uid), where("Indices", "array-contains-any", searchQuery.keywords ));
        }
        else{
            q = query(collection(db, "Vinyls"), where("Owner", "==", user.uid));
        }
        onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
            setVinyls(snapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id })))
        })
        console.log(searchQuery.keywords);

    }, [searchQuery])


    return (
        <LayoutGroup>
            <div className="control-ribbon pt-5">
                <AlbumForm />
            </div>

            {vinyls.length > 0 ?
                (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 py-10"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >

                        <LayoutGroup>

                            {vinyls.map(vinyl =>
                                <motion.div layout key={vinyl.id} variants={cardItem} onClick={()=>{removeVinyl(vinyl.id)}}>
                                    <Card album={vinyl.Album} artwork={vinyl.Artwork} year={vinyl.Year} artist={vinyl.Artist} />
                                </motion.div>
                            )}
                        </LayoutGroup>

                    </motion.div>
                )
                :
                <>
                    {vinyls.length == 0 && vinyls.state != "waiting" &&
                        (
                            <>
                                <h2>Nobody here but us chickens 🐤</h2>
                            </>
                        )}
                </>

            }
        </LayoutGroup>
    )
}