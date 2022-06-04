/** @format */

import React from "react";
import { ThemeProvider } from "@zendeskgarden/react-theming";

import Home from "./Components/Home";
import ItemsDetail from "./Components/ItemsDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ItemDescription from "./Components/ItemDescription";
import ShippingProfile from "./Components/ShippingProfile";
import ShipTemplate from "./Components/ShipTemplate";

import Profile from "./Components/Profile";
import Drafts from "./Components/Drafts";
import ProUser from "./Components/ProUser";
import ProSubscription from "./Components/ProSubscription";
import Check from "./Components/Check";
import InactiveListings from "./Components/InactiveListings";
import ProfileSetting from "./Components/ProfileSetting";
import Privacy from "./Components/Privacy";
import TermsOfServices from "./Components/TermsOfServices";
import HelpCenter from "./Components/HelpCenter";
import AddQuestion from "./Components/AddQuestion";
import Blog from "./Components/Blog";
import AboutUs from "./Components/AboutUs";
import BlogDescription from "./Components/BlogDescription";
import Jobs from "./Components/CustomMade/Jobs";
import PostJob from "./Components/CustomMade/PostJob";
import MyJobs from "./Components/CustomMade/MyJobs";
import CustomMadeMesseges from "./Components/CustomMade/CustomMadeMesseges";

import Messages from "./Components/Messeges";
import JobDescription from "./Components/CustomMade/JobDescription";
import Sponsor from "./Components/Sponsor";
import Landing from "./Components/CustomMade/Landing";
import JobCategories from "./Components/CustomMade/JobCategories";
import MyProfile from "./Components/CustomMade/MyProfile";
import AuctionDashboard from "./Components/Auction/dashboard";
// import myAuctions from './Components/Auction/myAuctions'
// import AuctionCatalogue from './Components/Auction/auctionCatalogue'
// import ItemDetails from './Components/Auction/itemDetails'
// import HostDemo from './Components/Auction/hostDemo'
// import AuctionConfig from './Components/Auction/auctionLive'
// import AuctionConfigTimed from './Components/Auction/auctionTimed'
import ViewJobDetail from "./Components/CustomMade/ViewJobDetail";
import ConnectToEcternalStore from "./Components/ConnectToEcternalStore";
import AddCategory from "./Components/CustomMade/AddCategory";
// import AdminSponsor from './Components/adminWork/AdminSponsor'

////Exclusive Services Routes
import Services from "./Components/ExclusiveServices/Services";
import MyOrders from "./Components/ExclusiveServices/MyOrders";
import OrderDescription from "./Components/ExclusiveServices/OrderDescription";
import ExclusiveMesseges from "./Components/ExclusiveServices/ExclusiveMesseges";
import ServiceDescription from "./Components/ExclusiveServices/ServiceDescription";
import AddServices from "./Components/ExclusiveServices/SellerDashboard/AddService";
import SellerDashboard from "./Components/ExclusiveServices/SellerDashboard/SellerDashboard";
import MyServices from "./Components/ExclusiveServices/SellerDashboard/MyServices";
import SellerJobs from "./Components/ExclusiveServices/SellerDashboard/SellerJobs";
import MyEarnings from "./Components/ExclusiveServices/SellerDashboard/MyEarnings";
import SellerProfile from "./Components/ExclusiveServices/SellerDashboard/SellerProfile";
import MyServiceDescription from "./Components/ExclusiveServices/SellerDashboard/MyServiceDescription";
import SellerJobDescription from "./Components/ExclusiveServices/SellerDashboard/SellerJobDescription";
import SellerMesseges from "./Components/ExclusiveServices/SellerDashboard/SellerMesseges";
import PostBlog from "./Components/PostBlog";
import HomePageView from "./Components/View/HomePage/HomePageView";
import HeaderView from "./Components/View/Header/Header";
import Login from "./Components/View/LoginSignup/Login";
import ProductStore from "./Components/View/product/productStore/ProductStore";
import Catalogue from "./Components/View/product/catalogue/Catalogue";
import Footer from "./Components/View/Footer/Footer";
import ProductDetail from "./Components/View/product/productDetail/ProductDetail";
import CheckoutPage from "./Components/View/product/checkout/Checkout";
import LoginSignup from "./Components/LoginSignup"
import ReactWOW from "react-wow";

import firebase from "firebase";

class App extends React.Component {
  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyB7l2IVeBJW-mi9AmGDeSolH7lJi0zbtq8",
      authDomain: "myconsignmentlive.firebaseapp.com",
      databaseURL: "https://myconsignmentlive.firebaseio.com",
      projectId: "myconsignmentlive",
      storageBucket: "myconsignmentlive.appspot.com",
      messagingSenderId: "510537296972",
      appId: "1:510537296972:web:9c4396c09a1eba70bdd8e9",
      measurementId: "G-XCB0KBENXC",
    };
    firebase.initializeApp(firebaseConfig);
  }
  render() {
    return (
      <>
        {/* <HeaderView /> */}
        <Router>
          <ThemeProvider>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={HomePageView} />
            <Route path="/privacy-policy" component={Privacy} />
            <Route path="/terms-of-services" component={TermsOfServices} />
            <Route path="/help-center" component={HelpCenter} />
            <Route path="/add-question" component={AddQuestion} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog-description/:Id" component={BlogDescription} />
            <Route path="/custom-made" component={Landing} />
            <Route exact path="/custom-made-jobs" component={Jobs} />
            <Route
              path="/custom-made-jobs/:id/job-description"
              component={JobDescription}
            />
            <Route
              path="/custom-made-messeges"
              component={CustomMadeMesseges}
            />
            <Route exact path="/custom-made-my-jobs" component={MyJobs} />
            <Route exact path="/custom-made-profile" component={MyProfile} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/messages" component={Messages} />
            <Route
              path="/custom-made-profile/:id/custom-made-view-job"
              component={ViewJobDetail}
            />
            <Route
              path="/custom-made-my-jobs/:id/custom-made-view-job-detail"
              component={ViewJobDetail}
            />
            <Route
              path="/connect-to-external-store"
              component={ConnectToEcternalStore}
            />
            <Route
              path="/custom-made-post-job-select-category"
              component={JobCategories}
            />
            <Route path="/secondary/:index" component={ItemsDetail} />
            <Route path="/itemdescription/:index" component={ItemDescription} />
            <Route
              path="/custom-made-post-job-detail/:category"
              component={PostJob}
            />
            <Route path="/post-blog" component={PostBlog} />
            <Route path="/shipping-profile" component={ShippingProfile} />
            <Route path="/user-profile" component={Profile} />
            <Route path="/Check" component={Check} />
            <Route path="/sponsor" component={Sponsor} />
            <Route path="/drafts" component={Drafts} />
            <Route path="/user-profile-setting" component={ProfileSetting} />
            <Route path="/shipping-profile-form" component={ShipTemplate} />

            <Route path="/inactiveListings" component={InactiveListings} />
            <Route path="/become-pro" component={ProUser} />
            <Route path="/pro-subscription" component={ProSubscription} />
            <Route path="/auction" component={AuctionDashboard} />
            {/* <Route path="/auctionCatalogue/:id" component={AuctionCatalogue} />
      <Route path="/item/:auctionID/:itemID" component={ItemDetails} />
      <Route path="/host/:auctionID" component={HostDemo} />
      <Route path="/auctionLive/:auctionID" component={AuctionConfig} />
      <Route path="/auctionTimed/:auctionID" component={AuctionConfigTimed} />
      <Route path="/admin-sponsor-panel" component={AdminSponsor} />
    <Route path="/myAuctions" component={myAuctions} /> */}

            {/*Exclusive Services Routes*/}
            <Route exact path="/exclusive-services" component={Services} />
            <Route path="/add-category" component={AddCategory} />
            <Route path="/exclusive-services-my-orders" component={MyOrders} />
            <Route
              path="/exclusive-services-my-order-description/:jobId"
              component={OrderDescription}
            />
            <Route
              path="/exclusive-services-messeges"
              component={ExclusiveMesseges}
            />
            <Route
              path="/exclusive-services/:id/service-description"
              component={ServiceDescription}
            />
            <Route
              path="/exclusive-services/:id/seller-dashboard"
              component={SellerDashboard}
            />
            <Route
              path="/exclusive-services/:id/seller-add-services"
              component={AddServices}
            />
            <Route
              path="/exclusive-services/:id/seller-my-services"
              component={MyServices}
            />
            <Route
              path="/exclusive-services/:id/seller-my-jobs"
              component={SellerJobs}
            />
            <Route
              path="/exclusive-services/:id/seller-my-earnings"
              component={MyEarnings}
            />
            <Route
              path="/exclusive-services/:id/seller-my-profile"
              component={SellerProfile}
            />
            <Route
              path="/exclusive-services/:id/seller-my-service-description/:serviceId"
              component={MyServiceDescription}
            />
            <Route
              path="/exclusive-services/:id/seller-my-job-description/:jobId"
              component={SellerJobDescription}
            />
            <Route
              path="/exclusive-services/:id/seller-messeges"
              component={SellerMesseges}
            />
            <Route path="/login" component={Login} />
            <Route path="/loginSignup" component={LoginSignup} />
            <Route path="/store" component={ProductStore} />
            <Route path="/catalogue" component={Catalogue} />
            <Route path="/productDetail" component={ProductDetail} />
            <Route path="/checkout" component={CheckoutPage} />

            {/* <Footer /> */}
          </ThemeProvider>
        </Router>
      </>
    );
  }
}

export default App;
