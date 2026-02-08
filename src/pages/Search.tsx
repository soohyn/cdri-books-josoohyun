import { useEffect, useState } from "react";

import SearchBox from "../components/search/SearchBox";
import SearchCountText from "../components/SearchCountText";
import { useQuery } from "@tanstack/react-query";
import { requestBooks } from "../api/book";
import NoData from "../components/NoData";
import BookListItemContainer from "../components/book/BookListItemContainer";
import { useLikeStorage } from "../hooks/useLikeStorage";

const SEARCH_HISTORY_KEY = "search-history";

const getStorageHistory = () => {
  const storageData: string = localStorage.getItem(SEARCH_HISTORY_KEY) ?? "[]";

  return JSON.parse(storageData);
};

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState<Target | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchTarget, setSearchTarget] = useState<Target | null>(null);
  const [searchHistory, setSearchHistory] =
    useState<string[]>(getStorageHistory);
  const { likes, toggleLike } = useLikeStorage();

  const { data } = useQuery({
    queryKey: ["books", searchQuery],
    queryFn: () =>
      requestBooks({
        query: searchQuery,
        target: searchTarget ?? undefined,
      }),
  });

  const setStorageHistory = (searchHistory: string[]) => {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory));
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
    setSearchTarget(selectValue);
    addSearchHistory(inputValue);
  };

  const handleClickHistory = (history: string) => {
    setInputValue(history);
    setSearchQuery(history);
  };

  const handleClickLike = (item: string) => {
    toggleLike(item);
  };

  useEffect(() => {
    setStorageHistory(searchHistory);
  }, [searchHistory]);

  return (
    <main>
      <section>
        <h2 className="sr-only">Search</h2>
        <SearchBox
          inputValue={inputValue}
          selectValue={selectValue}
          setInputValue={setInputValue}
          setSelectValue={setSelectValue}
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
