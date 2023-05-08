import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dropdown from 'react-dropdown';
import './styles.css';
import { AuthenticationContext } from "../../contexts/AuthenticationContext";

const styles = {
  title: {
    flexGrow: 1,
    fontSize: "1.2em"
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const context = useContext(AuthenticationContext);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [headerMessage, setHeaderMessage] = React.useState("");
  const [authStatusLoaded, setAuthStatusLoaded] = React.useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  React.useEffect(() => {
    setTimeout(async () => getAuthStatus(), 1);
  });

  const getAuthStatus = async () => {
    setLoggedIn(context.isAuthenticated);
    setAuthStatusLoaded(true);
    if (context.isAuthenticated) {
      setHeaderMessage(`welcome ${context.email} to TMDB Client`);
    } else {
      setHeaderMessage("Login to access the TMDB Client");
    }
  }

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorite movies", path: "/movies/favourites" },
    { label: "Upcoming movies", path: "/upcoming" },
    { label: "Recommended movies", path: "/movies/recommended" },
    { label: "Create fantasy movie", path: "/fantasy/create" },
    { label: "List fantasy movies", path: "/fantasy" },
    { label: "Tv series", path: "/tv" },
    { label: "Favorite tv series", path: "/tv/favourites" },
    { label: "Recommended tv series", path: "/tv/recommended" },
    { label: "Popular actors", path: "/actors" },
    { label: "Favorite actors", path: "/actors/favourites" },
    { label: "Search actors", path: "/actors/search" },
    { label: "Advanced search", path: "/search" },
    { label: "Logout", path: "logout" },
  ];

  const handleMenuSelect = (pageURL) => {
    if (pageURL === "logout") {
      handleLogout();
    } else {
      setAnchorEl(null);
      navigate(pageURL);
    }
  };

  const handleLogout = async (e) => {
    try {
      setAnchorEl(null);
      setHeaderMessage("Login to access the TMDB Client");
      await context.signout();
    } catch (error) {
      console.log(error);
    }
    navigate("/login");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // due to not being unable to send exactly what I want from the dropdown
  // the navigate option needed to be hacked away like so
  const _onSelect = (option) => {
    wideMenuDropdownOptions.forEach(element => {
      element.items.forEach(e => {
        if (e.label === option.label) {
          navigate(e.path);
          return;
        }
      });
    });
  }

  const wideMenuDropdownOptions = [
    {
      id: 1, label: "Movies", items: [
        { label: "Discover movies", path: "/" },
        { label: "Favorite movies", path: "/movies/favourites" },
        { label: "Upcoming movies", path: "/upcoming" },
        { label: "Recommended movies", path: "/movies/recommended" },
      ]
    },
    {
      id: 2, label: "Fantasy movies", items: [
        { label: "Create fantasy movie", path: "/fantasy/create" },
        { label: "List fantasy movies", path: "/fantasy" },
      ]
    },
    {
      id: 3, label: "Tv series", items: [
        { label: "Discover tv series", path: "/tv" },
        { label: "Favorite tv series", path: "/tv/favourites" },
        { label: "Recommended tv series", path: "/tv/recommended" },
      ]
    },
    {
      id: 4, label: "Actors", items: [
        { label: "Popular actors", path: "/actors" },
        { label: "Favorite actors", path: "/actors/favourites" },
        { label: "Search actors", path: "/actors/search" },
      ]
    },
  ];

  const wideMenuOptions = [
    { label: "Advanced search", path: "/search" },
    { label: "Logout", path: "logout" },
  ]

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h5" sx={styles.title}>
            {headerMessage}
          </Typography>
          {authStatusLoaded ?
            (
              <>
                {loggedIn ? (
                  isMobile ? (
                    <>
                      <IconButton
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        size="large"
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                      >
                        {menuOptions.map((opt) => (
                          <MenuItem
                            key={opt.label}
                            onClick={() => handleMenuSelect(opt.path)}
                          >
                            {opt.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  ) : (
                    <>
                      {wideMenuDropdownOptions.map((opt, index) => (
                        <>
                          <div style={{ pointerEvents: "none" }}>
                            <Button key={index} color="inherit">{opt.label}</Button>
                          </div>
                          <Dropdown key={opt.id} options={opt.items} onChange={_onSelect} value={wideMenuDropdownOptions[index].label} placeholder={wideMenuDropdownOptions[index].label} />
                        </>
                      ))}
                      {wideMenuOptions.map((opt) => (
                        <Button
                          key={opt.label}
                          color="inherit"
                          onClick={() => handleMenuSelect(opt.path)}
                        >
                          {opt.label}
                        </Button>
                      ))}
                    </>
                  )
                ) : (
                  <>
                    <Button
                      key="login"
                      color="inherit"
                      onClick={() => handleMenuSelect("/login")}
                    >
                      Sign in
                    </Button>
                  </>
                )}
              </>
            ) : (
              <></>
            )
          }
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
