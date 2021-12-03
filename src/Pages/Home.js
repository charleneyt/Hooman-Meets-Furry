import {
  getPetSearch,
  getRecommend,
  getRescues,
  getSearchRescues,
  getTopTen,
  getCompare,
  getSimilar,
  getUserLogin,
} from "../fetcher"
import React from "react"

function componentDidMount() {
  // getUserLogin().then((res) => {
  //   console.log(res);
  // });
  // getSimilar().then((res) => {
  //   console.log(res);
  // });
  getPetSearch({ gender: "female" }, 10, 100)
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log(e)
    })
}

export default function HomePage() {
  React.useEffect(() => {
    componentDidMount()
  }, [])
  return <div>Hello!</div>
}
