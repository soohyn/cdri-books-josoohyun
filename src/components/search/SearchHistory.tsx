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
    <ul className="ml-4">
      {searchHistory.reverse().map((item, index) => {
        return (
          <li key={item + index} className="flex items-center justify-between px-6 py-1">
            <span
              onClick={() => handleClickHistory(item)}
              className="text-text-subtitle"
            >
              {item}
            </span>
            <button
              type="button"
              aria-label="delete history button"
              className="text-text-primary"
              onClick={() => {
                deleteSearchHistory(item);
              }}
            >
              <img src={Close} alt="" className="w-6 h-6" aria-hidden={true} />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchHistory;
