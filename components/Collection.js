import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { collection, where, query, onSnapshot, limit, startAfter, orderBy, getDocs } from "firebase/firestore";
import Card from "./elements/Card";
import { useEffect, useState, useContext } from "react";
import { auth } from "../firebase/firebase";
import React from "react";
import { AlbumForm } from "./elements/AlbumForm";
import QueryContext from "../contexts/QueryContext";
import CardMenu from "./elements/CardMenu";
import { db } from "../firebase/firebase";

export default function Collection({marketPage=false}) {


    const [vinyls, setVinyls] = useState({ vinylsMap: [], state: "waiting" })

    const user = auth.currentUser;
    const [cardMenuShown, setCardMenuShown] = useState(false);
    const [menuOutside, setMenuOutside] = useState(false);
    const [openCard, setOpenCard] = useState(false);


    ////ANIMATIONS

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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

    useEffect(() => {
        setCardMenuShown(false)
    }, [openCard]);


    const openCardHandler = (id, state) => {
        const match = vinyls.filter(function (entry) { return entry.id === id; })[0]
        setOpenCard(Object.assign(match, { state: state }))
    }

    ////OUTSIDE CLICK

    useEffect(() => {
        document.body.addEventListener("click", onClickOutside);
        return () => document.removeEventListener("click", onClickOutside);
    }, []);


    const onClickOutside = (e) => {
        if (!e.target.parentNode.closest(".card")) {
            setCardMenuShown(false)
        }
    };

    ////CARD CLICK
    const cardClickHandler = (e, id) => {
        setCardMenuShown(id);
        const x = e.target.getBoundingClientRect().right + 240;
        if (x > window.innerWidth) {
            setMenuOutside(true)
        }
        else {
            setMenuOutside(false)
        }
    }

    ////

    const loadMoreVinylScroll = async () => {
         if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
            let q1;

            if (searchQuery.keywords[0].length > 0) {
                if (!marketPage){
                    q1 = query(collection(db, "Vinyls"), where("Owner", "==", user.uid), where("Indices", "array-contains-any", searchQuery.keywords), limit(6), orderBy("Album"), startAfter(queryLast));
                }
                else{
                    q1 = query(collection(db, "Vinyls"), where("Owner", "!=", user.uid), where("Trade", "==", true), where("Indices", "array-contains-any", searchQuery.keywords) , limit(6), orderBy("Owner"), orderBy("Album"), startAfter(queryLast));
                }
            }
            else {
                if (!marketPage){
                    q1 = query(collection(db, "Vinyls"), where("Owner", "==", user.uid), limit(6), orderBy("Album"), startAfter(queryLast));
                }
                else{
                    q1 = query(collection(db, "Vinyls"), where("Owner", "!=", user.uid), where("Trade", "==", true), limit(6), orderBy("Owner"), orderBy("Album"), startAfter(queryLast));
                }
            }
            
            const newDocs = await getDocs(q1);
            if (newDocs.docs.length != 0) {
                setVinyls(prevState => [...prevState, ...newDocs.docs.map(doc => Object.assign(doc.data(), { id: doc.id }))])
                queryLast = (newDocs.docs[newDocs.docs.length - 1]);
            }
            else {
                window.removeEventListener("scroll", loadMoreVinylScroll);
            }
        }
    }

    ///FETCH VINYL & LISTEN SCROLL

    const { searchQuery } = useContext(QueryContext);
    let queryLast;



    useEffect(() => {
        let q;
        if (searchQuery.keywords[0].length > 0) {
            if (!marketPage){
                q = query(collection(db, "Vinyls"), where("Owner", "==", user.uid), where("Indices", "array-contains-any", searchQuery.keywords), limit(6));
            }
            else{
                q = query(collection(db, "Vinyls"), where("Owner", "!=", user.uid), where("Trade", "==", true), where("Indices", "array-contains-any", searchQuery.keywords), limit(6));
            }
        }
        else {
            if (!marketPage){
                q = query(collection(db, "Vinyls"), where("Owner", "==", user.uid), orderBy("Album"), limit(26));
            } 
            else{
                q = query(collection(db, "Vinyls"), where("Owner", "!=", user.uid), where("Trade", "==", true), orderBy("Owner"), orderBy("Album"), limit(26));
            }
        }

        const unsub = onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
            setVinyls(snapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id })))
            queryLast= (snapshot.docs[snapshot.docs.length - 1]);
            if( snapshot.docs.length > 0){
                window.addEventListener("scroll", loadMoreVinylScroll);
            }
        })

        return () => {
            window.removeEventListener("scroll", loadMoreVinylScroll);
        };

    }, [searchQuery])




    return (
        <LayoutGroup>
            <div className="control-ribbon pt-5">
                <AlbumForm market={marketPage}/>
            </div>
            {vinyls.length > 0 ?
                (
                    <motion.div layout className="grid max-[400px]:px-6 max-[400px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 gap-y-4 sm:gap-6 pt-10 pb-40"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        <AnimatePresence>
                            {vinyls.map(vinyl =>
                                    <motion.div layoutId={vinyl.id} className="relative h-full" variants={cardItem} onClick={(e) => cardClickHandler(e, vinyl.id)} key={vinyl.id}>
                                        <Card album={vinyl.Album} artwork={vinyl.Artwork} year={vinyl.Year} artist={vinyl.Artist}
                                            selected={cardMenuShown == vinyl.id}
                                            forTrade={vinyl.Trade}
                                            marketPage={marketPage}
                                        />
                                        <AnimatePresence>
                                            <motion.div>
                                                {cardMenuShown == vinyl.id && (
                                                    <CardMenu id={vinyl.id} 
                                                    outside={menuOutside} 
                                                    forTrade={vinyl.Trade} 
                                                    marketPage={marketPage} 
                                                    owner={vinyl.Owner}/>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </motion.div>

                            )}
                        </AnimatePresence>


                    </motion.div>
                )
                :
                <>
                    {vinyls.length == 0 && vinyls.state != "waiting" &&
                        (
                            <div className="prose mx-auto mt-16 text-center">
                                <h2>Nobody here but us chickens 🐤</h2>
                            </div>
                        )}
                </>
            }
        </LayoutGroup>
    )
}