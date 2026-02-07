import { useEffect, useState } from "react";

import SearchBox from "../components/SearchBox";
import SearchCountText from "../components/SearchCountText";
import { useQuery } from "@tanstack/react-query";
import { requestBooks } from "../api/book";
import NoData from "../components/NoData";
import BookListItemContainer from "../components/BookListItemContainer";

const SEARCH_HISTORY_KEY = "search-history";
const LIKE_KEY = "like";

const getStorageHistory = () => {
  const storageData: string = localStorage.getItem(SEARCH_HISTORY_KEY) ?? "[]";

  return JSON.parse(storageData);
};

const getStorageLike = () => {
  const storageData: string = localStorage.getItem(LIKE_KEY) ?? "[]";

  return JSON.parse(storageData);
};

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchHistory, setSearchHistory] =
    useState<string[]>(getStorageHistory);
  const [likes, setLikes] = useState<string[]>(getStorageLike);

  const { data } = useQuery({
    queryKey: ["books", searchQuery],
    queryFn: () => requestBooks({ query: searchQuery }),
  });

  const setStorageHistory = (searchHistory: string[]) => {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
  };

  const setStorageLike = (like: string[]) => {
    localStorage.setItem(LIKE_KEY, JSON.stringify(Array.from(like)));
  };

  const addSearchHistory = (searchQuery: string) => {
    setSearchHistory((prev) => {
      const newHistory = prev.filter((item) => item !== searchQuery);

      if (newHistory.length >= 8) {
        return [...newHistory.slice(0, 1), searchQuery];
      } else {
        return [...newHistory, searchQuery];
      }
    });
  };

  const deleteSearchHistory = (deleteItem: string) => {
    setSearchHistory((prev) => prev.filter((item) => item !== deleteItem));
  };

  const handleOnSearch = () => {
    setSearchQuery(inputValue);
    addSearchHistory(inputValue);
  };

  const handleClickHistory = (history: string) => {
    setInputValue(history);
    setSearchQuery(history);
  };

  const handleClickLike = (item: string) => {
    setLikes((prev) => {
      if (prev.includes(item)) return prev.filter((item) => item !== item);
      else return [...prev, item];
    });
  };

  useEffect(() => {
    setStorageHistory(searchHistory);
  }, [searchHistory]);

  useEffect(() => {
    setStorageLike(likes);
  }, [likes]);

  return (
    <main>
      <section>
        <h1>Search</h1>
        <SearchBox
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSearch={handleOnSearch}
        />
        {searchHistory.reverse().map((item, index) => {
          return (
            <div key={item + index}>
              <span onClick={() => handleClickHistory(item)}>{item}</span>
              <button
                onClick={() => {
                  deleteSearchHistory(item);
                }}
              >
                x
              </button>
            </div>
          );
        })}
        <SearchCountText count={data?.meta.total_count ?? 0} />
        {(data?.meta.total_count ?? 0 > 0) ? (
          data?.documents.map((item, index) => {
            return (
              <BookListItemContainer
                key={item.title + index}
                item={item}
                isLike={likes.includes(item.title)}
                handleClickLike={handleClickLike}
              />
            );
          })
        ) : (
          <NoData message="검색된 결과가 없습니다." />
        )}
      </section>
    </main>
  );
}

export default Search;
