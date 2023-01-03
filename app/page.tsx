import React from "react";
import { categories } from "../constants";
import fetchNews from "../lib/fetchNews";

const HomePage = async () => {
    const news: NewsResponse = await fetchNews(categories.join(','))

    console.log(news);

    return <div>
        HomePage
        </div>
}

export default HomePage;