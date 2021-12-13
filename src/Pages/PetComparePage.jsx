import React from "react";
import CompareTable from "../components/CompareTable/CompareTable";
import Box from "@mui/material/Box";
import { getCompare } from "../fetcher";

export default function PetCompare(props) {
  const{username} = props;
  const[data, setData] = React.useState([]);

  React.useEffect(() => {
    getCompare(username).then(resp => resp.json()).then(resp => {
      setData(resp.results)
    })
  }, [username]);

  return <div>PetCompare!
    <Box maxWidth={800}><CompareTable data={data}/></Box>
  </div>;
}
