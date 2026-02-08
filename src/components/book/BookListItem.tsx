import Button from "../Button";

interface BookListItemProps {
  title: string;
  author: string;
  price: string;
  thumbnail: string;
  handleClickDetail: () => void;
  handleClickPurchase: () => void;
}

const BookListItem = ({
  title,
  author,
  price,
  thumbnail,
  handleClickDetail,
  handleClickPurchase,
}: BookListItemProps) => {
  return (
    <article>
      <img src={thumbnail} alt={title} aria-hidden={true} />
      <h3>{title}</h3>
      <span aria-label="작가">{author}</span>
      <span>{price}원</span>
      <Button label="구매하기" onClick={handleClickPurchase} />
      <Button label="상세보기" onClick={handleClickDetail} />
    </article>
  );
};

export default BookListItem;
