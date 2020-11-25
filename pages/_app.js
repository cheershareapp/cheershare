import { Provider } from '@nuvest/next-auth/client'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import 'bootstrap/dist/css/bootstrap.css'

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

function MyApp({ Component, pageProps }) {
  return <Provider session={pageProps.session} >
      <Elements stripe={stripePromise}>
          <Component {...pageProps} />
      </Elements></Provider>
}

export default MyApp
