import React from "react";
import { getSimilar } from "../fetcher";
import PetSimilarCard from "../components/PetSimilarPage/PetSimilarCard";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};



export default function PetSimilarPage(props) {

  const{username} = props;
  // TODO: set cat dog selector
  const[type, setType] = React.useState("Cat");
  const[data, setData] = React.useState([]);
  // Pagination
  const[page, setPage] = React.useState(1);
  const[pageSize, setPageSize] = React.useState(10);

  React.useEffect(() => {
    getSimilar(username, type, page, pageSize).then(resp => resp.json()).then(resp => {
      setData(resp.results);
    })
  }, [username, type, page, pageSize])
  return (
  <div>
    {/* TODO: do we need to show dots? draggable? */}
    <Carousel 
        responsive={responsive}
        centerMode={true}
        draggable={true}
      >
      
      {data.map(dataRow => 
      <div>
        <PetSimilarCard dataRow={dataRow}/>
        </div>
      )}
    </Carousel>;
  </div>
    )
}