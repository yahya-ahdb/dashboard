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

import { useContext, useEffect, useRef } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SoftBox from "../../../components/SoftBox";

// Soft UI Dashboard React context
import { useSoftUIController, setLayout } from "../../../context";
import { PaginationContext } from "../../../context/PaginationContext";

function DashboardLayout({ children }) {
  const [controller, dispatch] = useSoftUIController();
  const {pagination ,setPagination} = useContext(PaginationContext)

  const scrollableElementRef = useRef()
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);



  function handleScroll() { 
    const element = scrollableElementRef.current;
    if (Math.floor(element.scrollTop + element.clientHeight) >  element.scrollHeight -20) {
        setPagination((prevPage)=>prevPage + 1)
    } 
  }

  return (
    <div
      ref={scrollableElementRef}
      onScroll={handleScroll}
      style={{height:'100vh' ,overflowY:'auto'}}
    >
    <SoftBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </SoftBox>
    </div>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
