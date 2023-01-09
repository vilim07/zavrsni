import Image from "next/image"
import Link from "next/link"
import ActiveLink from "./elements/ActiveLink"
import { motion, LayoutGroup } from "framer-motion"
import SidebarStyle from '../styles/Sidebar.module.scss'
import { useState } from "react"
import { useRouter } from 'next/router'

export default function Sidebar() {
    const router = useRouter()

    return (
        <>

            <aside className={"z-[12] fixed bottom-0 left-1/2 translate-x-[-50%] sm:translate-x-0 sm:top-[7rem] sm:left-4 " + SidebarStyle.sidebar} aria-label="Sidebar">
                <nav className="overflow-y-auto py-4 rounded-box">
                    <ul className="bg-black px-2 py-0.5 rounded-box flex sm:block">
                        <li>
                            <ActiveLink href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            </ActiveLink>
                            {(router.pathname == "/") && (
                                <motion.div className={"bg-primary marker rounded-lg " + SidebarStyle.marker} layoutId="marker" />
                            )}
                        </li>
                        <li>
                            <ActiveLink href="/market">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                                </svg>
                            </ActiveLink>
                            {(router.pathname == "/market") && (
                                <motion.div className={"bg-primary marker rounded-lg " + SidebarStyle.marker} layoutId="marker" />
                            )}

                        </li>
                        <li>
                            <ActiveLink href="/messanger">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                </svg>
                            </ActiveLink>
                            {(router.pathname == "/messanger") && (
                                <motion.div className={"bg-primary marker rounded-lg " + SidebarStyle.marker} layoutId="marker" />
                            )}
                        </li>
                    </ul>
                </nav>
            </aside>

        </>
    )
}