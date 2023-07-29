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
// Soft UI Dashboard React components
import SoftBox from "../../../../components/SoftBox/index";
import SoftTypography from "../../../../components/SoftTypography/index";

// Billing page components
import Bill from "../Bill";
import { useGetCategoryQuery } from "../../../../redux/RtkSlices/categorySlice";
import useHeaders from "../../../../hooks/useHeaders";
import { Skeleton } from "@mui/material";

function ContentCategory() {
  const headers = useHeaders();
  const { data, isLoading } = useGetCategoryQuery({ headers: headers });
  console.log(data);

  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Category
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {
            isLoading ?
              <>
              <SoftBox>
              <Skeleton variant="circular" width={80} height={80} />
              <Skeleton className="w-50 mt-3" variant="rectangular" width={210} height={20} />
              <Skeleton className="w-75 mt-3" variant="rectangular" width={210} height={20} />
            </SoftBox>
              <SoftBox className="mt-5">
              <Skeleton variant="circular" width={80} height={80} />
              <Skeleton className="w-50 mt-3" variant="rectangular" width={210} height={20} />
              <Skeleton className="w-75 mt-3" variant="rectangular" width={210} height={20} />
            </SoftBox>
              <SoftBox className="mt-5">
              <Skeleton variant="circular" width={80} height={80} />
              <Skeleton className="w-50 mt-3" variant="rectangular" width={210} height={20} />
              <Skeleton className="w-75 mt-3" variant="rectangular" width={210} height={20} />
            </SoftBox>
              </>
            :
            data?.data.map((item) => (
            <Bill
              key={item.id}
              id={item.id}
              from_year={item.from_year}
              to_year={item.to_year}
              color={item.color}
              image={item.image}
            />
          ))}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default ContentCategory;
