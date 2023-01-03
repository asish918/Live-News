import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  const query = gql`
    query MyQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "in"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;

  const res = await fetch(
    "https://hanzhong.stepzen.net/api/errant-dragon/__graphql",
    {
      method: "POST",
      cache: isDynamic ? "no-store" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 84600 },
      headers: {
        "Content-type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: `${process.env.MEDIASTACK_API_KEY}`,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );

  console.log("Loading new data from API for category >>> ", category, keywords);

  const newsResponse = await res.json();

  const news = sortNewsByImage(newsResponse.data.myQuery);

  return news;
};

export default fetchNews;
