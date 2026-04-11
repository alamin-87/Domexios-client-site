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
import RequestedApartments from "../pages/DashBoard/RequestedApartments/RequestedApartments";
import Forbiden from "../pages/forbiden/Forbiden";
import AdminRoute from "../routes/AdminRoute";
import About from "../pages/Public/About";
import Amenities from "../pages/Public/Amenities";
import Gallery from "../pages/Public/Gallery";
import Support from "../pages/Public/Support";
import DashboardHome from "../pages/DashBoard/DashboardHome/DashboardHome";
import ApartmentDetails from "../pages/apartment/ApartmentDetails";
import Contact from "../pages/Public/Contact";
import Privacy from "../pages/Public/Privacy";
import Blog from "../pages/Public/Blog";
import Terms from "../pages/Public/Terms";
import ResidencyRules from "../pages/Public/ResidencyRules";
import Cookies from "../pages/Public/Cookies";
import RentEstimator from "../pages/Public/RentEstimator";
import PropertyMatcher from "../pages/Public/PropertyMatcher";
import MaintenancePredictor from "../pages/Public/MaintenancePredictor";
import SecurityScan from "../pages/Public/SecurityScan";

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
        path: "apartment/:id",
        Component: ApartmentDetails,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "amenities",
        Component: Amenities,
      },
      {
        path: "gallery",
        Component: Gallery,
      },
      {
        path: "support",
        Component: Support,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "privacy",
        Component: Privacy,
      },
      {
        path: "blog",
        Component: Blog,
      },
      {
        path: "terms",
        Component: Terms,
      },
      {
        path: "rules",
        Component: ResidencyRules,
      },
      {
        path: "cookies",
        Component: Cookies,
      },
      {
        path: "forbiden",
        Component: Forbiden,
      },
      {
        path: "rent-estimator",
        Component: RentEstimator,
      },
      {
        path: "property-matcher",
        Component: PropertyMatcher,
      },
      {
        path: "maintenance-predictor",
        Component: MaintenancePredictor,
      },
      {
        path: "security-scan",
        Component: SecurityScan,
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
        index: true,
        Component: DashboardHome,
      },
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "my-requests",
        Component: RequestedApartments,
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
