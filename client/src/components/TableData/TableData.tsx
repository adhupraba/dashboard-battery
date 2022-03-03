import { FC, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface ITableDataProps {}

export const TableData: FC<ITableDataProps> = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createData = (name: string, calories: number, fat: number, carbs: number, protein: number) => {
    return { name, calories, fat, carbs, protein };
  };

  const rows = [
    createData("a", 159, 6.0, 24, 4.0),
    createData("b", 237, 9.0, 37, 4.3),
    createData("c", 262, 16.0, 24, 6.0),
    createData("d", 305, 3.7, 67, 4.3),
    createData("e", 356, 16.0, 49, 3.9),
    createData("f", 159, 6.0, 24, 4.0),
    createData("g", 237, 9.0, 37, 4.3),
    createData("h", 262, 16.0, 24, 6.0),
    createData("i", 305, 3.7, 67, 4.3),
    createData("j", 356, 16.0, 49, 3.9),
    createData("k", 159, 6.0, 24, 4.0),
    createData("l", 237, 9.0, 37, 4.3),
    createData("m", 262, 16.0, 24, 6.0),
    createData("n", 305, 3.7, 67, 4.3),
    createData("o", 356, 16.0, 49, 3.9),
    createData("p", 159, 6.0, 24, 4.0),
  ];

  return (
    <div className="container">
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row.name}
                hover
                sx={{
                  "& td, & th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "#0d114820 !important",
                  },
                  "&:hover th, &:hover td": {
                    color: "#0d1148 !important",
                    fontWeight: 800,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
