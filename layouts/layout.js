import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { auth } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useState} from "react"

export default function Layout({ children }) {
const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div> Loading... </div>;
  }
  else if (user) {
    return (
      <>
        <Navbar user="true"/>
        <Sidebar />
        {children}
      </>
    )
  }
  else{

    return (
      <>
        <Navbar />
        {children}
      </>
    )
  }

}