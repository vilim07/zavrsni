import Image from 'next/image'
import { signInUser} from '../firebase/userManagement';


export default function Hero() {

    return (
        <>
            <div className="hero min-h-fit sm:h-[85vh] shadow-lg rounded-lg mx-4 w-fit sm:mx-auto sm:w-auto" style={{ backgroundImage: "url(/v2.jpg)" }}>
                <div className="hero-overlay "></div>
                <div className="hero-content prose-sm sm:prose-xl prose w-full h-full justify-start py-16">
                    <div>
                        <h1>Welcome to vvny.io</h1>
                        <h3 className='ml-4 mb-8'>vvny.io was made by a vinyl collector for vinyl collectors. It makes keeping track of your precious collection easy and sleek. <br /> There is also a marketplace for all those who want to exchange their vinyl.</h3>
                        <h2>Sign In With:</h2>
                        <div>
                            <button onClick={signInUser} className='btn-google rounded-lg transition-shadow	 hover:shadow-slate-900 hover:shadow-md'>
                                <Image
                                    src="/g-logo.svg"
                                    alt="Google Logo"
                                    width="18"
                                    height="18"
                                />
                                <span className='text'>Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
