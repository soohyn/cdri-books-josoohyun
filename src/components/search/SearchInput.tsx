import { useId, useState, type ChangeEvent, type SubmitEvent } from "react";
import Search from "../../assets/Icon_search.svg";
import SearchHistory from "./SearchHistory";

interface SearchInputProps {
  inputValue: string;
  isOpenDetailSearch: boolean;
  searchHistory: string[];
  deleteSearchHistory: (deleteItem: string) => void;
  handleClickHistory: (history: string) => void;
  handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  handleChangeinputValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  inputValue,
  isOpenDetailSearch,
  handleSubmit,
  searchHistory,
  deleteSearchHistory,
  handleClickHistory,
  handleChangeinputValue,
}: SearchInputProps) => {
  const id = useId();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor={id}
        className={`flex flex-col bg-palette-lightgray ${isFocus ? "rounded-3xl" : "rounded-full"} py-2.5 pl-2.5 w-120 max-w-120`}
      >
        <div role="group" className="flex gap-3">
          <span className="sr-only">도서 검색어</span>
          <img src={Search} alt="" aria-hidden={true} />
          <input
            id={id}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            className="outline-none placeholder:text-text-subtitle"
            name="query"
            placeholder="검색어 입력"
            type="text"
            value={isOpenDetailSearch ? "" : inputValue}
            onChange={handleChangeinputValue}
          />
        </div>
        {isFocus && (
          <SearchHistory
            searchHistory={searchHistory}
            deleteSearchHistory={deleteSearchHistory}
            handleClickHistory={handleClickHistory}
          />
        )}
      </label>
    </form>
  );
};

export default SearchInput;
