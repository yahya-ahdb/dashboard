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

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "../../../../components/SoftBox/index";
import SoftTypography from "../../../../components/SoftTypography/index";
import { useEffect, useState } from "react";
import { useCreateCategoryMutation } from "../../../../redux/RtkSlices/categorySlice";
import useHeaders from "../../../../hooks/useHeaders";
import { toast } from "react-toastify";

const notify = () =>
  toast.success("Create category", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });


function CreateCategory() {
  const headers = useHeaders()
  const [ data , setData ] = useState()
  const [ image , setImage ] = useState()
  const [ createCategory , {status , isLoading} ] = useCreateCategoryMutation()

  const handleSetImage = (e)=>{
    setImage(e.target.files[0])
  }
  const handleSetData = (e)=>{
    setData({...data , [e.target.name] : e.target.value })
  }
  
  const handleUploadData = (e)=>{
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("from_year", data.from_year);
    formdata.append("to_year", data.to_year);
    formdata.append("color", data.color);
    formdata.append("image", image);
    createCategory({ headers: headers ,  body : formdata })
  }
  useEffect(() => {
    if(status === "fulfilled"){
      notify() 
    } 
  }, [status]);
  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Create Category
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={3} pb={2} px={2}>
        <div className="mb-3">
          <label className="form-label">
            From year
          </label>
          <input type="number" name="from_year" onChange={handleSetData} className="form-control" id="" />
        </div>
        <div className="mb-3">
          <label className="form-label">
            To year
          </label>
          <input name="to_year" type="number" onChange={handleSetData} className="form-control" id="" />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Image
          </label>
          <input accept="image/*" name="image" onChange={handleSetImage} type="file" className="form-control" id="" />
        </div>
        <div className="mb-3">
          <label className="form-label">
            Color
          </label>
          <input
            type="color"
            onChange={handleSetData}
            name="color"
            className="form-control form-control-color"
            title="Choose your color"
          />
        </div>
        <div className="mb-3">
          <button disabled={isLoading} onClick={handleUploadData} className="btn btn-outline-primary">
          {isLoading ? (
              <div className="spinner-border text-dark" style={{ fontSize : "15px" ,margin :"0 15px"  ,width : "25px" , height : "25px" }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </SoftBox>
    </Card>
  );
}

export default CreateCategory;
