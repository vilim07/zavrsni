import firebase, { auth } from './firebase';
import { GoogleAuthProvider, getAuth, signOut, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import Image from 'next/image'



import { useAuthState } from 'react-firebase-hooks/auth';


const provider = new GoogleAuthProvider();
const db = getFirestore();

export const signInUser = async () => {
    await signInWithPopup(auth, provider);
    console.log("loged in")
    const user = auth.currentUser;

    const docRef = doc(db, "Users", user.uid);
    const usersRef = await getDoc(docRef);

    if (!usersRef.exists()) {
        await setDoc(doc(db, 'Users', user.uid), {
            name: user.displayName,
            email: user.email,
            picture: user.photoURL,
            registered: serverTimestamp()
        });
    }
    else {
        console.log('EXISTS!!!')
    }


}

export const signOutUser = async () => {
    await signOut(auth);
    console.log("loged out")
}

export const ShowUser = () => {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div> Loading... </div>;
    }
    else if (user) {
        return (
            <div className="flex flex-col">
                <h2>{user.displayName} </h2>
                <Image src={user.photoURL} width="45" height="45" />
            </div>
        )

    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <>Log in f$$kr</>;
    }

}

export const UserImage = () => {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return null;
    } else if (user) {
        return (
            <Image
                src={user.photoURL}
                alt="User profile picture"
                layout='fill'
            />
        )
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return null;
    }

}

export const UserName = () => {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return null;
    } else if (user) {
        return (
            <>{user.displayName}</>
        )
    } else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return null;
    }

}

const dragNDrop = () => {
    var droppedFiles = false;

    $form.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
    })
        .on('dragover dragenter', function () {
            $form.addClass('is-dragover');
        })
        .on('dragleave dragend drop', function () {
            $form.removeClass('is-dragover');
        })
        .on('drop', function (e) {
            droppedFiles = e.originalEvent.dataTransfer.files;
        });
}

export const AddAlbumButton = () => {
    const user = auth.currentUser;


}

export const addUser = async () => {

}


//console.log(useAuthState)



