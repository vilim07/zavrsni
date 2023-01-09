import '../styles/globals.scss'
import { auth } from '../firebase/firebase'
import { useRouter } from 'next/router'
import Layout from '../layouts/layout'
import { useAuthState } from 'react-firebase-hooks/auth';
import { QueryProvider } from '../contexts/QueryContext'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);



  if (!loading && user == null && router.route != "/") {
    router.push('/') // redirects if there is no user
  }
  else if (!loading){
    return (
      <QueryProvider>
        <Layout>
          <div className="container mx-auto px-4 sm:px-0 max-w-full sm:max-w-[72vw] lg:max-w-[80vw]">
            <Component {...pageProps} />
          </div>
        </Layout>
      </QueryProvider>
    )
  }


}

export default MyApp
