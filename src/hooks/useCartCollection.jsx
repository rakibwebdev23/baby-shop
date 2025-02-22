import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCartCollection = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { data: carts = [], refetch } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        }
    })

    return [carts, refetch];
};

export default useCartCollection;