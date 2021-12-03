import {
  getPetSearch,
  getRecommend,
  getRescues,
  getSearchRescues,
  getTopTen,
  getCompare,
  getSimilar,
  getUserLogin,
} from "../fetcher";
function componentDidMount() {
  getUserLogin().then((res) => {
    console.log(res);
  });
  getSimilar().then((res) => {
    console.log(res);
  });
}
export default function HomePage() {
  return <div>Hello! {componentDidMount()}</div>;
}
