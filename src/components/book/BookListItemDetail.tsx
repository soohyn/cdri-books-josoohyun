import Fill from "../../assets/fill.svg";
import Like from "../../assets/line.svg";
import ArrowUp from "../../assets/icon_arrow_up.svg";
import Button from "../Button";

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
    <article className="flex gap-6 py-4 not-last:border-b border-b-palette-gray ">
      <div role="figure" className="flex shirink-0 relative ml-4">
        <img
          src={thumbnail}
          className="h-70 object-cover"
          alt={title}
          aria-hidden={true}
        />
        <button
          onClick={() => onClickLike(title)}
          className="absolute top-1 right-1"
        >
          <img src={isLike ? Fill : Like} />
        </button>
      </div>
      <div role="group" className="flex flex-1 flex-col gap-2 mt-3">
        <div role="rowgroup" className="flex items-center gap-3 flex-wrap">
          <h3 className="typo-title typo-title-3">{title}</h3>
          <span className="typo-caption text-text-subtitle">{author}</span>
        </div>
        <span className="typo-body typo-body-2 typo-bold">책 소개</span>
        <p className="typo-small">{contents}</p>
      </div>
      <div role="group" className="flex flex-col items-end gap-3 mr-3">
        <Button
          label="상세보기"
          variant="tertiary"
          className="mb-auto"
          right={
            <img src={ArrowUp} alt="" aria-hidden={true} className="w-4" />
          }
          onClick={handleClickDetail}
        />
        <span className="typo-small text-text-subtitle">
          원가
          <strong
            className={`ml-1 typo-title-3 text-text-primary ${salePrice ? "line-through font-light" : "typo-title"}`}
          >
            {price}
          </strong>
        </span>
        {salePrice && (
          <span className="typo-small text-text-subtitle">
            할인가{" "}
            <strong className="ml-1 typo-title typo-title-3 text-text-primary">
              {salePrice}
            </strong>
          </span>
        )}
        <Button
          label="구매하기"
          onClick={handleClickPurchase}
          className="w-60 mt-3 shadow-lg shadow-[#979797]/20"
        />
      </div>
    </article>
  );
};

export default BookListItemDetail;
