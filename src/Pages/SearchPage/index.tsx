import React from "react";
import { useQuery } from "react-query";
import { ApiDataTypeCate, getCategories } from "../../services/getCategories";
import "./index.css"; // Ensure this import is present
import CardPlaylist from "../../components/CardPlaylist";
import FooterComponent from "../../components/FooterComponent";

const SearchPage = () => {
  const { data, error, isLoading } = useQuery<ApiDataTypeCate[], Error>("categories", getCategories);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const limitedData = data?.slice(0, 20);

  return (
    <div className="user-profile">
      <h1>Browse all</h1>
      <div className="card-search-container">
        {limitedData?.map((category) => (
          <CardPlaylist
            key={category.id}
            cover={category.icons[0].url}
            title={category.name}
          />
        ))}
      </div>
      <FooterComponent/>
    </div>
  );
};

export default SearchPage;
