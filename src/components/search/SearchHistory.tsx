import Close from "../../assets/Icon_close.svg";

interface SearchHistoryProps {
  searchHistory: string[];
  deleteSearchHistory: (deleteItem: string) => void;
  handleClickHistory: (history: string) => void;
}

const SearchHistory = ({
  searchHistory,
  deleteSearchHistory,
  handleClickHistory,
}: SearchHistoryProps) => {
  return (
    <ul
      className="absolute bg-palette-lightgray rounded-b-3xl pl-12 pb-2 w-120"
    >
      {searchHistory.length > 0? searchHistory.map((item, index) => {
        return (
          <li
            key={item + index}
            className="flex items-center justify-between pr-6 py-1 w-full"
          >
            <span
              onMouseDown={() => handleClickHistory(item)}
              className="text-text-subtitle w-full overflow-hidden  text-ellipsis"
            >
              {item}
            </span>
            <button
              type="button"
              aria-label="delete history button"
              className="text-text-primary"
              onMouseDown={(e) => {
                e.preventDefault()
                deleteSearchHistory(item)
              }}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <img src={Close} alt="" className="w-6 h-6" aria-hidden={true} />
            </button>
          </li>
        );
      }): <span className="text-text-subtitle">검색 기록이 없습니다.</span>}
    </ul>
  );
};

export default SearchHistory;
