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

// Soft UI Dashboard React examples
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout/index";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar/index";
import Footer from "../../examples/Footer/index";

// card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useDeleteBookMutation, useGetAllBooksQuery } from "../../redux/RtkSlices/BookSlice";
import useHeaders from "../../hooks/useHeaders";
import { storageUrl } from "../../constans/url";
import { useNavigate } from "react-router-dom";

// Icon
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import { toast } from "react-toastify";
import { useCreateOfferMutation } from "../../redux/RtkSlices/offerSlice";

const notify = () =>
  toast.error("Delete book", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

const notifyOffer = () =>
  toast.success("Create offer book", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
function Books() {
  const headers = useHeaders();
  const [checkId, setCheckId] = useState();
  const [open, setOpen] = useState(false);
  const [openOffer, setOpenOffer] = useState(false);
  const [dataOffer, setDataOffer] = useState();
  let navigate = useNavigate();
  const { data, isLoading } = useGetAllBooksQuery({ headers: headers });
  const [deleteBook, { status, isLoading: loadingDelete }] = useDeleteBookMutation();
  const [ createOffer , { isLoading : loadingOffer , status : statusOffer } ] = useCreateOfferMutation()

  
  const handleDeleteBook = () => {
    deleteBook({ headers: headers, id: checkId.id });
  };
  const handleSetDataOffer = (e)=>{
    setDataOffer({...dataOffer , [e.target.name] : e.target.value })
  }
  const handleUploadOffer = ()=>{
    createOffer({ headers : headers , body : { ...dataOffer , book_id : checkId.id , old_price : checkId.price } })
  }


  useEffect(() => {
    if (status === "fulfilled") {
      notify();
      setOpen(false);
    }
  }, [status]);
  useEffect(() => {
    if (statusOffer === "fulfilled") {
      notifyOffer();
      setOpenOffer(false);
    }
  }, [statusOffer]);

  const DialogBooks = () => {
    return (
      <>
        <div className="container">
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="lg"
          >
            <DialogContent dividers>
              <img width={150} src={storageUrl + checkId.image} />
              <h5 className="pt-2">{checkId.name}</h5>
            </DialogContent>
            <DialogActions>
              <Button style={{ color: "red" }} onClick={handleDeleteBook}>
                {loadingDelete ? (
                  <div
                    className="spinner-border text-danger"
                    style={{ fontSize: "15px", margin: "0 15px", width: "25px", height: "25px" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Delete"
                )}
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  setCheckId("");
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  };
  const DialogOfferBook = () => {
    return (
          <Dialog
            open={openOffer}
            onClose={() => setOpenOffer(false)}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
          >
          <h4 className="p-2 pt-3">Offer to {checkId.name}</h4>
            <DialogContent dividers>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Form date
                </label>
                <input onChange={handleSetDataOffer} required name="from_date" type="datetime-local" className="form-control" />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  To date
                </label>
                <input onChange={handleSetDataOffer} required name="to_date" type="datetime-local" className="form-control" />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  New price
                </label>
                <input onChange={handleSetDataOffer} required name="new_price" type="number" className="form-control" />
              </div>
            </DialogContent>
            <DialogActions>
              <Button disabled={loadingOffer}  onClick={handleUploadOffer}>{
                loadingOffer ? 
                <div className="spinner-border text-primary" style={{ fontSize : "15px" ,margin :"0 15px"  ,width : "25px" , height : "25px" }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
                :
                "Create offer"}</Button>
              <Button onClick={()=> setOpenOffer(false)} style={{ color: "red" }}>Cancel</Button>
            </DialogActions>
          </Dialog>
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <section className="container my-2 py-5">
        <div className="container">
          <Button
            className="my-3"
            variant="contained"
            onClick={() => navigate("/books/create")}
            color="secondary"
            endIcon={<AddIcon />}
            style={{ color: "#fff" }}
          >
            Create
          </Button>
        </div>
        <div className="row justify-content-between ">
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minWidth: "100%", minHeight: "75vh" }}
            >
              <SpinnerLoader />
            </div>
          ) : (
            data?.data?.map((item) => (
              <Card
                className="col-12 col-md-4 mx-1 mt-3"
                key={item.id}
                style={{ maxWidth: "300px", padding: "0" }}
              >
                <CardActionArea onClick={() => navigate("/books/" + item.id, { state: { item } })}>
                  <img
                    style={{ objectFit: "contain", width: "100%" }}
                    height="200"
                    src={storageUrl + item.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography className="pt-1 fw-bold" gutterBottom variant="h5" component="h3">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description.substring(0, 25)}...
                    </Typography>
                    <Typography className="pt-1" variant="body2" color="text.secondary">
                      {item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="outlined"
                    style={{ color: "#0058ffbf" }}
                    size="small"
                    color="primary"
                    onClick={() => {setCheckId(item); setOpenOffer(true)}}
                  >
                    Offer
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ color: "#0058ffbf" }}
                    size="small"
                    onClick={() => navigate("/books/update/" + item.id, { state: { item } })}
                    color="primary"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      setCheckId(item);
                      setOpen(true);
                    }}
                    variant="outlined"
                    style={{ color: "red" }}
                    size="small"
                    color="error"
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))
          )}
        </div>
        {open && DialogBooks()}
        {openOffer && DialogOfferBook()}
      </section>
      <Footer />
    </DashboardLayout>
  );
}

export default Books;
