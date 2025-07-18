import React from 'react';
import Banner from '../Banner/Banner';
import AboutBuilding from '../AboutBuilding/AboutBuilding';
import Coupons from '../coupons/Coupons';
import ApartmentLocation from '../ApartmentLocation/ApartmentLocation';
import Amenities from '../Amenities/Amenities';
import Testimonials from '../Testimonials/Testimonials';

const Hero = () => {
    return (
        <>
            <Banner></Banner>
            <AboutBuilding></AboutBuilding>
            <Coupons></Coupons>
            <ApartmentLocation></ApartmentLocation>
            <Amenities></Amenities>
            <Testimonials></Testimonials>
        </>
    );
};

export default Hero;