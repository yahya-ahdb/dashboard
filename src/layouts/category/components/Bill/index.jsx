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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "../../../../components/SoftBox/index";
import SoftTypography from "../../../../components/SoftTypography/index";
import SoftButton from "../../../../components/SoftButton/index";
import { storageUrl } from "../../../../constans/url";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import useHeaders from "../../../../hooks/useHeaders";
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../../redux/RtkSlices/categorySlice";
import { useEffect, useState } from "react";

function Bill({ id, from_year, to_year, color, image }) {
  const headers = useHeaders();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [imgaeUpdate, setImageUpdate] = useState([]);
  const [deleteCategory, { status, isLoading }] = useDeleteCategoryMutation();
  const [updateCategory, { status: statusUpdate, isLoading: loadingUpdate }] =
    useUpdateCategoryMutation();
  const [data, setData] = useState({
    id: id,
    from_year: from_year,
    to_year: to_year,
    color: color,
    image: image,
  });
  const handleSetData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSetImage = (e) => {
    setImageUpdate(e.target.files[0]);
  };

  const handleDeleteBook = () => {
    deleteCategory({ headers: headers, id: id });
  };

  const handleUpdateCategory = (e)=>{
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("from_year", data.from_year);
    formdata.append("to_year", data.to_year);
    formdata.append("color", data.color);
    if(imgaeUpdate.length !== 0)
    formdata.append("image" , imgaeUpdate)
    updateCategory({ headers: headers , id : id ,  body : formdata })
  }

  const DialogCategory = () => {
    return (
      <>
        <div className="container">
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="lg"
            bgColor={color}
          >
            <DialogContent dividers>
              <img width={150} src={storageUrl + image} />
              <div>
                <small>From : {from_year}</small>
                <br />
                <small>To : {to_year}</small>
              </div>
            </DialogContent>
            <DialogActions>
              <Button style={{ color: "red" }} onClick={handleDeleteBook}>
                {isLoading ? (
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
  
  const DialogEditCategory = () => {
    return (
      <Dialog
        open={openEdit}
        fullWidth
        // onClose={() => setOpenEdit(false)}
        // aria-labelledby="scroll-dialog-title"
        // aria-describedby="scroll-dialog-description"
        // maxWidth="lg"
        // sx={{backgroundColor:color}}
        // bgColor={color}
      >
        <DialogContent>
          <div className="mb-3">
            <label className="form-label">From year</label>
            <input
              onChange={handleSetData}
              // value={data.from_year}
              defaultValue={data.from_year}
              name="from_year"
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">To year</label>
            <input
              onChange={handleSetData}
              // value={data.to_year}
              defaultValue={data.to_year}
              name="to_year"
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Color</label>
            <input
              onChange={handleSetData}
              // value={data.color}
              defaultValue={data.color}
              name="color"
              type="color"
              className="form-control form-control-color"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              onChange={handleSetImage}
              name="from_year"
              type="file"
              accept="image/*"
              className="form-control"
            />
            {imgaeUpdate.length === 0 && <img width={100} height={100} style={{objectFit :"contain" , marginTop : "5px"}} src={storageUrl + data.image} />}
          </div>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "red" }} onClick={(e)=>handleUpdateCategory(e)}>
            {loadingUpdate ? (
              <div
                className="spinner-border text-danger"
                style={{ fontSize: "15px", margin: "0 15px", width: "25px", height: "25px" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Update"
            )}
          </Button>
          <Button
            onClick={() => setOpenEdit(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  useEffect(()=>{
    if(status === "fulfilled"){
      setOpen(false) 
    } 
  },[status])
  useEffect(()=>{
    if(statusUpdate === "fulfilled"){
      setOpenEdit(false) 
    } 
  },[statusUpdate])
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={color}
      borderRadius="lg"
      p={3}
      mt={2}
    >
      <SoftBox width="100%" display="flex" flexDirection="column">
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
            <img
              src={storageUrl + image}
              width={100}
              height={100}
              style={{ objectFit: "contain" }}
            />
          </SoftTypography>

          <SoftBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <SoftBox mr={1}>
              <SoftButton onClick={() => setOpen(true)} variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </SoftButton>
            </SoftBox>
            <SoftButton onClick={() => setOpenEdit(true)} variant="text" color="dark">
              <Icon>edit</Icon>&nbsp;edit
            </SoftButton>
          </SoftBox>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            From year:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {from_year}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            To year:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {to_year}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        {open && <DialogCategory />}
        {openEdit && DialogEditCategory()}
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
