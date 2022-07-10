import { useEffect } from 'react'
import { Provider } from 'react-redux'
import TagManager from 'react-gtm-module'
import Normalize from 'react-normalize'
import { ToastContainer } from 'react-toastify'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'
import { store } from '../redux/store'
import Layout from '../Layout'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-NR4NJ22' })
  }, [])

  return (
    <Provider store={store}>
      <Normalize />
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </Layout>
    </Provider>
  )
}

export default MyApp
