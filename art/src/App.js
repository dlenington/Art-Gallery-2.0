import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Art from "./components/art";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import { createMuiTheme } from "@material-ui/core/styles";

//Pages
import home from "./pages/home";
import signup from "./pages/signup";
import login from "./pages/login";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#448aff"
    },
    secondary: {
      main: "#ff1744"
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <NavBar />
            <main className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
              </Switch>
            </main>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
