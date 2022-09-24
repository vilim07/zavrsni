import Image from 'next/image';
import { signInUser } from '../../firebase/userManagement';
export const HeroLogin = () => {

    return (
        <>
            <div className="hero min-h-fit h-[85vh] min-h-full shadow-lg rounded-lg" style={{ backgroundImage: "url(https://placeimg.com/1000/800/arch)" }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content prose-xl prose w-full h-full justify-start">
                    <div>
                        <h1>Welcome to vvny.io</h1>
                        <h3 className='ml-4'>vvny.io was made by a vinyl collector for vinyl collectors. It makes keeping track of your precious collection easy and sleek. <br /> There is also a marketplace for all those who want to exchange their vinyl.</h3>
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

