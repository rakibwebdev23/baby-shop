import Cart from "../../../components/Cart/Cart";
import Container from "../../../components/Container/Container";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useProducts from "../../../hooks/useProducts";

const OfferItem = () => {
    const [, , offeredProducts] = useProducts();

    return (
        <Container>
            <SectionTitle title="Offered"></SectionTitle>
                <div className="grid grid-cols-3 justify-center mx-auto">
                    {
                        offeredProducts.map(item => <Cart
                            key={item._id}
                            item={item}
                        ></Cart>)
                    }
                </div>
        </Container>
    );
};

export default OfferItem;