import { motion, } from "framer-motion"
import Image from "next/image"
import CardStyle from '../../styles/Card.module.scss'

export default function CardShowcase({ id, album, artist, year, artwork, setOpenCard }) {








    return (
        <>
            <div className="w-full h-full fixed  opacity-70 bg-base-200 left-0 top-0 z-10"></div>

            <motion.div layoutId={id} className={"card container w-[600px] bg-base-100 shadow-xl p-5 pb-5 rounded cursor-pointer fixed z-10 prose-xl top-20 left-[45%]"}>
                <figure className=" mr-auto aspect-square shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
                    <Image src={artwork} width={300} height={300} className=" object-cover w-full rounded-sm" />
                </figure>
                    <h2 className="font-bold leading-7">{album}</h2>
                    <h3 className="">{year}</h3>
                    <h3 className="">{artist}</h3>
                    <h3 className="">Quality{artist}</h3>

                    <button onClick={()=>{setOpenCard(false)}}>X</button>

            </motion.div>
        </>
    )
}