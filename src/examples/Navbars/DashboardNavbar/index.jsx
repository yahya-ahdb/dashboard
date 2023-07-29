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

import { useState, useEffect, useMemo } from "react";

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

import SoftBox from "../../../components/SoftBox";
import SoftTypography from "../../../components/SoftTypography";
import SoftInput from "../../../components/SoftInput";
import SoftButton from "../../../components/SoftButton";

// Soft UI Dashboard React examples
import Breadcrumbs from "../../Breadcrumbs/index";
import NotificationItem from "../../Items/NotificationItem/index";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "./styles";


// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setDirection,
  setOpenConfigurator,
} from "../../../context";

// Images
import team2 from "../../../assets/images/team-2.jpg";
import logoSpotify from "../../../assets/images/small-logos/logo-spotify.svg";
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import SRYIA from '../../../assets/images/small-icons/syriaFlag.png'
import ENGLAND from '../../../assets/images/small-icons/englandFalg.png'
import { useTranslation } from "react-i18next";
import useHeaders from "../../../hooks/useHeaders";
import { useLogOutMutation } from "../../../redux/RtkSlices/authSlice";
import {toast} from 'react-hot-toast'
import { CircularProgress } from "@mui/material";
import { useCookies } from "react-cookie";
function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const {i18n ,t}= useTranslation()
  const headers = useHeaders()
  const navigate = useNavigate()
  const [cookies,setCookies, removeCookie] = useCookies([
    "token",
    "user",
  ]);
  const [logout , {data ,error ,status ,isLoading }] = useLogOutMutation()


  const handleLogout = ()=>{
    logout({headers})
  }
  useMemo(()=>{
    if(isLoading){
      toast.success(t('loading'),
      {
        style: {
          icon:<CircularProgress size={20}/>,
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
      )
    }
    if(status==='fulfilled'){
        toast.success(t('logOutSucsses') ,
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
        )
        removeCookie('token')
        removeCookie('user')
        navigate('/authentication/sign-in')
    }if(status==='rejected'){
      toast.error(error?.data?.message)
      navigate('/authentication/sign-in')

    }
},[status ,isLoading])
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     anchorReference={null}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "left",
  //     }}
  //     open={Boolean(openMenu)}
  //     onClose={handleCloseMenu}
  //     sx={{ mt: 2 }}
  //   >
  //     <NotificationItem
  //       image={<img src={team2} alt="person" />}
  //       title={["New message", "from Laur"]}
  //       date="13 minutes ago"
  //       onClick={handleCloseMenu}
  //     />
  //     <NotificationItem
  //       image={<img src={logoSpotify} alt="person" />}
  //       title={["New album", "by Travis Scott"]}
  //       date="1 day"
  //       onClick={handleCloseMenu}
  //     />
  //     <NotificationItem
  //       color="secondary"
  //       image={
  //         <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
  //           payment
  //         </Icon>
  //       }
  //       title={["", "Payment successfully completed"]}
  //       date="2 days"
  //       onClick={handleCloseMenu}
  //     />
  //   </Menu>
  // );


  const changeLanguageToArabic =()=>{
    setDirection(dispatch, "rtl");
    i18n.changeLanguage('ar');
    window.location.reload()
    
  }
  const changeLanguageToEnglish =()=>{
    setDirection(dispatch, "ltr");
    i18n.changeLanguage('en');
    window.location.reload()
    
  }



  const renderMenuLanguage = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
    <SoftBox color={light ? "white" : "inherit"}>
      {i18n?.language ==='en' ?
      <NotificationItem
      color="secondary"
      title={[ "Arabic Language"]}
      onClick={changeLanguageToArabic}
      />
      :
      <NotificationItem
      color="secondary"
      title={[ "English Language"]}
      onClick={changeLanguageToEnglish}
      />
      }
    </SoftBox>

    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>

        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon={<HomeIcon/>} title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>

        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* <SoftBox pr={1}>
              <SoftInput
                placeholder="Type here..."
                icon={{ component: <SearchIcon/>, direction: "left" }}
              />
            </SoftBox> */}

            <SoftBox color={light ? "white" : "inherit"}>

              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? <MenuOpenIcon/> : <MenuIcon/>}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleOpenMenu}
              >
                <LanguageIcon/>
              </IconButton>
              {renderMenuLanguage()}

              


              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <SettingsIcon/>
              </IconButton>

              <IconButton sx={navbarIconButton} size="small" onClick={handleLogout} >
                <LogoutIcon/>
                <SoftTypography
                  variant="button"
                  fontWeight="medium"
                  color={light ? "white" : "dark"}
                >
                  {t('logout')}
                </SoftTypography>
              </IconButton>



{/* 
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleOpenMenu}
              >
                <LanguageIcon/>

              </IconButton>
              {renderMenuLanguage()}

              


              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon><SettingsIcon/></Icon>
              </IconButton>

              <IconButton sx={navbarIconButton} size="small" onClick={handleLogout}>
                <Icon
                  sx={({ palette: { dark, white } }) => ({
                    color: light ? white.main : dark.main,
                  })}
                >
                  <LogoutIcon/>
                </Icon>
                <SoftTypography
                  variant="button"
                  fontWeight="medium"
                  color={light ? "white" : "dark"}
                >
                  {t('logout')}
                </SoftTypography>
              </IconButton> */}
              {/* <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon className={light ? "text-white" : "text-dark"}><NotificationsIcon/></Icon>
              </IconButton> */}
              {/* {renderMenu()} */}
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
