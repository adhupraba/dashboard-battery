import { FC, useEffect, useState } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { baseUrl, restApi } from "src/utils";
import { days, toastOptions } from "src/constants";
import { useAlertCtx, useAuthCtx } from "src/context";
import { toast } from "react-toastify";

interface ITableDataProps {}

export const TableData: FC<ITableDataProps> = () => {
  const { alerts, setAlerts } = useAlertCtx();
  const { token } = useAuthCtx();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchAlertData = async () => {
      try {
        const res = await restApi({
          url: `${baseUrl}/api/alerts`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setAlerts(res.alerts);
      } catch (err: any) {
        console.log("fetchAlertData =>", err[0].message);
        if (err.length) {
          console.log("if check");
          toast.error(err[0].message, toastOptions);
        } else {
          console.log("else check");
          toast.error(err.message, toastOptions);
        }
      }
    };

    fetchAlertData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const removeAlert = async (idx: number, alertId: number) => {
    try {
      await restApi({
        url: `${baseUrl}/api/alert`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: alertId }),
      });
      setAlerts((prevState) => {
        const prev = [...prevState];
        prev.splice(idx, 1);
        return prev;
      });
    } catch (err: any) {
      console.error("Alert Table =>", err);
      if (err.length) {
        toast.error(err[0].message, toastOptions);
      } else {
        toast.error(err.message, toastOptions);
      }
    }
  };

  return (
    <div className="container">
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price Signal</TableCell>
              <TableCell>Criteria</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Active Days</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
              <TableRow
                key={idx}
                hover
                sx={{
                  "& td, & th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "#0d114820 !important",
                  },
                  "&:hover th, &:hover td": {
                    color: "#0d1148 !important",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.priceSignal}</TableCell>
                <TableCell>{row.criteria === "gt" ? "Greater Than" : "Less Than"}</TableCell>
                <TableCell>{row.criteriaValue}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  {row.dayType === "everyday"
                    ? days.join(", ")
                    : days.filter((day) => row.dayType.toLowerCase().includes(day.toLowerCase()))}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => removeAlert(page * rowsPerPage + idx, row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={alerts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
