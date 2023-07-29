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

// Soft UI Dashboard React components
import SoftBox from "../../components/SoftBox/index";

// Soft UI Dashboard React examples
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout/index";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar/index";
import Footer from "../../examples/Footer/index";

// Category page components
import ContentOffer from "./components/ContentOffer";

function Offer() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox my={3}>
              <ContentOffer />
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Offer;
