import { useQueryClient } from "@tanstack/react-query";
import BookListItemContainer from "../components/book/BookListItemContainer";
import NoData from "../components/NoData";
import { useLikeStorage } from "../hooks/useLikeStorage";

interface BooksResponse {
  documents: Document[];
}

function Like() {
  const { likes, toggleLike } = useLikeStorage();
  const queryClient = useQueryClient();

  const data = queryClient.getQueriesData<BooksResponse>({
    queryKey: ["books"],
  });

  const filteredBooks = data
    .map((d) => d[1]?.documents.filter((item) => likes.includes(item.title)))
    .flat() as Document[];

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
    <main>
      <section>
        <h2 className="sr-only">Like</h2>
        {likes.length > 0 ? itemMap : <NoData message="찜한 책이 없습니다." />}
      </section>
    </main>
  );
}

export default Like;
