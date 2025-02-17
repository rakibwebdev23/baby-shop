import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {
    const axiosPublic = useAxiosPublic();
    const { data: products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosPublic.get("/products");
            return res.data;
        }
    });

    const offeredProducts = products.filter(product => product.category === "offered");
    const newProducts = products.filter(product => product.category === "new");
    const clothingProducts = products.filter(product => product.category === "clothing");
    const toysProducts = products.filter(product => product.category === "toys");
    const feedingProducts = products.filter(product => product.category === "feeding");
    const nurseryProducts = products.filter(product => product.category === "nursery");
    const healthProducts = products.filter(product => product.category === "health");
    const travelProducts = products.filter(product => product.category === "travel");
    const groomingProducts = products.filter(product => product.category === "grooming");
    console.log("all products",products, offeredProducts, newProducts, clothingProducts, toysProducts, feedingProducts, nurseryProducts, healthProducts, travelProducts, groomingProducts);
    

    return [products, refetch, offeredProducts, newProducts, clothingProducts, toysProducts, feedingProducts, nurseryProducts, healthProducts, travelProducts, groomingProducts];
};

export default useProducts;