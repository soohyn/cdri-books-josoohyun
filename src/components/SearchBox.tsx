import {
  useId,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  type SubmitEvent,
} from "react";

interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
}

const SearchBox = ({
  searchQuery,
  setSearchQuery,
  onSearch,
}: SearchBoxProps) => {
  const id = useId();

  const handleChangeSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSearch();
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
          type="text"
          value={searchQuery}
          onChange={handleChangeSearchQuery}
        />
        <button type="submit">상세검색</button>
      </form>
    </section>
  );
};

export default SearchBox;
