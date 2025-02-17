import Banner from "../Banner/Banner";
import MarqueSlider from "../MarqueSlider/MarqueSlider";
import OfferItem from "../OfferItem/OfferItem";
import Parallax from "../Parallax/Parallax";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MarqueSlider></MarqueSlider>
            <OfferItem></OfferItem>
            <Parallax></Parallax>
        </div>
    );
};

export default Home;