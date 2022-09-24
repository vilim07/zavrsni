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


export const AlbumForm = () => {

    const [art, setArt] = useState({});
    const [title, setTitle] = useState({});
    const [artist, setArtist] = useState({});
    const [year, setYear] = useState({});



    const [showCardForm, setShowCardForm] = useState(false);

    const handleChange = (event) => {

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        uploadNewAlbum(title,artist,year,art);
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
                    <motion.div layout className="bg-base-100 p-8 w-fit mt-5 rounded-md" variants={cardForm}
                        initial="hidden"
                        animate="show"
                    >
                        <form className="flex" onSubmit={handleSubmit}>
                            <ImageInput setArt={setArt}/>

                            <div className="ml-5 grid grid-rows-3 gap-4 items-end grid-flow-col">
                                <label className="flex flex-col">
                                    <input type="text" placeholder="Album" className="input input-bordered pl-1 w-[300px] rounded-none border-0 border-b focus:outline-transparent"
                                        required
                                        minLength="1"
                                        maxLength="50"
                                        name="album"
                                        onChange={e=>setTitle(e.target.value)}
                                    />
                                </label>
                                <label className="flex flex-col">
                                    <input type="text" placeholder="Artist" className="input input-bordered pl-1 w-[300px] rounded-none border-0 border-b focus:outline-transparent"
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
                            <input className="btn btn-primary mt-auto ml-4 px-6" type="submit" value="Submit" />

                        </form>
                    </motion.div>
                )
            }


        </>

    )
}