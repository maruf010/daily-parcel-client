import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    FaMotorcycle,
    FaCheckCircle,
    FaShippingFast,
    FaBoxOpen,
} from "react-icons/fa";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const COLORS = {
    not_collected: '#F87171',
    in_transit: '#FBBF24',
    rider_assigned: '#60A5FA',
    delivered: '#34D399',
};

const statusIcons = {
    rider_assigned: <FaMotorcycle className="text-4xl text-info" />,
    delivered: <FaCheckCircle className="text-4xl text-success" />,
    in_transit: <FaShippingFast className="text-4xl text-warning" />,
    not_collected: <FaBoxOpen className="text-4xl text-error" />,
};

const statusLabels = {
    rider_assigned: "Assigned Parcels",
    delivered: "Delivered Parcels",
    in_transit: "Parcels in Transit",
    not_collected: "Not Collected",
};

export default function RiderDashboard() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcelStats = [], isLoading, isError, error } = useQuery({
        queryKey: ["riderParcelStatus", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/${user.email}/parcel-status-count`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const pieData = parcelStats.map((item) => ({
        name: statusLabels[item.status] || item.status,
        value: item.count,
        status: item.status,
    }));

    if (isLoading) return <div className="text-center py-20">Loading...</div>;
    if (isError) return <div className="text-center text-red-600">Error: {error.message}</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Parcel Delivery Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {parcelStats.map(({ count, status }) => (
                    <div
                        key={status}
                        className="card bg-base-100 shadow-md border border-base-200 flex flex-col items-center justify-center p-6"
                    >
                        {statusIcons[status] || <FaBoxOpen className="text-4xl" />}
                        <h2 className="text-lg font-semibold mt-3 text-center">
                            {statusLabels[status] || status}
                        </h2>
                        <p className="text-4xl font-extrabold text-primary mt-2">{count}</p>
                    </div>
                ))}
            </div>

            <div className="card bg-base-100 shadow-md mt-6 p-4">
                <h2 className="text-xl font-bold mb-4">Status Breakdown</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                            {pieData.map((entry) => (
                                <Cell
                                    key={`cell-${entry.status}`}
                                    fill={COLORS[entry.status] || '#A78BFA'}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
