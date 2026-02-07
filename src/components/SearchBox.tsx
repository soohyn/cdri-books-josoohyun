import {
  useId,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";
import Button from "./Button";

interface SearchBoxProps {
  selectValue: Target | null;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  setSelectValue: Dispatch<SetStateAction<Target | null>>;
  onSearch: () => void;
}

const SearchBox = ({
  inputValue,
  selectValue,
  setSelectValue,
  setInputValue,
  onSearch,
}: SearchBoxProps) => {
  const id = useId();
  const [openDetailSearch, setOpenDetailSearch] = useState(false);

  const handleChangeinputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSearch();
  };

  const handleOpenDetailSearch = () => {
    setOpenDetailSearch((prev) => !prev);
    setInputValue("");
  };

  return (
    <section>
      <h3>도서 검색</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor={id} className="sr-only">
          도서 검색어
        </label>
        <input
          id={id}
          name="query"
          placeholder="검색어 입력"
          type="text"
          value={openDetailSearch ? "" : inputValue}
          onChange={handleChangeinputValue}
        />
      </form>

      <button type="button" onClick={handleOpenDetailSearch}>
        상세검색
      </button>
      {openDetailSearch && (
        <form onSubmit={handleSubmit}>
          <select
            name="target"
            aria-label="상세 검색 항목"
            value={selectValue ?? undefined}
            onChange={(e) => setSelectValue(e.target.value as Target)}
          >
            <option value="title">제목</option>
            <option value="person">저자명</option>
            <option value="publisher">출판사</option>
          </select>
          <input
            name="query"
            placeholder="검색어 입력"
            aria-label="상세 검색어"
            value={inputValue}
            onChange={handleChangeinputValue}
          />
          <Button type="submit" label="검색하기" aria-label="상세 검색하기" />
        </form>
      )}
    </section>
  );
};

export default SearchBox;
