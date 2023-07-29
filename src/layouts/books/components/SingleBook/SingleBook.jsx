
// Soft UI Dashboard React examples
import DashboardLayout from "../../../../examples/LayoutContainers/DashboardLayout/index";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar/index";
import Footer from "../../../../examples/Footer/index";
import { useLocation } from "react-router-dom";
import { storageUrl } from "../../../../constans/url";

function SingleBook() {
    const location = useLocation()
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <section className="container py-5" style={{ minHeight : "80vh" }} >
      <div className="container my-5">
    <div className="row">
      <div className="col-lg-4 mt-1 text-center">
        <img style={{minWidth : "200px" ,maxWidth : "100%", minHeight : "250px" }} src={storageUrl + location.state.item.image} alt="..." className="img-fluid" />
      </div>
      <div className="col-lg-8 mt-2 p-3" style={{ background : "#fff", boxShadow : "0px 0px 15px #ccc" ,  borderRadius : "15px" }}>
        <h1 className="mb-4 pt-4">{location.state.item.name}</h1>
        <h3 className="mb-4">{location.state.item.price}</h3>
        <small className="mb-4">{location.state.item.category_id}</small>
        <h6 className="py-2">
        { location.state.item.description }
        </h6>
        <a href={storageUrl + location.state.item.file} target="_blanck" className="btn btn-primary">PDF</a>
      </div>
    </div>
  </div>
      </section>
      <Footer />
    </DashboardLayout>
  );
}

export default SingleBook;
