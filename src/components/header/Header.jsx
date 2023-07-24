import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./Headerstyle.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/logo-flixStreet.png";

const Header = () => {
  // used for creating scrolling effect:
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  // in moblie view for showing header:
  const [mobileMenu, setMobileMenu] = useState(false);
  // for taking input:
  const [query, setQuery] = useState("");
  // the search bar is displayed using the below state:
  const [showSearch, setShowSearch] = useState("");
  // to navigate our application:
  const navigate = useNavigate();
  const location = useLocation();

  // when ever the page is changed our scroll wil be remained in
  //  the same location so to chnage the scroll we use location
  //  hook so that when a page is changed we have to scroll to the top i.e (0,0)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    console.log(currentScrollY);

    if (currentScrollY > 200) {
      if (currentScrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else if (type === "tv") {
      navigate("/explore/tv");
    } else {
      navigate("/");
    }
  };
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show} `}>
      <ContentWrapper>
        <div className="logo">
          <img
            onClick={() => {
              navigationHandler("home");
            }}
            src={logo}
            alt=""
            style={{ width: "220px", height: "50px", borderRadius: "9px" }}
          />
        </div>
        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("movie");
              setMobileMenu(false);
            }}
          >
            Movies
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("tv");
              setMobileMenu(false);
            }}
          >
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => {
                setMobileMenu(false);
              }}
            />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for movie or tv show...."
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <VscChromeClose
                onClick={() => {
                  setShowSearch(false);
                }}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
