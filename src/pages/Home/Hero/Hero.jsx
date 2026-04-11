import Banner from '../Banner/Banner';
import FeaturedApartments from '../FeaturedApartments/FeaturedApartments';
import AboutBuilding from '../AboutBuilding/AboutBuilding';
import Coupons from '../coupons/Coupons';
import ApartmentLocation from '../ApartmentLocation/ApartmentLocation';
import Amenities from '../Amenities/Amenities';
import Testimonials from '../Testimonials/Testimonials';
import Safety from '../Safety/Safety';
import Gallery from '../Gallery/Gallery';
import Stats from '../Stats/Stats';
import Newsletter from '../Newsletter/Newsletter';
import SmartTools from '../SmartTools/SmartTools';

const Hero = () => {
    return (
        <>
            <Banner />
            <FeaturedApartments />
            <Stats />
            <AboutBuilding />
            <Gallery />
            <Amenities />
            <Safety />
            <SmartTools />
            <Newsletter />
            <ApartmentLocation />
            <Coupons />
            <Testimonials />
        </>
    );
};

export default Hero;