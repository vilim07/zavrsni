import { motion, } from "framer-motion"
import Image from "next/image"
import CardStyle from '../../styles/Card.module.scss'

export default function Card({ album, artist, year, artwork, selected, open, forTrade, marketPage }) {


    const item = {
        hover: {
            backgroundColor: "#282828",
            transition: { duration: 0.1 },
        },
        exit: {
            opacity: 0,
            scale: 0.5,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        },
        selected: {
            scale: 1.1,
            backgroundColor: "#002B3D",
            transition: { type: "spring" },
        },
        whileTap: {
            scale: 0.98,
            transition: { type: "spring" },
        },

    }





    return (
        <motion.div layout="position" className={"card w-full bg-base-100 shadow-xl p-5 pb-5 rounded cursor-pointer h-full " + CardStyle.card + " " + (selected == true && " bg-base-200")}
            variants={item}
            whileHover={selected ? "selected" : "hover"}
            whileTap="whileTap"
            animate={selected ? "selected" : ""}
            exit="exit"
        >
            <figure className=" mr-auto aspect-square shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
                <Image src={artwork} width={196} height={196} className=" object-cover w-full rounded-sm" />
            </figure>
            <div className="card-body pt-5 pb-0 px-0 prose">
                <h3 className="font-bold leading-7 line-clamp-2">{album}</h3>
                <h4 className="line-clamp-2 min-h-[48px] mt-auto">{year && year + " •"} {artist}</h4>
                {(forTrade && !marketPage) ? (
                    <span className="rounded-full p-1 bg-base-200 w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-warning">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                ) : null}
            </div>
        </motion.div>
    )
}