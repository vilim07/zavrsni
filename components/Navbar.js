import { UserImage, UserName, signOutUser, signInUser } from "../firebase/userManagement"
import { useContext } from "react";
import Link from "next/link"
import Image from 'next/image'
import QueryContext from "../contexts/QueryContext";
import debounce from 'lodash.debounce';
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";


export default function Navbar({ user }) {

  const { searchQuery, setSearchQuery } = useContext(QueryContext);

  const router = useRouter()

  const searchBar = {
    hidden: { 
      width: 0,
      opacity: 0
    },
    show: { 
      width: "auto",
      opacity: 1
     },
    exit: { 
      width: 0,
      opacity: 0
    },
  }


  const changeQueryKeywords = (e) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      keywords: (e.target.value).toLowerCase().split(" ")
    }))
  }

  const debounceSetQuery = debounce(changeQueryKeywords, 800);


  return (
    <div className="sticky z-10 w-full top-0">
      <div className="navbar min-w-full w-fit p-4 justify-between max-w-full">
        <div className="bg-black rounded-box mr-4 sm:px-2 sm:h-[58px] overflow-hidden">
          <Link href="/"><a className=" normal-case text-xl btn btn-ghost">vvny.io</a></Link>

          <AnimatePresence>

            {user && router.pathname != "/messanger" && (
              <motion.div
                className="items-center overflow-hidden flex"
                layoutId="searchBar" variants={searchBar}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <span className="border-l-2 h-6 mx-2" />

                <label className="form-control overflow-hidden rounded-xl flex-row items-center focus-within:bg-base-100 pl-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <input type="text" placeholder="Search" className="input bg-transparent pl-2 focus:outline-transparent" onChange={debounceSetQuery} />
                </label>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
        <div className="flex-none gap-2 sm:bg-black rounded-r-full sm:rounded-box">
          {user
            ? (
              <div className="dropdown dropdown-end p-0 rounded-full sm:px-2 sm:py-2">
                <label tabIndex="0" className="btn btn-ghost h-fit p-0 sm:px-2">
                  <a className="text-xl normal-case mr-3 hidden sm:block"><UserName /></a>
                  <div className="btn-circle avatar overflow-hidden place-content-center sm:my-1">
                    <UserImage />
                  </div>
                </label>
                <ul tabIndex="0" className="mt-5 w-fit sm:w-full p-2 shadow menu menu-compact dropdown-content bg-black rounded-box">
                  <li><button onClick={signOutUser}>Logout</button></li>
                </ul>
              </div>
            )
            : (
              <div className="bg-black rounded-box flex">
                <div className="dropdown dropdown-end px-2 py-1">
                  <label tabIndex="0" className="btn btn-ghost h-fit">
                    <button className="normal-case font-medium m-auto text-xl">Sign In</button>
                  </label>
                  <ul tabIndex="0" className="mt-5 p-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-fit">
                    <li>
                      <button onClick={signInUser} className='btn-google rounded-lg transition-shadow	 hover:shadow-slate-900 hover:shadow-md'>
                        <Image
                          src="/g-logo.svg"
                          alt="Google Logo"
                          layout='fixed'

                          width="18"
                          height="18"
                        />
                        <span className='text'>Google</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}


        </div>
      </div>
    </div>
  )
}