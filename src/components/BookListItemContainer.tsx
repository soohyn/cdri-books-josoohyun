import { useState } from "react";
import BookListItemDetail from "./BookListItemDetail";
import BookListItem from "./BookListItem";

interface BookListItemContainerProps {
  item: Document;
  isLike: boolean;
  handleClickLike: (item: string) => void;
}

const BookListItemContainer = ({
  item,
  isLike,
  handleClickLike,
}: BookListItemContainerProps) => {
  const [isDetail, setIsDetail] = useState(false);

  const salePrice =
    item.sale_price === -1 ? null : item.sale_price.toLocaleString();
  const price = item.price.toLocaleString();

  const handleClickDetail = () => {
    setIsDetail((prev) => !prev);
  };

  const handleClickPurchase = () => {
    window.open(item.url);
  };

  if (isDetail) {
    return (
      <BookListItemDetail
        title={item.title}
        author={item.authors.join(", ")}
        price={price}
        salePrice={salePrice}
        contents={item.contents}
        isLike={isLike}
        thumbnail={item.thumbnail}
        onClickLike={handleClickLike}
        handleClickDetail={handleClickDetail}
        handleClickPurchase={handleClickPurchase}
      />
    );
  }

  return (
    <BookListItem
      title={item.title}
      author={item.authors.join(", ")}
      price={salePrice ?? price}
      thumbnail={item.thumbnail}
      handleClickDetail={handleClickDetail}
      handleClickPurchase={handleClickPurchase}
    />
  );
};

export default BookListItemContainer;
