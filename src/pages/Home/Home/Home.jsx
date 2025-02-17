import Banner from "../Banner/Banner";
import MarqueSlider from "../MarqueSlider/MarqueSlider";
import NewProduct from "../NewProduct/NewProduct";
import OfferItem from "../OfferItem/OfferItem";
import Parallax from "../Parallax/Parallax";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <MarqueSlider></MarqueSlider>
            <OfferItem></OfferItem>
            <Parallax></Parallax>
            <NewProduct></NewProduct>
        </div>
    );
};

export default Home;