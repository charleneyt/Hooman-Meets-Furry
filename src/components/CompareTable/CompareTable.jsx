// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 25,
    fontFamily: "Dongle"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 25,
    fontFamily: "Dongle"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CompareTable(props) {
  const{data} = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableBody>
        <TableRow>
        <TableCell id="pet-photo" variant="head"></TableCell> 
          {data.map((dataRow) => (
            <>
            <StyledTableCell><img src={dataRow.photo} alt={dataRow.name} height="200"/></StyledTableCell>
            </>
          ))}
        </TableRow>
        <StyledTableRow>
        <StyledTableCell variant="head">Pet name</StyledTableCell>
        {data.map((dataRow) => (
            <>
            <StyledTableCell>{dataRow.name}</StyledTableCell>
            </>
          ))}
        </StyledTableRow>
        <StyledTableRow>
        <StyledTableCell variant="head">Pet type</StyledTableCell>
        {data.map((dataRow) => (
            <>
            <StyledTableCell>{dataRow.type}</StyledTableCell>
            </>
          ))}
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell variant="head">Pet breed</StyledTableCell>
          {data.map((dataRow) => (
            <>
            <StyledTableCell>{dataRow.breed}</StyledTableCell>
            </>
          ))}
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell variant="head">Pet color</StyledTableCell>
          {data.map((dataRow) => (
            <>
            <StyledTableCell>{dataRow.color}</StyledTableCell>
            </>
          ))}
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell variant="head">Pet age</StyledTableCell>
          {data.map((dataRow) => (
            <>
            <StyledTableCell>{dataRow.age}</StyledTableCell>
            </>
          ))}
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell variant="head">Pet gender</StyledTableCell>
          {data.map((dataRow) => (
            <>
            <StyledTableCell>{dataRow.gender}</StyledTableCell>
            </>
          ))}
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell variant="head">Pet location</StyledTableCell>
          {data.map((dataRow) => (
            <>
            <StyledTableCell>{dataRow.location}</StyledTableCell>
            </>
          ))}
        </StyledTableRow>
      </TableBody>
      </Table>
    </TableContainer>
  );
}
