import '../styles/globals.scss'
import { auth } from '../firebase/firebase'
import { useRouter } from 'next/router'
import Layout from '../layouts/layout'
import { useAuthState } from 'react-firebase-hooks/auth';
import { QueryProvider } from '../contexts/QueryContext'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);



  if (!loading && user == null && router.route != "/") {
    router.push('/') // redirects if there is no user
  }
  else {
    return (
      <QueryProvider>
        <Layout>
          <div className="container mx-auto">
            <Component {...pageProps} />
          </div>
        </Layout>
      </QueryProvider>
    )
  }


}

export default MyApp
