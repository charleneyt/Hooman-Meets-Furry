import React from "react";

export function createTable(renderFunc) {
  return (props) => {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("rank");
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState(props.data || []);

    React.useEffect(() => {
      setRows(props.data || []);
    }, [props.data]);

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      console.log(event, property);
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

    return renderFunc(
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
    );
  };
}
