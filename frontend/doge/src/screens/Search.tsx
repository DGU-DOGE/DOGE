import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, _] = useSearchParams();
  return <h1>검색결과 {searchParams.get("keyword")}</h1>;
};

export default Search;
