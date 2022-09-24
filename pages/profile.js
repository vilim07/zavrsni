import { auth } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import React, { useState } from 'react';
import Collection from '../components/Collection';

export default function Stats() {

    return (
      <>
        <div className="container mt-10">
          <div className="prose-xl text-center font-bold"><h1>Stats</h1></div>
        </div>
      </>
    )

}
