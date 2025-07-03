import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../Pages/Authentication/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashBoardLayout";
import Payment from "../Pages/Dashboard/Payment/Payment";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../Pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "./AdminRoute";
import AssignRider from "../Pages/Dashboard/AssignRider/AssignRider";
import RiderRoutes from "./RiderRoutes";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries/PendingDeliveries";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../Pages/Dashboard/MyEarnings/MyEarnings";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/coverage',
                Component: Coverage,
                loader: () => fetch('./serviceCenter.json'),
            },
            {
                path: 'forbidden',
                Component: Forbidden
            },
            {
                path: 'beARider',
                element: <PrivateRoute>
                    <BeARider></BeARider>
                </PrivateRoute>,
                loader: () => fetch('./serviceCenter.json'),
            },
            {
                path: '/sendParcel',
                element: <PrivateRoute>
                    <SendParcel></SendParcel>
                </PrivateRoute>,
                loader: () => fetch('./serviceCenter.json'),
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'myParcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory
            },
            {
                path: 'track',
                Component: TrackParcel
            },

            //rider routes
            {
                path: 'pending-deliveries',
                element: <RiderRoutes>
                    <PendingDeliveries></PendingDeliveries>
                </RiderRoutes>
            },
            {
                path: 'completed-deliveries',
                element: <RiderRoutes>
                    <CompletedDeliveries></CompletedDeliveries>
                </RiderRoutes>
            },
            {
                path: 'my-earnings',
                element: <RiderRoutes>
                    <MyEarnings></MyEarnings>
                </RiderRoutes>
            },

            // admin route
            {
                path: 'assignRider',
                element: <AdminRoute>
                    <AssignRider></AssignRider>
                </AdminRoute>
            },
            {
                path: 'pendingRiders',
                element: <AdminRoute>
                    <PendingRiders></PendingRiders>
                </AdminRoute>
            },
            {
                path: 'activeRiders',
                element: <AdminRoute>
                    <ActiveRiders></ActiveRiders>
                </AdminRoute>
            },
            {
                path: 'makeAdmin',
                element: <AdminRoute>
                    <MakeAdmin></MakeAdmin>
                </AdminRoute>
            },
        ]
    }

]);