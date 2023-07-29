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
import { useGetOffersQuery } from "../../../../redux/RtkSlices/offerSlice";
import useHeaders from "../../../../hooks/useHeaders";
import { Skeleton } from "@mui/material";

function ContentOffer() {
  const headers = useHeaders();
  const { data, isLoading } = useGetOffersQuery({ headers: headers });




  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Offer
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
              <>
            <Bill
              key={item.id}
              id={item.id}
              book_id={item.book_id}
              from_date={item.from_date}
              to_date={item.to_date}
              new_price={item.new_price}
              old_price={item.old_price}
            />
            <hr width="100%"  />
              </>
          ))}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default ContentOffer;
