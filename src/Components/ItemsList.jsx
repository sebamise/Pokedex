import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import FilterBarItem from "./FilterBarItem";
import "./Style.css";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import Loader from "./Loader";

const ItemsList = () => {
  const [itemList, setItemList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [combinationExists, setCombinationExists] = useState(true);
  const [error, setError] = useState(false);
  const [itemCache, setItemCache] = useState({});

  useEffect(() => {
    const cachedItemCache = localStorage.getItem("itemCache");
    if (cachedItemCache) {
      setItemCache(JSON.parse(cachedItemCache));
    } else {
      setItemCache({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("itemCache", JSON.stringify(itemCache));
  }, [itemCache]);

  useEffect(() => {
    if (filteredCategories.length > 0) {
      getFilteredList();
    } else {
      getItemList();
    }
  }, [filteredCategories, offset]);

  const getItemList = async () => {
    try {
      setIsLoading(true);

      const endpoint = `https://pokeapi.co/api/v2/item?limit=20&offset=${offset}`;

      if (itemCache[endpoint]) {
        setItemList(itemCache[endpoint]);
        return;
      }

      const response = await fetch(endpoint);
      const data = await response.json();

      setTotalCount(data.count);

      const updatedItemData = await Promise.all(
        data.results.map(async (item) => {
          const itemResponse = await fetch(item.url);
          const itemData = await itemResponse.json();

          return {
            id: itemData.id,
            name: itemData.name,
            spriteURL: itemData.sprites.default,
            cost: itemData.cost,
            category: itemData.category.name,
          };
        })
      );

      setItemList(updatedItemData);
      setItemCache((prevCache) => ({
        ...prevCache,
        [endpoint]: updatedItemData,
      }));
    } catch (error) {
      console.log("Error:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredList = async () => {
    try {
      setIsLoading(true);

      const updatedItemData = [];

      const typePromises = filteredCategories.map(async (category) => {
        const categoryUrl = `https://pokeapi.co/api/v2/item-category/${category}`;

        if (itemCache[categoryUrl]) {
          return itemCache[categoryUrl];
        }

        const categoryResponse = await fetch(categoryUrl);
        const categoryData = await categoryResponse.json();

        const itemUrls = categoryData.items.map((itemEntry) => itemEntry.url);
        setItemCache((prevCache) => ({
          ...prevCache,
          [categoryUrl]: itemUrls,
        }));

        return itemUrls;
      });

      const categoryItemUrls = await Promise.all(typePromises);
      const commonItemUrls = categoryItemUrls.reduce((a, b) =>
        a.filter((url) => b.includes(url))
      );

      const itemPromises = commonItemUrls.map(async (url) => {
        if (itemCache[url]) {
          return itemCache[url];
        }

        const response = await fetch(url);
        const itemData = await response.json();

        const item = {
          id: itemData.id,
          name: itemData.name,
          spriteURL: itemData.sprites.default,
          cost: itemData.cost,
          category: itemData.category.name,
        };

        setItemCache((prevCache) => ({
          ...prevCache,
          [url]: item,
        }));

        return item;
      });

      const commonItemData = await Promise.all(itemPromises);

      for (const item of commonItemData) {
        if (
          filteredCategories.every((category) =>
            item.category.includes(category)
          )
        ) {
          updatedItemData.push(item);
        }
      }

      const combinationExists = updatedItemData.length > 0;
      setCombinationExists(combinationExists);

      setTotalCount(updatedItemData.length);
      setFilteredList(updatedItemData);
      setError(!combinationExists);
    } catch (error) {
      console.log("Error:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searching) {
      handleSearchButtonClick();
    }
  }, [searching]);

  const handleSearchButtonClick = async () => {
    try {
      setIsLoading(true);

      if (searchTerm.trim() === "") {
        setFilteredList([]);
        setTotalCount(itemList.length);
        setError(false);
        return;
      }

      const endpoint = `https://pokeapi.co/api/v2/item/${searchTerm}`;

      if (itemCache[endpoint]) {
        setFilteredList([itemCache[endpoint]]);
        setTotalCount(1);
        setError(false);
        return;
      }

      const response = await fetch(endpoint);
      const data = await response.json();

      const searchItem = {
        id: data.id,
        name: data.name,
        spriteURL: data.sprites.default,
        cost: data.cost,
        category: data.category.name,
      };

      setFilteredList([searchItem]);
      setTotalCount(1);
      setError(false);

      setItemCache((prevCache) => ({
        ...prevCache,
        [endpoint]: searchItem,
      }));
    } catch (error) {
      console.log("Error:", error);
      setFilteredList([]);
      setTotalCount(0);
      setError(true);
    } finally {
      setIsLoading(false);
      setSearching(false);
    }
  };

  const getSearchItem = () => {
    setSearchTerm(search);
    setSearching(true);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilter = (filteredCategories) => {
    setFilteredCategories(filteredCategories);
    setOffset(0);
  };

  const displayedItems =
    filteredCategories.length > 0 ? filteredList : itemList;

  const filteredItems = displayedItems
    .concat(filteredList)
    .filter((item, index, array) => {
      const foundIndex = array.findIndex((i) => i.id === item.id);
      return foundIndex === index;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const startIndex = (currentPage - 1) * 20;
  const endIndex = startIndex + 20;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const handleReset = () => {
    setFilteredCategories([]);
    setSearchTerm("");
    setSearch("");
    setOffset(0);
    setSearching(false);
    setFilteredList([]);
    setError(false);
    setCurrentPage(1);
  };

  return (
    <>
      <section className="flex mt-5 p-2">
        <FilterBarItem handleFilter={handleFilter} />
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          getSearchItem={getSearchItem}
          search={search}
          handleReset={handleReset}
        />
      </section>

      {combinationExists ? (
        <div className="flex flex-wrap justify-center p-4">
          {isLoading ? (
            <Loader />
          ) : (
            paginatedItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                spriteURL={item.spriteURL}
                itemId={item.id}
                name={item.name}
                cost={item.cost}
                category={item.category}
              />
            ))
          )}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center p-4">
          <ItemCard error={error} />
        </div>
      )}

      <Pagination
        offset={offset}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setOffset={setOffset}
        filteredCategories={filteredCategories}
      />
    </>
  );
};

export default ItemsList;
