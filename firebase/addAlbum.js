import { auth } from "../firebase/firebase";
import { db, storage } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";



export const uploadNewAlbum = async (album, artist, year, art, forTrade) => {

    const user = auth.currentUser;
    const imageRef = ref(storage, `Art/${art.name + v4()}`);
    //const rawIndices = ([album, artist, year].join(" ").toLowerCase()).split(" ");
    let explodedIndices = [];

    [album, artist, year].forEach(attr => {
        (attr.split(" ")).forEach(word => {
            [...word].forEach((letter, i) => explodedIndices.push(word.substr(letter, i + 1).toLowerCase()))
        });
    })
    let indices = explodedIndices.filter((element, index) => {
        return explodedIndices.indexOf(element) === index;
    });

    uploadBytes(imageRef, art).then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await addDoc(collection(db, "Vinyls"), {
            Album: album,
            Artist: artist,
            Artwork: downloadURL,
            Year: year,
            Owner: user.uid,
            Indices: indices,
            Trade: forTrade,
            Registered: serverTimestamp()
        });
    })
}



//console.log(useAuthState)

