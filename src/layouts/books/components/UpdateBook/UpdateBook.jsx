import React, { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout";
import { useUpdateBookMutation } from "../../../../redux/RtkSlices/BookSlice";
import { useGetCategoryQuery } from "../../../../redux/RtkSlices/categorySlice";
import useHeaders from "../../../../hooks/useHeaders";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import { storageUrl } from "../../../../constans/url";

const notify = () =>
  toast.success("Update book", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

const UpdateBook = () => {
  const locatoin = useLocation();
  const headers = useHeaders();
  const [bookData, setBookData] = useState({
    name: locatoin.state.item.name,
    price: locatoin.state.item.price,
    description: locatoin.state.item.description,
    category_id: locatoin.state.item.category_id,
    image: locatoin.state.item.image,
    file: locatoin.state.item.file,
  });
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const { data, isLoading } = useGetCategoryQuery({ headers: headers });
  const [updateBook, { status , isLoading : loadingUpdate }] = useUpdateBookMutation();
  const handleSetData = (event) => {
    const { name, value } = event.target;
    setBookData({ ...bookData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name", bookData.name);
    formdata.append("description", bookData.description);
    formdata.append("price", bookData.price);
    formdata.append("category_id", bookData.category_id);
    if (image === null || image === "") formdata.append("image", bookData.image);
    else formdata.append("image", image?.target?.files[0]);
    if (file === null || file === "") formdata.append("file", bookData.file);
    else formdata.append("file", file?.target?.files[0]);

    updateBook({ headers: headers, id: id, body: formdata });
  };
  useEffect(() => {
    status === "fulfilled" ? notify() : "";
  }, [status]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container className="py-2" maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Update Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="productName" className="form-label">
                Name
              </label>
              <input
                onChange={handleSetData}
                type="text"
                value={bookData.name}
                className="form-control"
                name="name"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                onChange={handleSetData}
                type="number"
                value={bookData.price}
                className="form-control"
                name="price"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              value={bookData.description}
              onChange={handleSetData}
              className="form-control"
              name="description"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="row mb-3">
            <select
              className="form-select form-select-sm mb-3"
              onChange={handleSetData}
              value={bookData.category_id}
              defaultValue="2"
              name="category_id"
              aria-label=".form-select-lg example"
            >
              <option selected style={{ visibility: "hidden" }}>
                Open this select menu
              </option>
              {data?.data.map((item) =>
                isLoading ? (
                  <option>Loading</option>
                ) : (
                  <>
                    <option style={{ background: item.color }} key={item.id} value={item.id}>
                      {item.from_year} - {item.to_year}
                    </option>
                  </>
                )
              )}
            </select>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                onChange={setImage}
                type="file"
                accept="image/*"
                className="form-control"
                name="image"
              />
              {image === null ||
                (image === "" && (
                  <img width={150} className="mt-2" src={storageUrl + bookData.image} />
                ))}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              File
            </label>
            <input
              onChange={setFile}
              type="file"
              className="form-control"
              name="file"
              accept=".pdf"
            />
            <small className="form-text">Allowed files: .pdf</small>
          </div>
          <button disabled={loadingUpdate} type="submit" className="btn btn-primary">
          {loadingUpdate ? (
              <div className="spinner-border text-white" style={{ fontSize : "15px" ,margin :"0 15px"  ,width : "25px" , height : "25px" }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </Container>
    </DashboardLayout>
  );
};

export default UpdateBook;
