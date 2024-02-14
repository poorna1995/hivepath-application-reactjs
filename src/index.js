import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { persistor, store } from "./store/createStore";
import { PersistGate } from "redux-persist/integration/react";
import { render } from "react-snapshot";
import { CookiesProvider } from "react-cookie";
import history from "utils/history";

render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <PersistGate persistor={persistor}>
              <Router history={history}>
                <CssBaseline />
                <App />
              </Router>
            </PersistGate>
          </ThemeProvider>
        </StyledEngineProvider>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
