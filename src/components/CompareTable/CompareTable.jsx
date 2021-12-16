import React from "react";
import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AllPetInfoPage from "../../Pages/AllPetInfoPage";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F0B0BC",
    color: theme.palette.common.white,
    fontSize: 25,
    fontFamily: "Dongle",
    textAlign: "center",
    borderColor: "#FFF7F6",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 25,
    fontFamily: "Dongle",
    textAlign: "center",
    borderColor: "#EBEBEB",
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFE6F2",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CompareTable(props) {
  const {data} = props;
  const [openModal, setOpenModal] = React.useState(false);
  const [petId, setPetId] = React.useState("");
  const handleClose = () => {
    setOpenModal(false);
  };
  const onButtonClick = (event) => {
    setPetId(event.currentTarget.value);
    setOpenModal(true);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 700}} aria-label="customized table">
        <TableBody>
          <TableRow>
            <TableCell key="pet-photo" variant="head"></TableCell>
            {data.map((dataRow) => (
              <>
                <StyledTableCell key={dataRow.photo}>
                  <img src={dataRow.photo} alt={dataRow.name} height="200" />
                </StyledTableCell>
              </>
            ))}
          </TableRow>
          <StyledTableRow>
            <StyledTableCell variant="head">Pet name</StyledTableCell>
            {data.map((dataRow) => (
              <StyledTableCell key={dataRow.name}>
                {dataRow.name}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell variant="head">Pet type</StyledTableCell>
            {data.map((dataRow) => (
              <StyledTableCell key={dataRow.type}>
                {dataRow.type}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell variant="head">Pet breed</StyledTableCell>
            {data.map((dataRow) => (
              <StyledTableCell key={dataRow.breed}>
                {dataRow.breed}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell variant="head">Pet color</StyledTableCell>
            {data.map((dataRow) => (
              <StyledTableCell>{dataRow.color}</StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell variant="head">Pet age</StyledTableCell>
            {data.map((dataRow) => (
              <StyledTableCell key={dataRow.age}>{dataRow.age}</StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell variant="head">Pet gender</StyledTableCell>
            {data.map((dataRow, index) => (
              <StyledTableCell key={index}>{dataRow.gender}</StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell variant="head">Pet location</StyledTableCell>
            {data.map((dataRow) => (
              <StyledTableCell key={dataRow.location}>
                {dataRow.location}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <TableRow>
            <TableCell id="adobt-now"></TableCell>
            {data.map((dataRow) => (
              <StyledTableCell>
                {
                  <Button
                    key={dataRow.pet_id}
                    variant="contained"
                    onClick={onButtonClick}
                    value={dataRow.pet_id}
                    style={{backgroundColor: "#86CBED"}}
                  >
                    Adopt now
                  </Button>
                }
              </StyledTableCell>
            ))}
            <AllPetInfoPage
              openModal={openModal}
              handleClose={handleClose}
              petId={petId}
            />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
