import { useId, type ChangeEvent, type SubmitEvent } from "react";
import Search from "../../assets/Icon_search.svg";

interface SearchInputProps {
  inputValue: string;
  isOpenDetailSearch: boolean;
  handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  handleChangeinputValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  inputValue,
  isOpenDetailSearch,
  handleSubmit,
  handleChangeinputValue,
}: SearchInputProps) => {
  const id = useId();

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor={id}
        className="flex gap-3 bg-palette-lightgray rounded-full py-2.5 pl-2.5 max-w-120"
      >
        <span className="sr-only">도서 검색어</span>
        <img src={Search} alt="" aria-hidden={true} />
        <input
          id={id}
          className="outline-none placeholder:text-text-subtitle"
          name="query"
          placeholder="검색어 입력"
          type="text"
          value={isOpenDetailSearch ? "" : inputValue}
          onChange={handleChangeinputValue}
        />
      </label>
    </form>
  );
};

export default SearchInput;
