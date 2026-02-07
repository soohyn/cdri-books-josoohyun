import IconBook from "../assets/icon_book.png";

interface NodataProps {
  message?: string;
}

const NoData = ({ message = "" }: NodataProps) => {
  return (
    <section>
      <img src={IconBook} alt="" />
      <p>{message}</p>
    </section>
  );
};

export default NoData;
