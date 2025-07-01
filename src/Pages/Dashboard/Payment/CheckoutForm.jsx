import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useTrackingLogger from '../../../hooks/useTrackingLogger';


const CheckoutForm = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const { parcelId } = useParams();
    console.log(parcelId);
    const axiosSecure = useAxiosSecure();
    const { logTracking } = useTrackingLogger();
    const [error, setError] = useState('');


    const { data: parcelInfo, isPending } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })
    if (isPending) {
        return 'loading...'
    }
    console.log(parcelInfo)
    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;
    console.log(amountInCents);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        //valid the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setError(error.message);
        }
        else {
            setError('')
            console.log('payment Method', paymentMethod);

            //create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                parcelId
            })
            console.log(res);

            const clientSecret = res.data.clientSecret;

            //confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email,
                    }
                }
            })
            if (result.error) {
                console.log(result.error.message);
                setError(result.error.message)
            }
            else {
                setError('')
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    console.log(result);
                    //mark parcel paid also create payment history
                    const paymentData = {
                        parcelId,
                        email: user.email,
                        amount,
                        transactionId: result.paymentIntent.id,
                        paymentMethod: result.paymentIntent.payment_method_types,
                    }
                    const paymentRes = await axiosSecure.post('/payments', paymentData);
                    if (paymentRes.data.insertedId) {
                        console.log('Payment successfully');

                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment successful!',
                            html: `Transaction ID : ${result.paymentIntent.id}`,
                            confirmButtonText: 'Go to My Parcels',
                        })
                        
                        await logTracking({
                            tracking_id: parcelInfo.tracking_id,
                            status: "payment_done",
                            details: `Created by ${user.displayName}`,
                            updated_by: user.email,
                        })

                        navigate('/dashboard/myParcels')
                    }
                }
            }
        };


    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                <CardElement className='p-2 border rounded'></CardElement>
                <button type='submit'
                    className='btn btn-primary w-full'
                    disabled={!stripe}>
                    Pay ${amount}
                </button>
                {
                    error && <p className='text-red-400'>{error}</p>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;