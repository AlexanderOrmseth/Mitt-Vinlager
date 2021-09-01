import React, { useEffect } from "react";
// redux
import { loggedIn } from "./actions/auth";
import { useDispatch } from "react-redux";
// router
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// components
import PageHeader from "./components/header/PageHeader";
import Loading from "./components/custom/Loading";

// Lazy loading
import Home from "./components/pages/home/Home";
const AddWine = React.lazy(() => import("./components/pages/add/AddWine"));
const Overview = React.lazy(() =>
  import("./components/pages/overview/Overview")
);
const EditWine = React.lazy(() => import("./components/pages/edit/EditWine"));
const WineView = React.lazy(() => import("./components/pages/view/WineView"));
const WishList = React.lazy(() =>
  import("./components/pages/wishlist/WishList")
);
const Inventory = React.lazy(() =>
  import("./components/pages/inventory/Inventory")
);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loggedIn());
    return () => {};
  }, [dispatch]);
  return (
    <>
      <div className="wrap">
        <Toaster
          toastOptions={{
            error: {
              duration: 6000,
            },
          }}
        />
        <BrowserRouter>
          <PageHeader />
          <div className="page-content">
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route path="/wine/add" exact component={AddWine} />
                <Route path="/wine/edit/:id" exact component={EditWine} />
                <Route path="/wine/:id" exact component={WineView} />
                <Route path="/overview/" exact component={Overview} />
                <Route path="/wishlist/" exact component={WishList} />
                <Route path="/home" exact component={Home} />
                <Route path="/" component={Inventory} />
              </Switch>
            </React.Suspense>
          </div>
        </BrowserRouter>
      </div>
      <footer id="footer">
        <p>Mitt Vinlager © 2021</p>
        <p>Utviklet av Alexander Ormseth</p>
      </footer>
    </>
  );
};

export default App;
