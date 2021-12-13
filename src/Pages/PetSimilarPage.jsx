import React from "react";
import PetCarousel from "../components/PetSimilarPage/PetCarousel";
import { getSimilar } from "../fetcher";
import PetSimilarCard from "../components/PetSimilarPage/PetSimilarCard";


export default function PetSimilarPage(props) {
  const{username} = props;
  // TODO: set cat dog selector
  const[type, setType] = React.useState("Cat");
  const[data, setData] = React.useState([]);
  React.useEffect(() => {
    getSimilar(username, type, 10, 10).then(resp => resp.json()).then(resp => {
      setData(resp.results);
      console.log(resp.results);
    })
  }, [username, type])
  return (<div><div> Based on what you like ...</div><PetCarousel data={data}/>
  <div></div></div>)
}