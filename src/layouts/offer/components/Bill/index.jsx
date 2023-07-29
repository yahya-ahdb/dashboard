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
import { Button, Dialog, DialogActions, DialogContent, Skeleton } from "@mui/material";
import useHeaders from "../../../../hooks/useHeaders";
import {
  useDeleteOfferMutation,
  useUpdateOfferMutation,
} from "../../../../redux/RtkSlices/offerSlice";
import { useGetBookMutation } from "../../../../redux/RtkSlices/BookSlice";
import { useEffect, useState } from "react";

function Bill({ id, book_id, from_date, to_date, new_price, old_price }) {
  const headers = useHeaders();
  const [open, setOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState({
    from_date: from_date,
    to_date: to_date,
    new_price: new_price,
    book_id: book_id,
  });
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteOffer, { status, isLoading: loadingOffer }] = useDeleteOfferMutation();
  const [updateOffer, { status: statusUpdate, isLoading: loadingUpdate }] =
    useUpdateOfferMutation();
  const [getBook, { data, isLoading }] = useGetBookMutation();

  const handleDeleteBook = () => {
    deleteOffer({ headers: headers, id: id });
  };
  const handleSetData = (e) => {
    setDataEdit({ ...dataEdit, [e.target.name]: e.target.value });
  };
  const handleUpdateOffer = () => {
    updateOffer({ headers: headers, id: id, body: dataEdit });
  };
  const DialogDeleteOffer = () => {
    return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="lg"
      >
        <DialogContent dividers>
          <img width={150} src={storageUrl + data?.data.image} />
          <div>
            <small>Name : {data?.data.name}</small>
            <br />
            <small>From : {from_date}</small>
            <br />
            <small>To : {to_date}</small>
          </div>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "red" }} onClick={handleDeleteBook}>
            {loadingOffer ? (
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
    );
  };
  const DialogEditOffer = () => {
    return (
      <Dialog open={openEdit} fullWidth>
        <DialogContent>
          <div className="mb-3">
            <label className="form-label">From date</label>
            <input
              onChange={handleSetData}
              value={dataEdit.from_date}
              name="from_date"
              type="datetime-local"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">To date</label>
            <input
              onChange={handleSetData}
              value={dataEdit.to_date}
              name="to_date"
              type="datetime-local"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New price</label>
            <input
              onChange={handleSetData}
              value={dataEdit.new_price}
              name="new_price"
              type="number"
              className="form-control"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "red" }} onClick={handleUpdateOffer}>
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
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  };
  useEffect(() => {
    getBook({ headers: headers, id: book_id });
  }, []);
  useEffect(() => {
    if (status === "fulfilled") setOpen(false);
  }, [status]);

  useEffect(() => {
    if (statusUpdate === "fulfilled") setOpenEdit(false);
  }, [statusUpdate]);
  return (
    <SoftBox
      component="li"
      sx={{ background: "#f7f7f7" }}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
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
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
              <img
                src={storageUrl + data?.data.image}
                width={100}
                height={100}
                style={{ objectFit: "contain" }}
              />
            </SoftTypography>
          )}
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
          <SoftBox mb={1} lineHeight={0}>
            {isLoading ? (
              <Skeleton className="w-50 mt-3" variant="rectangular" width={210} height={20} />
            ) : (
              <SoftTypography variant="caption" color="text">
                Name:&nbsp;&nbsp;&nbsp;
                <SoftTypography variant="caption" fontWeight="medium">
                  {data?.data.name}
                </SoftTypography>
              </SoftTypography>
            )}
          </SoftBox>
          <SoftTypography variant="caption" color="text">
            From date:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {from_date}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            To date:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {to_date}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Old price:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {old_price}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            New price:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {new_price}
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      {open && DialogDeleteOffer()}
      {openEdit && DialogEditOffer()}
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
