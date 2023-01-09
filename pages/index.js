import { auth } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Collection from '../components/Collection';
import Hero from '../components/Hero';

export default function Home() {

  const [user, loading] = useAuthState(auth);

  if (user) {
    return (
      <>
        <div className="mt-10">
          <div className="prose-xl text-center font-bold"><h1>Your Collection</h1></div>
          <Collection />
        </div>
      </>
    )
  }
  else if (!loading) {
    return (
      <Hero />
    )
  }

}
