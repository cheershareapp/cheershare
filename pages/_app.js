import { SWRConfig } from 'swr'
import { Provider } from 'next-auth/client'
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }) {
  return <Provider session={pageProps.session} >
      <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}>
          <Component {...pageProps} />
      </SWRConfig></Provider>
}

export default MyApp
