import {useLocation} from "react-router";
import {useQuery} from "react-query";
import {getSearchTV, IGetContentsResult} from "../api";

const API_KEY = "8b0c5f0400aa76e404ea70c8b1e0ce22";
const BASE_PATH = "https://api.themoviedb.org/3";

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    console.log(keyword);
   const data = useQuery(['searchResults', keyword], async () => {
       const data = await fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`)
           .then(response => response.json())
       return data;
   })
    console.log(data)
    return null;

}

export default Search;