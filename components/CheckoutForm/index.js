import React, { useState } from 'react'
// import s from './CheckoutForm.module.css';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

export default function Index () {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
            <style global jsx>{`
                *,
                *:before,
                *:after {
                    box-sizing: border-box;
                }
                
                body,
                html {
                    background-color: #f6f9fc;
                    font-size: 18px;
                    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
                }
                
                form {
                    max-width: 800px;
                    margin: 80px auto;
                }
                
                label {
                    color: #6b7c93;
                    font-weight: 300;
                    letter-spacing: 0.025em;
                    margin-top: 16px;
                    display: block;
                }
                
                button {
                    white-space: nowrap;
                    border: 0;
                    outline: 0;
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 14px;
                    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
                    color: #fff;
                    border-radius: 4px;
                    font-size: 15px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.025em;
                    background-color: #6772e5;
                    text-decoration: none;
                    -webkit-transition: all 150ms ease;
                    transition: all 150ms ease;
                    margin-top: 10px;
                }
                
                button:hover {
                    color: #fff;
                    cursor: pointer;
                    background-color: #7795f8;
                    transform: translateY(-1px);
                    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
                }
                
                button[disabled] {
                    opacity: 0.6;
                }
                
                input {
                    display: block;
                    border: none;
                    font-size: 18px;
                    margin: 10px 0 20px 0;
                    max-width: 100%;
                    padding: 10px 14px;
                    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
                    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
                    border-radius: 4px;
                    background: white;
                    color: #424770;
                    letter-spacing: 0.025em;
                    width: 500px;
                }
                
                input::placeholder {
                    color: #aab7c4;
                }
                
                .result,
                .error {
                    font-size: 16px;
                    font-weight: bold;
                    margin-top: 10px;
                    margin-bottom: 20px;
                }
                
                .error {
                    color: #e4584c;
                }
                
                .result {
                    color: #666ee8;
                }
                
                /*
                The StripeElement class is applied to the Element container by default.
                More info: https://stripe.com/docs/stripe-js/reference#element-options
                */
                
                .StripeElement,
                .StripeElementIdeal {
                    display: block;
                    margin: 10px 0 20px 0;
                    max-width: 500px;
                    padding: 10px 14px;
                    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
                    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
                    border-radius: 4px;
                    background: white;
                }
                
                .StripeElement--focus,
                .StripeElementIdeal--focus {
                    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
                    rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
                    -webkit-transition: all 150ms ease;
                    transition: all 150ms ease;
                }
                
                .StripeElement.loading {
                    height: 41.6px;
                    opacity: 0.6;
                }
                
                .StripeElementIdeal {
                    padding: 0;
                }
            `}</style>
        </form>
    );
};