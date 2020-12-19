import React from 'react';
import { Provider } from 'next-auth/client'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// import 'froala-design-blocks/dist/css/froala_blocks.css'
// import 'bootstrap/dist/css/bootstrap.css'
import 'styles/bootstrap.css'
import 'styles/globals.css'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function MyApp({ Component, pageProps }) {
  return <Provider session={pageProps.session} >
      <Elements stripe={stripePromise}>
          <Component {...pageProps} />
      </Elements>
  </Provider>
}

export default MyApp
