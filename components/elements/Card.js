import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import CardStyle from '../../styles/Card.module.scss'

export default function Card({album, artist, year, artwork}) {
    const item = {
        hover:{
            backgroundColor: "#282828",
            transition: { duration: 0.1 },
        },
        exit:{
            opacity: 0,
            scale: 0.5,
            transition: {type: "spring"},
        },
        whileTap:{
            scale: 0.98,
            transition: {type: "spring"},
        } 
    }
    return (
        <AnimatePresence>
            <motion.div className={"card w-full bg-base-100 shadow-xl p-5 pb-5 rounded cursor-pointer h-full " + CardStyle.card}
                variants={item}
                whileHover="hover"
                whileTap="whileTap"
                exis="exit"
            >
                <figure className="">
                    <Image src={artwork} width={420} height={420} className="aspect-square shadow-xl w-full object-cover rounded-sm" />
                </figure>
                <div className="card-body pt-5 pb-0 px-0 prose">
                    <h2 className="mb-0">{album}</h2>
                    <h4>{year && year + " •"} {artist}</h4>

                </div>
            </motion.div>
        </AnimatePresence>
    )
}