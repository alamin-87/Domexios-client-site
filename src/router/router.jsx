import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Hero from "../pages/Home/Hero/Hero";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import ApartmentList from "../pages/apartment/ApartmentList";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/DashBoard/myProfile/MyProfile";
import MakePayment from "../pages/DashBoard/MakePayment/MakePayment";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import AdminProfile from "../pages/DashBoard/AdminProfile/AdminProfile";
import ManageMembers from "../pages/DashBoard/ManageMembers/ManageMembers";
import MakeAnnouncement from "../pages/DashBoard/MakeAnnouncement/MakeAnnouncement";
import AgreementRequests from "../pages/DashBoard/AgreementRequests/AgreementRequests";
import ManageCoupons from "../pages/DashBoard/ManageCoupons/ManageCoupons";
import Announcements from "../pages/DashBoard/Announcements/Announcements";
import Forbiden from "../pages/forbiden/Forbiden";
import AdminRoute from "../routes/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Hero,
      },
      {
        path: "apartmentList",
        Component: ApartmentList,
      },
      {
        path: "forbiden",
        Component: Forbiden,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "make-payment",
        Component: MakePayment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "admin-profile",
        // Component: AdminProfile,
        element:<AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: "manage-members",
        // Component: ManageMembers,
        element:<AdminRoute><ManageMembers></ManageMembers></AdminRoute>
      },
      {
        path: "make-announcement",
        // Component: MakeAnnouncement,
        element:<AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
      },
      {
        path: "agreement-requests",
        // Component: AgreementRequests,
        element:<AdminRoute><AgreementRequests></AgreementRequests></AdminRoute>
      },
      {
        path: "manage-coupons",
        // Component: ManageCoupons,
        element:<AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>
      },
      {
        path: "announcements",
        Component: Announcements,
      },
    ],
  },
]);
