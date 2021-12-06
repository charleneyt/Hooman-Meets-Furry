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
import {createTable} from "../utils/table";
import {getComparator, stableSort} from "../utils/comparators";

function createData(name, address, city, email, type, num) {
  return {
    name,
    address,
    city,
    email,
    type,
    num,
  };
}

const rows = [
  createData(
    "Rescue 1",
    "123 First Ave",
    "New York",
    "abc1@gmail.com",
    "Cat",
    "20",
  ),
  createData(
    "Rescue 2",
    "123 2nd Ave",
    "New York",
    "abc2@gmail.com",
    "Cat",
    "5",
  ),
  createData(
    "Rescue 3",
    "123 3rd Ave",
    "New York",
    "abc3@gmail.com",
    "Dog",
    "10",
  ),
  createData(
    "Rescue 4",
    "123 4th Ave",
    "New York",
    "abc4@gmail.com",
    "Cat",
    "15",
  ),
  createData(
    "Rescue 5",
    "123 5th Ave",
    "New York",
    "abc5@gmail.com",
    "Dog",
    "6",
  ),
  createData(
    "Rescue 6",
    "123 6th Ave",
    "New York",
    "abc6@gmail.com",
    "Cat",
    "20",
  ),
  createData(
    "Rescue 7",
    "123 7th Ave",
    "New York",
    "abc7@gmail.com",
    "Cat",
    "9",
  ),
  createData(
    "Rescue 8",
    "123 8th Ave",
    "New York",
    "abc8@gmail.com",
    "Dog",
    "20",
  ),
];

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Organization Name",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: true,
    label: "Address",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: true,
    label: "Location",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "Animal Type",
  },
  {
    id: "num",
    numeric: true,
    disablePadding: true,
    label: "Number",
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

const RescueTable = createTable(
  (
    dense,
    order,
    orderBy,
    page,
    rowsPerPage,
    emptyRows,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeDense,
  ) => (
    <Box sx={{width: "100%"}}>
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
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={row.name}>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">{row.city}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{row.num}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
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
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  ),
);

export default RescueTable;
