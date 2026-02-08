import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import useRestMenu from "../utils/useRestMenu";
import RestaurantCategory from "../Components/RestaurantCategory";
import { Theme } from "../Contexts/ThemeContext";

const RestMenu = () => {

    const { theme } = useContext(Theme);
    const params = useParams();
    let restid = params.restid;

    const [showIndex, setshowIndex] = useState(null);
    const [searchedText, setsearchedText] = useState("");
    const [fiteredCategoriesCards, setfiteredCategoriesCards] = useState([]);

    const { restMenu } = useRestMenu(restid);

    useEffect(() => {
        if (restMenu) {
            const groupedCard = restMenu?.cards?.find(card => card?.groupedCard)?.groupedCard;
            const regularCards = groupedCard?.cardGroupMap?.REGULAR.cards || [];
            const categoryCards = regularCards.filter((card) =>
                card?.card?.card?.["@type"]?.includes("ItemCategory")
            );
            setfiteredCategoriesCards(categoryCards);
        }
    }, [restMenu]);

    if (restMenu === null)
        return <Spinner className={`${theme === "dark" ? "text-white" : ""}`} />

    const groupedCard = restMenu?.cards?.find(card => card?.groupedCard)?.groupedCard;
    const regularCards = groupedCard?.cardGroupMap?.REGULAR.cards || [];
    const categoryCards = regularCards.filter((card) =>
        card?.card?.card?.["@type"]?.includes("ItemCategory")
    );

    // const { name } = restMenu?.cards[2]?.card?.card?.info;
    const restaurantInfo = restMenu?.cards?.find((card) => card?.card?.card?.info)?.card?.card?.info;

const name = restaurantInfo?.name;

    const handleSearch = (searchedText) => {
        const filteredCards = categoryCards.map((category) => {
            const items = category?.card?.card?.itemCards || [];

            const filteredItems = items.filter((item) =>
                item?.card?.info?.name?.toLowerCase().includes(searchedText.toLowerCase())
            );

            if (filteredItems.length > 0) {
                return {
                    ...category,
                    card: {
                        ...category.card,
                        card: {
                            ...category.card.card,
                            itemCards: filteredItems,
                        },
                    },
                };
            }
            return null;
        }).filter(Boolean);

        setfiteredCategoriesCards(filteredCards);
    };

    
    {fiteredCategoriesCards.length === 0 && (
    <p className="text-center text-gray-500 mt-10">
        No dishes found 😕
    </p>
    )}


    return (
        <div className={`mt-4 p-4 w-full flex flex-col items-center gap-3 min-h-screen
            ${theme === "dark"
                ? "bg-gradient-to-b from-gray-950 via-black to-gray-900 text-gray-100"
                : "bg-gray-50"}`}>

            {/* Restaurant Name */}
            <div className={`w-[92%] md:w-[75%] border rounded-2xl mt-4
                ${theme === "dark"
                    ? "border-gray-700 bg-gray-900 shadow-lg"
                    : "bg-black text-white shadow-md"}`}>
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide text-center py-6">
                    {name}
                </h1>
            </div>

            {/* Search Section */}
            <div className={`flex flex-col md:flex-row items-center justify-between gap-3
                w-[92%] md:w-[65%] mt-6 p-4 border rounded-xl transition
                ${theme === "dark"
                    ? "border-gray-700 bg-gray-900/70 backdrop-blur-md shadow-md"
                    : "border-gray-300 bg-white shadow-sm"}`}>

                <input
                    type="text"
                    placeholder="Search Dishes..."
                    className={`w-full md:w-1/2 rounded-md p-2 text-sm md:text-base outline-none
                        ${theme === "dark"
                            ? "border border-gray-600 bg-gray-950 text-green-300 placeholder-gray-500 focus:ring-2 focus:ring-green-500"
                            : "border border-gray-400 text-black focus:ring-2 focus:ring-black/40"}`}
                    onChange={(e) => setsearchedText(e.target.value)}
                />

                <button
                    className={`py-2 px-6 rounded-md active:scale-95 transition duration-200
                        ${theme === "dark"
                            ? "bg-green-600 text-white hover:bg-green-500 shadow-md"
                            : "bg-black text-white hover:bg-gray-800 shadow"}`}
                    onClick={() => handleSearch(searchedText)}
                >
                    Search
                </button>
            </div>

            {/* Divider */}
            <div className="w-[90%] md:w-[80%] my-6">
                <hr className={`${theme === "dark" ? "border-gray-700" : "border-gray-300"}`} />
            </div>

            {/* Categories */}
            <div className="w-[92%] md:w-[65%] mx-auto rounded-xl">
                {fiteredCategoriesCards.map((category, index) => (
                    <RestaurantCategory
                        showMenu={index === showIndex}
                        setshowIndex={() => setshowIndex(showIndex === index ? null : index)}
                        key={category?.card?.card?.title}
                        data={category?.card?.card}
                    />
                ))}
            </div>
        </div>
    );
};

export default RestMenu;









