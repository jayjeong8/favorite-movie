import {useLocation} from "react-router";

function Search() {
/*    let [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    setSearchParams(location.search);
    let keyword = searchParams.get("keyword");*/

    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    console.log(keyword);
    return null;
}

export default Search;