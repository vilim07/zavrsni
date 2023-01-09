import { ImageInput } from "./ImageInput"
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { uploadNewAlbum } from "../../firebase/addAlbum"

const cardForm = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            duration: 0.4
        }
    }
}


export const AlbumForm = ({market}) => {

    const [art, setArt] = useState("");
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [year, setYear] = useState("");



    const [showCardForm, setShowCardForm] = useState(false);



    let forTrade = false;
    if (market == true){
        forTrade = true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        uploadNewAlbum(title,artist,year,art,forTrade);
        setShowCardForm(false)
    }



    return (
        <>
            <motion.button layout className="btn bg-primary btn-circle" onClick={() => setShowCardForm(!showCardForm)}>
                {showCardForm == false ?
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    ) :
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                    )
                }

            </motion.button>
            {showCardForm == true &&
                (
                    <motion.div layout className="bg-base-100 p-8 sm:w-fit mt-5 rounded-md max-w-full" variants={cardForm}
                        initial="hidden"
                        animate="show"
                    >
                        <form className="flex flex-col md:flex-row " onSubmit={handleSubmit} autoComplete="off">
                            <ImageInput setArt={setArt}/>

                            <div className="md:ml-5 mt-4 md:mt-0 grid grid-rows-3 gap-4 items-end grid-flow-col">
                                <label className="flex flex-col">
                                    <input type="text" placeholder="Album" className="input input-bordered pl-1 w-full lg:w-[300px] rounded-none border-0 border-b focus:outline-transparent"
                                        required
                                        minLength="1"
                                        maxLength="50"
                                        name="album"
                                        onChange={e=>setTitle(e.target.value)}
                                    />
                                </label>
                                <label className="flex flex-col">
                                    <input type="text" placeholder="Artist" className="input input-bordered pl-1 w-full lg:w-[300px] rounded-none border-0 border-b focus:outline-transparent"
                                        required
                                        minLength="1"
                                        maxLength="50"
                                        name="artist"
                                        onChange={e=>setArtist(e.target.value)}
                                    />
                                </label>
                                <label className="flex flex-col">
                                    <input type="text" placeholder="Year" className="input input-bordered  pl-1 w-[100px] rounded-none border-0 border-b focus:outline-transparent"
                                        minLength="4"
                                        maxLength="4"
                                        pattern="[0-9]{0,4}"
                                        name="year"
                                        onChange={e=>setYear(e.target.value)}
                                    />
                                </label>
                                
                            </div>
                            <input className="btn btn-primary mt-4 md:mt-auto md:ml-4 px-6" type="submit" value="Submit" />

                        </form>
                    </motion.div>
                )
            }


        </>

    )
}