import React from "react";
import { useQuery } from "react-query";
import { ApiDataTypeCate, getCategories } from "../../services/getCategories";
import "./index.css"; // Ensure this import is present
import CardPlaylist from "../../components/CardPlaylist";
import FooterComponent from "../../components/FooterComponent";
import { searchSpotify, TrackItem } from "../../services/search";
import { useSearch } from "../../Contex/searchContext";

const SearchPage = () => {
  const { searchQuery } = useSearch();
  const { data: categoriesData, error: categoriesError, isLoading: isCategoriesLoading } = useQuery<ApiDataTypeCate[], Error>("categories", getCategories);



  const { data: searchData } = useQuery<TrackItem[], Error>(
    ["searchResults", searchQuery],
    () => searchSpotify(searchQuery),
    {
      enabled: !!searchQuery,
    }
  );

  const limitedCategoriesData = categoriesData?.slice(0, 20);

  return (
    <div className="user-profile">
      <h1>{searchQuery ? "Search Results" : "Browse all"}</h1>
      <div className="card-search-container">
        {searchQuery
          ? searchData?.map((track) => (
              <CardPlaylist
                key={track.id}
                cover={track.album.images[0].url}
                title={track.name}
              />
            ))
          : limitedCategoriesData?.map((category) => (
              <CardPlaylist
                key={category.id}
                cover={category.icons[0].url}
                title={category.name}
              />
            ))}
      </div>
      <FooterComponent />
    </div>
  );
};

export default SearchPage;
