/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { loadStripe } from '@stripe/stripe-js'

let stripePromise;
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    }
    return stripePromise
};

/* Lookup table, for a given selection provide some information */
export const Tiers = {
    'mini': {
        postLimit: 10,
        prettyName: 'Mini',
        amount: 0,
    },
    'premium': {
        postLimit: 100,
        prettyName: 'Premium',
        amount: 399,
    },
    'mega': {
        postLimit: 1000,
        prettyName: 'Mega',
        amount: 1299,
    },
};

export const TierOrder = ['mini', 'premium', 'mega'];

export default getStripe
