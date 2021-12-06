import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import {styled} from "@mui/material/styles";

import PetRating from "./PetRating";
import {getComparator, stableSort} from "../utils/comparators";
import {createTable} from "../utils/table";

function createData(rank, pic, name, rate) {
  return {
    rank,
    pic,
    name,
    rate,
  };
}

const rows = [
  createData(1, "https://placekitten.com/g/200/200", "Cupcake", 1),
  createData(2, "https://placekitten.com/g/200/200", "Donut", 2),
  createData(3, "https://placekitten.com/g/200/200", "Eclair", 5),
  createData(4, "https://placekitten.com/g/200/200", "Frozen yoghurt", 5),
  createData(5, "https://placekitten.com/g/200/200", "Gingerbread", 2.5),
  createData(6, "https://placekitten.com/g/200/200", "Honeycomb", 4.4),
  createData(7, "https://placekitten.com/g/200/200", "Ice cream sandwich", 2),
  createData(8, "https://placekitten.com/g/200/200", "Jelly Bean", 3.3),
  createData(9, "https://placekitten.com/g/200/200", "KitKat", 5.5),
  createData(10, "https://placekitten.com/g/200/200", "Lollipop", 6.5),
];

const headCells = [
  {
    id: "rank",
    numeric: true,
    disablePadding: true,
    label: "Ranking",
  },
  {
    id: "pic",
    numeric: false,
    disablePadding: false,
    label: "Breed Pictures",
  },
  {
    id: "breed_name",
    numeric: false,
    disablePadding: false,
    label: "Breed(Name)",
  },
  {
    id: "rate",
    numeric: true,
    disablePadding: false,
    label: "Rating",
  },
];

function EnhancedTableHead(props) {
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const ImageTableCell = styled(TableCell)` 
  padding-left: 16px;
`;

const BreedRaterTable = createTable((rows, dense, order, orderBy, page, rowsPerPage, emptyRows, handleRequestSort, handleChangePage, handleChangeRowsPerPage, handleChangeDense) => {
  console.log(rows)
    return <Box sx={{width: "100%"}}>
    <Paper sx={{width: "100%", mb: 2, rounded: true}}>
      <TableContainer>
        <Table
          sx={{minWidth: 750}}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            rowCount={rows.length}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow role="checkbox" tabIndex={-1} key={row.name}>
                    <TableCell>{row.rank}</TableCell>
                    <ImageTableCell id={labelId} scope="row" padding="none">
                      {/* TODO: Make a placeholder if row.pic not exist */}
                      <img src={row.pic} alt={row.breed_name} height="200"/>
                    </ImageTableCell>
                    <TableCell align="center">{row.breed_name}</TableCell>
                    <TableCell align="center">
                      {row.rate}
                      <PetRating value={row.rate}/>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6}/>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    <FormControlLabel
      control={<Switch checked={dense} onChange={handleChangeDense}/>}
      label="Dense padding"
    />
  </Box>
});
export default BreedRaterTable;