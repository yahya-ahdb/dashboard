/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "../../components/SoftBox/index";
import SoftTypography from "../../components/SoftTypography/index";

// Soft UI Dashboard React examples
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout/index";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar/index";

// header Token
import useHeaders from "../../hooks/useHeaders";

// Data
import { useGetUserQuery, useGetUserBookMutation } from "../../redux/RtkSlices/userSlice";
import { FadeLoader, ScaleLoader } from "react-spinners";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { storageUrl } from "../../constans/url";

function Users() {
  const headers = useHeaders();
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetUserQuery({ headers: headers });
  const [getUserBook, { data: booksData, isLoading: loadingBooks }] = useGetUserBookMutation();
  const books = booksData ? booksData?.data?.book : [];

  console.log(books);

  const DialogBooks = () => {
    return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        {loadingBooks ? (
          <div className="p-5">
            <FadeLoader color="#1400ff" />
          </div>
        ) : (
          <>
            <DialogContent dividers>
              <div className="row">
                {books.length == 0 && <h1 className="text-center p-5">Empty</h1>}

                {books.map((item) => (
                  <div key={item.id} className="col-12 col-md-4 p-2 mt-2">
                    {console.log(item)}
                    <div className="card" style={{ maxWidth: "14rem" }}>
                      <img
                        src={storageUrl + item.image}
                        style={{ height: "150px", objectFit: "contain" }}
                        className="card-img-top"
                        alt="..."
                      />
                      <div style={{ textAlign: "left" }} className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description.substring(0, 30)} ...</p>
                        <a
                          href={storageUrl + item.file}
                          target="_blank"
                          className="btn btn-primary"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </>
        )}
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };
  const columns = [
    { name: "id", align: "center" },
    { name: "name", align: "left" },
    { name: "email", align: "left" },
    { name: "action", align: "center" },
  ];

  const handleShowBook = (e) => {
    e.preventDefault();
    getUserBook({ headers: headers, id: e.target.value });
    setOpen(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">User table</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              {isLoading ? (
                <div className="text-center pt-4">
                  <ScaleLoader color="#000" />
                </div>
              ) : (
                <>
                  <TableContainer>
                    <Table>
                      {columns.map((col, i) => (
                        <TableCell
                          style={{
                            color: "rgb(139 139 139)",
                            textAlign: col.align,
                            fontWeight: "bold",
                          }}
                          key={i}
                        >
                          {col.name}
                        </TableCell>
                      ))}
                      <TableBody>
                        {!open ? "" : <DialogBooks />}
                        {data?.data.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell style={{ textAlign: "center" }}>{row.id}</TableCell>
                            <TableCell style={{ textAlign: "left" }}>{row.name}</TableCell>
                            <TableCell style={{ textAlign: "left" }}>{row.email}</TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              <Button
                                value={row.id}
                                variant="contained"
                                color="primary"
                                onClick={(e) => handleShowBook(e)}
                              >
                                Action
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Users;
