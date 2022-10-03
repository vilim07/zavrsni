import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { collection, getFirestore, where, query, onSnapshot, limit, startAfter, orderBy, getDocs } from "firebase/firestore";
import Card from "./elements/Card";
import { useEffect, useState, useContext, useRef } from "react";
import { auth } from "../firebase/firebase";
import React from "react";
import { AlbumForm } from "./elements/AlbumForm";
import QueryContext from "../contexts/QueryContext";
import CardMenu from "./elements/CardMenu";
import CardShowcase from "./elements/CardShowcase";

export default function Collection() {

    const db = getFirestore();

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

    const loadMoreVinylScroll = async () => {

        if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
            const q1 = query(collection(db, "Vinyls"), where("Owner", "==", user.uid), limit(6), orderBy("Album"), startAfter(queryLast));
            const newDocs = await getDocs(q1);
            if (newDocs.docs.length != 0) {
                setVinyls(prevState => [...prevState, ...newDocs.docs.map(doc => Object.assign(doc.data(), { id: doc.id }))])
                setQueryLast(newDocs.docs[newDocs.docs.length - 1])
            }
            else {
                window.removeEventListener("scroll", loadMoreVinylScroll);
            }

        }

    }

    ///FETCH VINYL & LISTEN SCROLL

    const { searchQuery, setSearchQuery } = useContext(QueryContext);
    const [queryLast, setQueryLast] = useState([]);



    useEffect(() => {
        let q;
        if (searchQuery.keywords[0].length > 0) {
            q = query(collection(db, "Vinyls"), where("Owner", "==", user.uid), where("Indices", "array-contains-any", searchQuery.keywords), limit(6));
        }
        else {
            q = query(collection(db, "Vinyls"), where("Owner", "==", user.uid), orderBy("Album"), limit(26));
        }
        const unsub = onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
            setVinyls(snapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id })))
            setQueryLast(snapshot.docs[snapshot.docs.length - 1])
        })

        window.addEventListener("scroll", loadMoreVinylScroll);
        return () => {
            window.removeEventListener("scroll", loadMoreVinylScroll);
        };

    }, [searchQuery])



    ////CARD CLICK
    const cardClickHandler = (e, id) => {
        const x = e.target.getBoundingClientRect().right + 240;
        setCardMenuShown(id);
        if (x > window.innerWidth) {
            setMenuOutside(x - window.innerWidth)
        }
        else {
            setMenuOutside(false)
        }

    }

    return (
        <LayoutGroup>
            <div className="control-ribbon pt-5">
                <AlbumForm />
            </div>

            {vinyls.length > 0 ?
                (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 pt-10 pb-40"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >

                        <AnimatePresence>
                            {vinyls.map(vinyl =>
                                <>
                                    <motion.div layoutId={vinyl.id} className={"relative "} key={vinyl.id} variants={cardItem} onClick={(e) => cardClickHandler(e, vinyl.id)}>
                                        <Card album={vinyl.Album} artwork={vinyl.Artwork} year={vinyl.Year} artist={vinyl.Artist}
                                            selected={cardMenuShown == vinyl.id}
                                            open={openCard.id == vinyl.id}
                                        />
                                        <AnimatePresence>
                                            <motion.div>
                                                {cardMenuShown == vinyl.id && (
                                                    <CardMenu id={vinyl.id} outside={menuOutside} selected={cardMenuShown == vinyl.id} openCardHandler={openCardHandler} />
                                                )}
                                            </motion.div>
                                        </AnimatePresence>

                                    </motion.div>
                                    {openCard.id == vinyl.id &&
                                            <CardShowcase id={vinyl.id} album={vinyl.Album} artist={vinyl.Artist} year={vinyl.Year} artwork={vinyl.Artwork} setOpenCard={setOpenCard}/>
                                    }
                                </>
                            )}


                        </AnimatePresence>


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