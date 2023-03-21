import React, { useState } from "react";
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
import { useAuth } from "../../contexts/AuthProvider";
import Dropdown from 'react-dropdown';
import './styles.css';

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorite movies", path: "/movies/favourites" },
    { label: "Upcoming movies", path: "/upcoming" },
    { label: "Tv series", path: "/tv" },
    { label: "Favorite tv series", path: "/tv/favourites" },
    { label: "Advanced search", path: "/search" },
    { label: "Popular actors", path: "/actors" },
    { label: "Favorite actors", path: "/actors/favourites" },
    { label: "Logout", path: "logout" },
  ];

  const handleMenuSelect = (pageURL) => {
    if (pageURL === "logout") {
      handleLogout();
    } else {
      navigate(pageURL);
    }
  };

  // auth
  const { auth, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
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
      ]
    },
    {
      id: 2, label: "Tv series", items: [
        { label: "Discover tv series", path: "/tv" },
        { label: "Favorite tv series", path: "/tv/favourites" },
      ]
    },
    {
      id: 3, label: "Actors", items: [
        { label: "Popular actors", path: "/actors" },
        { label: "Favorite actors", path: "/actors/favourites" },
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
          <Typography variant="h4" sx={styles.title}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            All you ever wanted to know about Movies!
          </Typography>
          {isMobile ? (
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
                  <Button key={index} color="inherit">{opt.label}</Button>
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
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
