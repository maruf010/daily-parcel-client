import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const formatDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })
    if (isPending) {
        return '...loading'
    }


    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>
            <table className="table table-zebra w-full text-sm">
                <thead className="bg-base-200">
                    <tr>
                        <th>#</th>
                        <th>Parcel ID</th>
                        <th>Email</th>
                        <th>Amount (৳)</th>
                        <th>Method</th>
                        <th>Transaction ID</th>
                        <th>Date & Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={payment._id}>
                            <td>{index + 1}</td>
                            <td>{payment.parcelId}</td>
                            <td>{payment.email}</td>
                            <td className="text-green-600 font-semibold">৳{payment.amount}</td>
                            <td>{payment.paymentMethod || "N/A"}</td>
                            <td>{payment.transactionId || "N/A"}</td>
                            <td>{formatDate(payment.paid_at)}</td>
                            <td>
                                <button className="btn btn-sm btn-outline btn-info">Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {payments.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No payment history found.</p>
            )}
        </div>
    );
};

export default PaymentHistory;