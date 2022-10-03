import { motion, } from "framer-motion"
import Image from "next/image"
import CardStyle from '../../styles/Card.module.scss'

export default function Card({ album, artist, year, artwork, selected, open }) {
    

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
            </div>
        </motion.div>
    )
}