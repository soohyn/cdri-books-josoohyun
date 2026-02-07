type Status = string | "정상판매";

type Sort = "accuracy" | "latest";

type Target = "title" | "isbn" | "pulisher" | "person";

interface Meta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

interface Document {
  authors: string[];
  contents: string;
  datetime: Date;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: Status;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
}

interface ResponseData {
  meta: Meta;
  documents: Document[];
}
