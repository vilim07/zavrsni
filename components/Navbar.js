import { UserImage, UserName } from "../firebase/userManagement"
import { signOutUser, signInUser } from "../firebase/userManagement"
import { useState, useEffect, useContext } from "react";
import Link from "next/link"
import Image from 'next/image'
import QueryContext from "../contexts/QueryContext";
import debounce from 'lodash.debounce';

export default function Navbar({ user }) {
  const { searchQuery, setSearchQuery } = useContext(QueryContext);
  const setQueryKeywords = (e) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      keywords: (e.target.value).toLowerCase().split(" ")
    }))
  }
  return (
    <div className="sticky z-10 w-full top-0">
      <div className="navbar p-4 justify-between">
        <div className="bg-black rounded-box px-2 h-[58px]">
          <Link href="/"><a className=" normal-case text-xl btn btn-ghost">vvny.io</a></Link>


          {user && (
            <div className="form-control rounded-box overflow-hidden">
              <input type="text" placeholder="Search" className="input bg-transparent" onChange={setQueryKeywords} />
            </div>
          )}
        </div>
        <div className="flex-none gap-2 bg-black rounded-box">
          {user
            ? (
              <div className="dropdown dropdown-end px-2 py-2">
                <label tabIndex="0" className="btn btn-ghost h-fit px-2">
                  <a className="text-xl normal-case mr-2"><UserName /></a>
                  <div className="btn-circle avatar overflow-hidden place-content-center">
                    <UserImage />
                  </div>
                </label>
                <ul tabIndex="0" className="mt-5 w-full p-2 shadow menu menu-compact dropdown-content bg-black rounded-box">
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li><a>Settings</a></li>
                  <li><button onClick={signOutUser}>Logout</button></li>
                </ul>
              </div>
            )
            : (
              <div className="bg-base-100 rounded-box flex">
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