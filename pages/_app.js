import React from 'react';
import { Provider } from 'next-auth/client'

// import 'froala-design-blocks/dist/css/froala_blocks.css'
// import 'bootstrap/dist/css/bootstrap.css'
import 'styles/bootstrap.css'
import 'styles/globals.css'


function MyApp({ Component, pageProps }) {
  return <Provider session={pageProps.session} >
          <Component {...pageProps} />
  </Provider>
}

export default MyApp
