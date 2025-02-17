import useProducts from "../../../hooks/useProducts";

const OfferItem = () => {
    const [products, , offeredProducts] = useProducts();
    console.log(products, offeredProducts);
    
    return (
        <div>
            <h2>Offer Item: { offeredProducts.length}</h2>
        </div>
    );
};

export default OfferItem;