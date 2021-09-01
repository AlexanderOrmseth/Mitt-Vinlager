import { useState, useRef } from "react";
import { signOut } from "../../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import GoogleButton from "./GoogleButton";
import { LogOut, Home, Menu } from "react-feather";
import Links from "./Links";
import useOutsideClick from "../hooks/useOutsideClick";

const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [burgerOpen, setBurgerOpen] = useState(false);

  const handleSignOut = async () => {
    await dispatch(signOut());
    dispatch({ type: "SET_WINE_LIST", payload: null });
    dispatch({ type: "SET_WISH_LIST", payload: null });
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => {
    setBurgerOpen(false);
  });

  return (
    <nav className="main-nav">
      <div className="main-nav-left">
        <Link className="title-link" to="/">
          <h1>Mitt Vinlager</h1>
        </Link>
        <div className="main-nav-left-links">
          <NavLink
            activeClassName="active-main-link"
            className="main-link nav-link"
            to="/home"
          >
            <Home size={18} />
            Hjem
          </NavLink>
          {user?.email && user.done && <Links />}
        </div>
      </div>
      <div className="main-nav-right">
        {user?.email && user.done && (
          <>
            <NavLink className="nav-link" to="/" onClick={handleSignOut}>
              <LogOut size={18} />
              Logg ut
            </NavLink>
            <div
              ref={wrapperRef}
              onClick={() => setBurgerOpen(!burgerOpen)}
              className={`${burgerOpen ? "burger-open" : ""} burger`}
            >
              <Menu size={24} />
              {burgerOpen && (
                <div className="burger-content">
                  <NavLink
                    activeClassName="active-main-link"
                    className="main-link nav-link"
                    to="/home"
                  >
                    <Home size={18} />
                    Hjem
                  </NavLink>
                  <Links />
                  {user?.email && user.done && (
                    <NavLink
                      className="nav-link"
                      to="/"
                      onClick={handleSignOut}
                    >
                      <LogOut size={18} />
                      Logg ut
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        {!user.email && user.done && <GoogleButton />}
      </div>
    </nav>
  );
};

export default Nav;
