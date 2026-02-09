import Button from "../Button";
import ArrowDown from "../../assets/icon_arrow_down.svg";

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
    <article className="flex items-center py-6 gap-8">
      <img
        src={thumbnail}
        className="w-12 object-cover ml-8"
        alt={title}
        aria-hidden={true}
      />
      <div
        role="group"
        className="flex flex-1 items-center gap-3 overflow-x-hidden"
      >
        <h3 className="typo-title typo-title-3 overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </h3>
        <span
          aria-label="작가"
          className="typo-body typo-body-2 text-text-secondary text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {author}
        </span>
      </div>
      <span aria-label="가격" className="typo-title typo-title-3">
        {price}원
      </span>
      <div role="group" className="flex gap-2 mr-4">
        <Button label="구매하기" onClick={handleClickPurchase} />
        <Button
          label="상세보기"
          variant="tertiary"
          right={
            <img src={ArrowDown} alt="" aria-hidden={true} className="w-4" />
          }
          onClick={handleClickDetail}
        />
      </div>
    </article>
  );
};

export default BookListItem;
