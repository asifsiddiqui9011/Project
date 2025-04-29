import { useContext } from "react";
import CardsGrid from "../../components/ScrollDiv/CardsGrid";
import HomeCatogryBtn from "../../components/buttons/HomeCatogryBtn";
import { ShopContext } from "../../context/shopContext";
import Cards from "../../components/ScrollDiv/Cards";
import Loader from "../../components/Loader/Loader";

function Home(){

    const{allProducts} = useContext(ShopContext);
    

    const recentProducts = allProducts
        .filter((product) => {
            const productDate = new Date(product.createdAt);
            const currentDate = new Date();
            const timeDifference = currentDate - productDate;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            return daysDifference <= 30; // Filter products created in the last 30 days
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort products in descending order by createdAt date
        .slice(0, 8); // Only show 8 recent products

    const trendingProducts = allProducts
        .filter((product) => {
            const productDate = new Date(product.createdAt);
            const currentDate = new Date();
            const timeDifference = currentDate - productDate;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            return daysDifference <= 7; // Filter products created in the last 7 days
        })
        .sort((a, b) => {
            const scoreA = (a.sales?.orderCount || 0) + (a.sales?.unitsSold || 0) + (a.reviews?.length || 0);
            const scoreB = (b.sales?.orderCount || 0) + (b.sales?.unitsSold || 0) + (b.reviews?.length || 0);
            return scoreB - scoreA;
        })
        .slice(0, 8);


    return (
        <>
            <HomeCatogryBtn />
            <CardsGrid />
            <h1>Trending</h1>
            <hr />
            <div className="CardsGrid">

                {trendingProducts ?  trendingProducts.map((item) => (
                    <Cards
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        image={item.images[0].image_url}
                        description={item.description}
                        loading="lazy"  // Lazy loading applied to trending products
                    />
                )): <Loader />}
            </div>
            <h1>Recent</h1>
            <hr />
            <div className="CardsGrid">
                {recentProducts.map((item) => (
                    <Cards
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        image={item.images[0].image_url}
                        description={item.description}
                    />
                ))}
            </div>
        </>
    )
}

export default Home;