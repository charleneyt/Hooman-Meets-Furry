import React from "react";
import PropTypes from "prop-types";
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

import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";

function createData (name, address, city, email, type, num) {
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
  createData("Rescue 1", "123 First Ave", "New York", "abc1@gmail.com", "Cat", "20"),
  createData("Rescue 2", "123 2nd Ave", "New York", "abc2@gmail.com", "Cat", "5"),
  createData("Rescue 3", "123 3rd Ave", "New York", "abc3@gmail.com", "Dog", "10"),
  createData("Rescue 4", "123 4th Ave", "New York", "abc4@gmail.com", "Cat", "15"),
  createData("Rescue 5", "123 5th Ave", "New York", "abc5@gmail.com", "Dog", "6"),
  createData("Rescue 6", "123 6th Ave", "New York", "abc6@gmail.com", "Cat", "20"),
  createData("Rescue 7", "123 7th Ave", "New York", "abc7@gmail.com", "Cat", "9"),
  createData("Rescue 8", "123 8th Ave", "New York", "abc8@gmail.com", "Dog", "20"),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
      id: "organization name",
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
    const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
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
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

const ImageTableCell = styled(TableCell)`
padding-left: 16px;
`;

export default function RescueTable() {

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("rank");
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, rounded: true }}>
            <TableContainer>
            <Table
                sx={{ minWidth: 750 }}
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
                    .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    console.log(row);

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
    );
}
