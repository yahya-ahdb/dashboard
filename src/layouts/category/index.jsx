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
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "../../components/SoftBox/index";

// Soft UI Dashboard React examples
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout/index";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar/index";
import Footer from "../../examples/Footer/index";

// Category page components
import ContentCategory from "./components/ContentCategory";
import CreateCategory from "./components/CreateCategory/index";

function Category() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <ContentCategory />
            </Grid>
            <Grid item xs={12} md={5}>
              <CreateCategory />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Category;
