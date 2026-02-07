const KAKAO_REQUEST_URL = "https://dapi.kakao.com/v3/search/book";

interface RequestBooksParams {
  query: string;
  sort?: Sort;
  page?: number;
  size?: number;
  target?: Target;
}

export const requestBooks = async (
  params: RequestBooksParams,
): Promise<ResponseData> => {
  const urlParams = new URLSearchParams(Object.entries(params)).toString();
  const requestUrl = `${KAKAO_REQUEST_URL}?${urlParams}`;
  const headers = {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  };

  const response = await fetch(requestUrl, { headers });

  return response.json();
};
