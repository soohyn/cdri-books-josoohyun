import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";

import SearchInput from "./SearchInput";
import SearchDetail from "./SearchDetail";

interface SearchBoxProps {
  selectValue: Target | null;
  inputValue: string;
  searchHistory: string[];
  setInputValue: Dispatch<SetStateAction<string>>;
  setSelectValue: Dispatch<SetStateAction<Target | null>>;
  onSearch: () => void;
  deleteSearchHistory: (deleteItem: string) => void;
  handleClickHistory: (history: string) => void;
}

const SearchBox = ({
  inputValue,
  selectValue,
  searchHistory,
  setSelectValue,
  setInputValue,
  onSearch,
  deleteSearchHistory,
  handleClickHistory,
}: SearchBoxProps) => {
  const [isOpenDetailSearch, setIsOpenDetailSearch] = useState(false);

  const handleChangeinputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSearch();
  };

  const handleOpenDetailSearch = () => {
    setIsOpenDetailSearch((prev) => !prev);
    setInputValue("");
  };

  return (
    <section>
      <h3 className="typo-title typo-title-2 mb-7">도서 검색</h3>
      <div className="flex flex-row items-center gap-3">
        <SearchInput
          searchHistory={searchHistory}
          inputValue={inputValue}
          isOpenDetailSearch={isOpenDetailSearch}
          handleSubmit={handleSubmit}
          handleChangeinputValue={handleChangeinputValue}
          deleteSearchHistory={deleteSearchHistory}
          handleClickHistory={handleClickHistory}
        />

        <SearchDetail
          inputValue={inputValue}
          selectValue={selectValue ?? "title"}
          setSelectValue={setSelectValue}
          isOpenDetailSearch={isOpenDetailSearch}
          handleSubmit={handleSubmit}
          handleChangeinputValue={handleChangeinputValue}
          handleOpenDetailSearch={handleOpenDetailSearch}
        />
      </div>
    </section>
  );
};

export default SearchBox;
