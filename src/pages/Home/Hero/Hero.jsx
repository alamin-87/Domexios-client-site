import React from 'react';
import Banner from '../Banner/Banner';
import AboutBuilding from '../AboutBuilding/AboutBuilding';
import Coupons from '../coupons/Coupons';
import ApartmentLocation from '../ApartmentLocation/ApartmentLocation';
import Amenities from '../Amenities/Amenities';
import Testimonials from '../Testimonials/Testimonials';
import Safety from '../Safety/Safety';
import Gallery from '../Gallery/Gallery';

const Hero = () => {
    return (
        <>
            <Banner />
            <AboutBuilding />
            <Gallery />
            <Amenities />
            <Safety />
            <ApartmentLocation />
            <Coupons />
            <Testimonials />
        </>
    );
};

export default Hero;