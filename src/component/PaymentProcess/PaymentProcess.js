import React from 'react';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51Ie7aNBmHK6vOlNJRzXxvQXSNFoCFkFBvzyeCz9BLkATQa7B5CyRNJxd0nfORrL7R866ybTFM4aDl0wWxapBjpEY00eYCw46Fv');

const PaymentProcess = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            {/* <SplitCardForm/> */}
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default PaymentProcess;