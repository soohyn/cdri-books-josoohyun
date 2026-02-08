import Fill from "../../assets/fill.svg";
import Like from "../../assets/line.svg";

interface BookListItemDetailProps {
  title: string;
  thumbnail: string;
  contents: string;
  author: string;
  price: string;
  salePrice: string | null;
  isLike: boolean;
  onClickLike: (item: string) => void;
  handleClickDetail: () => void;
  handleClickPurchase: () => void;
}

const BookListItemDetail = ({
  title,
  thumbnail,
  contents,
  author,
  price,
  salePrice,
  isLike,
  onClickLike,
  handleClickDetail,
  handleClickPurchase,
}: BookListItemDetailProps) => {
  return (
    <article>
      <img src={thumbnail} alt={title} aria-hidden={true} />
      <button onClick={() => onClickLike(title)}>
        <img src={isLike ? Fill : Like} />
      </button>
      <h3>{title}</h3>
      <span>{author}</span>
      <p>{contents}</p>
      <button type="button" onClick={handleClickDetail}>
        상세보기
      </button>
      <span>원가 {price}</span>
      {salePrice && <span>할인가 {salePrice}</span>}
      <button type="button" onClick={handleClickPurchase}>
        구매하기
      </button>
    </article>
  );
};

export default BookListItemDetail;
