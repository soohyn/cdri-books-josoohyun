interface SearchCountTextProps {
  count: number;
}

const SearchCountText = ({ count }: SearchCountTextProps) => {
  return (
    <section className="flex flex-row gap-4">
      <span className="typo-caption">도서 검색 결과</span>
      <span>
        총 <strong className="typo-caption font-medium text-palette-primary">{count}</strong>건
      </span>
    </section>
  );
};

export default SearchCountText;
