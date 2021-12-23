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
import {Typography} from "@mui/material";
import makeStyles from "@material-ui/core/styles/makeStyles";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Organization Name",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: false,
    label: "City",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Animal Type",
  },
  {
    id: "num",
    numeric: true,
    disablePadding: false,
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
            align={headCell.numeric ? "center" : "left"}
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

const useStyles = makeStyles({
  caption: {
    fontSize: 25,
    fontFamily: "Dongle",
  },
  toolbar: {
    "& > p:nth-of-type(2)": {
      fontSize: 25,
      fontFamily: "Dongle",
    },
  },
  menuItem: {
    fontSize: 25,
    fontFamily: "Dongle",
  },
});

const RescueTable = createTable(
  (
    rows,
    dense,
    order,
    orderBy,
    page,
    rowsPerPage,
    emptyRows,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChangeDense
  ) => {
    const classes = useStyles();
    return (
      <Box sx={{width: "100%"}}>
        <Paper sx={{width: "100%", mb: 2, rounded: true}}>
          <TableContainer>
            <Table
              sx={{minWidth: 850}}
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
                      <TableRow
                        role="checkbox"
                        tabIndex={-1}
                        key={row.organization_id}
                      >
                        <TableCell
                          style={{
                            fontSize: 23,
                            fontFamily: "Dongle",
                            textAlign: "left",
                          }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: 23,
                            fontFamily: "Dongle",
                            textAlign: "left",
                          }}
                        >
                          {row.address ? row.address : "Not available"}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: 23,
                            fontFamily: "Dongle",
                            textAlign: "left",
                          }}
                        >
                          {row.city}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: 23,
                            fontFamily: "Dongle",
                            textAlign: "left",
                          }}
                        >
                          {row.email ? row.email : "Not available"}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: 23,
                            fontFamily: "Dongle",
                            textAlign: "left",
                          }}
                        >
                          {row.type}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: 23,
                            fontFamily: "Dongle",
                            textAlign: "center",
                          }}
                        >
                          {row.num}
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
            SelectProps={{
              style: {
                fontSize: 25,
                fontFamily: "Dongle",
              },
            }}
            classes={{
              selectdLabel: classes.selectdLabel,
              toolbar: classes.toolbar,
              menuItem: classes.menuItem,
            }}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label={
            <Typography sx={{fontSize: 25, fontFamily: "Dongle"}}>
              Dense padding
            </Typography>
          }
        />
      </Box>
    );
  }
);

export default RescueTable;
