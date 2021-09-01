import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

// css
import "./css/index.css";
import "./css/App.css";

// axios defaults
import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : process.env.NODE_ENV === "production" &&
      "https://www.mittvinlager.no/api";
axios.defaults.withCredentials = true;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
