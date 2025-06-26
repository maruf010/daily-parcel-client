import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { format } from "date-fns";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })
    console.log(parcels);

    const handleView = (parcel) => {
        console.log("Viewing:", parcel);
        // Show details modal or navigate
    };

    const handlePay = (id) => {
        console.log("Paying for:", id);
        // Payment logic here
        navigate(`/dashboard/payment/${id}`)
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // const res = await fetch(`/api/parcels/${id}`, {
                    //     method: "DELETE",
                    // });
                    axiosSecure.delete(`/parcels/${id}`)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.deletedCount) {

                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Parcel has been deleted successfully.",
                                    icon: "success",
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                            }
                            else {
                                Swal.fire("Error", "Failed to delete the parcel.", "error");
                            }
                            refetch();
                        })
                } catch (err) {
                    Swal.fire("Error", "Something went wrong.", "error");
                    console.error(err);
                }
            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead className="bg-base-200 text-base font-semibold">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id}>
                            <td>{index + 1}</td>
                            <td className='max-w-[180px] truncate'>{parcel.title}</td>
                            <td className="capitalize">{parcel.type.replace("-", " ")}</td>
                            <td>{format(new Date(parcel.createdAt), "PPP p")}</td>
                            <td>৳ {parcel.cost}</td>
                            <td>
                                <span
                                    className={`badge ${parcel.payment_status === "paid"
                                        ? "badge-success"
                                        : "badge-error"
                                        }`}
                                >
                                    {parcel.payment_status}
                                </span>
                            </td>
                            <td className="space-x-2">
                                <button
                                    onClick={() => handleView(parcel._id)}
                                    className="btn btn-xs btn-outline"
                                >
                                    View
                                </button>
                                {parcel.payment_status === "unpaid" && (
                                    <button
                                        onClick={() => handlePay(parcel._id)}
                                        className="btn btn-xs btn-primary text-black"
                                    >
                                        Pay
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(parcel._id)}
                                    className="btn btn-xs btn-error"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {parcels.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center text-gray-400">
                                No parcels found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;