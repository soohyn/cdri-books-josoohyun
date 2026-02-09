import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import SearchBox from "../components/search/SearchBox";
import { requestBooks } from "../api/book";
import NoData from "../components/NoData";
import BookListItemContainer from "../components/book/BookListItemContainer";
import { useLikeStorage } from "../hooks/useLikeStorage";
import CountText from "../components/CountText";

const SEARCH_HISTORY_KEY = "search-history";

const MAX_HISTORY = 8;

const getStorageHistory = () => {
  const storageData: string = localStorage.getItem(SEARCH_HISTORY_KEY) ?? "[]";

  return JSON.parse(storageData) ?? [];
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

      if (newHistory.length >= MAX_HISTORY) {
        return [searchQuery, ...newHistory.slice(0, MAX_HISTORY - 1)];
      } else {
        return [searchQuery, ...newHistory];
      }
    });
  };

  const deleteSearchHistory = (deleteItem: string) => {
    setSearchHistory((prev) => prev.filter((item) => item !== deleteItem));
  };

  const handleOnSearch = () => {
    if (!inputValue.trim()) return;
    setSearchQuery(inputValue);
    setSearchTarget(selectValue);
    addSearchHistory(inputValue);
  };

  const handleClickHistory = (history: string) => {
    setInputValue(history);
    setSearchQuery(history);
    addSearchHistory(history);
  };

  const handleClickLike = (item: string) => {
    toggleLike(item);
  };

  useEffect(() => {
    setStorageHistory(searchHistory);
  }, [searchHistory]);

  return (
    <section className="w-full">
      <SearchBox
        inputValue={inputValue}
        selectValue={selectValue}
        setInputValue={setInputValue}
        setSelectValue={setSelectValue}
        onSearch={handleOnSearch}
        searchHistory={searchHistory}
        deleteSearchHistory={deleteSearchHistory}
        handleClickHistory={handleClickHistory}
      />

      <CountText label="도서 검색 결과" count={data?.meta.total_count ?? 0} />
      <ul>
        {(data?.meta.total_count ?? 0 > 0) ? (
          data?.documents.map((item, index) => {
            return (
              <li
                key={item.title + index}
                className="not-last:border-b border-b-palette-gray"
              >
                <BookListItemContainer
                  item={item}
                  isLike={likes.includes(item.title)}
                  handleClickLike={handleClickLike}
                />
              </li>
            );
          })
        ) : (
          <NoData message="검색된 결과가 없습니다." />
        )}
      </ul>
    </section>
  );
}

export default Search;
