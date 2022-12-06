import React, { useState } from 'react';
import Collection from '../components/Collection';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';


export default function Market() {

  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <div> Loading... </div>;
  }
  else if (user) {
    return (
      <>
        <div className="container mt-10">
          <div className="prose-xl mt-10 text-center font-bold"><h1>Marketplace</h1></div>
          <Collection
            marketPage = {true} 
          />
        </div>
      </>
    )
  }

}
