import useCartCollection from "../../../../hooks/useCartCollection";

const UserHome = () => {
    const [carts] = useCartCollection();
    const orders = carts.reduce((total, item) => total + item.price, 0);
    const allOrders = orders.toFixed(2);
    const totalPrice = parseFloat(allOrders);

    return (
        <div className="stats shadow w-full">
            <div className="stat w-1/2">
                <div className="stat-title">Total Order</div>
                <div className="stat-value text-primary">{ carts.length}</div>
                <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
                <div className="stat-title">Total Price</div>
                <div className="stat-value text-secondary">$ { totalPrice}</div>
                <div className="stat-desc">21% more than last month</div>
            </div>
        </div>
    );
};

export default UserHome;