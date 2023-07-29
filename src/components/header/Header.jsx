import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";


import "./style.scss";
import ContentWrapper from "../content-wrapper/ContentWrapper";

import logo from "../../assets/movix-logo.svg";
function Header() {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const navigatehandler = (type) => {
    if (type == "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }

    setMobileMenu(false);
  };
  const controNavbar = () => {
    if (window.scrollY > 200) {
      // this make when u scroll back the header display again
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }

    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controNavbar);
    return () => {
      window.removeEventListener("scroll", controNavbar);
    };
  }, [lastScrollY]);
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div>
          <img src={logo} alt="" onClick={()=>navigate("/")}></img>
        </div>

        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigatehandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigatehandler("tv")}>
            Tv shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch}></HiOutlineSearch>
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch}></HiOutlineSearch>
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => setMobileMenu(false)}
            ></VscChromeClose>
          ) : (
            <SlMenu onClick={openMobileMenu}></SlMenu>
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for  a movie or Tv show..."
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              ></input>

              <VscChromeClose
                onClick={() => setShowSearch(false)}
              ></VscChromeClose>
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
}

export default Header;
