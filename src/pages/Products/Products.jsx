import useProducts from "../../hooks/useProducts";
import img from "../../assets/products/nursery/nursery4.jpg";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Product from "../../components/Product/Product";

const Products = () => {
    const [products, , offeredProducts, newProducts, clothingProducts, toysProducts, feedingProducts, nurseryProducts, healthProducts, travelProducts, groomingProducts] = useProducts();

    const categories = [
        { name: "All Products", items: products },
        { name: "Offered Products", items: offeredProducts },
        { name: "New Products", items: newProducts },
        { name: "Clothing", items: clothingProducts },
        { name: "Toys", items: toysProducts },
        { name: "Feeding", items: feedingProducts },
        { name: "Nursery", items: nurseryProducts },
        { name: "Health", items: healthProducts },
        { name: "Travel", items: travelProducts },
        { name: "Bath & Grooming", items: groomingProducts }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url("${img}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
                <div className="relative h-full flex flex-col justify-center items-center text-white px-4 space-y-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
                        Discover Our Collection
                    </h2>
                    <p className="text-lg md:text-xl text-center max-w-2xl text-gray-200">
                        Quality products for every stage of childhood development
                    </p>
                    <div className="w-24 h-1 bg-[#FF8080] rounded-full mt-4" />
                </div>
            </div>

            <div className="container mx-auto py-8 px-4">
                <Tabs className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/4">
                        <div className="sticky top-4">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 px-2">Categories</h3>
                            <TabList className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                                {categories.map(({ name }, index) => (
                                    <Tab
                                        key={index}
                                        className="group flex items-center p-3 lg:p-4 rounded-xl cursor-pointer transition-all duration-200
                                            text-sm lg:text-base font-medium
                                            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FF9B9B] focus:ring-offset-2
                                            aria-selected:bg-[#FF8080] aria-selected:text-white aria-selected:shadow-md
                                            whitespace-nowrap lg:whitespace-normal"
                                    >
                                        <span className="flex-1">{name}</span>
                                        <span className="hidden lg:inline-flex items-center justify-center w-6 h-6 text-xs 
                                            group-aria-selected:bg-[#FF6B6B] bg-gray-200 rounded-full ml-2 transition-colors">
                                            {index + 1}
                                        </span>
                                    </Tab>
                                ))}
                            </TabList>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm p-4 lg:p-6">
                            {
                                categories.map(({ items }, index) => (
                                    <TabPanel key={index}>
                                        <Product items={items} />
                                    </TabPanel>
                                ))
                            }
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default Products;