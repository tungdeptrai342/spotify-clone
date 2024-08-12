import React from "react";
import { useSearch } from "../../Contex/searchContext";
import { Input } from "antd";

const SearchInput = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Cập nhật giá trị searchQuery trong context
  };

  return (
    <Input
      type="text"
      value={searchQuery}
      onChange={handleInputChange}
      style={{
        marginLeft: "10px",
        backgroundColor: "#242424",
        border: "0",
        borderRadius: "500px",
        color: "white",
        width:"300px"
      }}
    />
  );
};

export default SearchInput;
