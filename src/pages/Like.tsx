import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import BookListItemContainer from "../components/book/BookListItemContainer";
import NoData from "../components/NoData";
import { useLikeStorage } from "../hooks/useLikeStorage";
import CountText from "../components/CountText";

interface BooksResponse {
  documents: Document[];
}

function Like() {
  const { likes, toggleLike } = useLikeStorage();
  const queryClient = useQueryClient();

  const data = queryClient.getQueriesData<InfiniteData<BooksResponse>>({
    queryKey: ["books"],
  });

  const filteredBooks = data
    .map((d) =>
      d[1]?.pages
        .flatMap((page) => page.documents)
        .filter((item) => likes.includes(item.title)),
    )
    .filter((v): v is Document[] => Array.isArray(v))
    .flat();

  const itemMap = filteredBooks.map((mapItem, index) => {
    return (
      <BookListItemContainer
        key={mapItem.title + index}
        item={mapItem}
        isLike={true}
        handleClickLike={toggleLike}
      />
    );
  });

  return (
    <section className="w-full">
      <h2 className="typo-title typo-title-2 mb-7">내가 찜한 책</h2>
      <CountText label="찜한 책" count={filteredBooks.length ?? 0} />
      {filteredBooks.length > 0 ? (
        itemMap
      ) : (
        <NoData message="찜한 책이 없습니다." />
      )}
    </section>
  );
}

export default Like;
