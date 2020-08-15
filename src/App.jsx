import React from "react";
import { Switch, Route, Redirect, useHistory, } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import PanelUsers from "./task/PanelUser"
import "./App.css";
import Loading from "./Components/cargando";
import { useState, useEffect } from "react";


export default function App() {

  const [isLogged, setLogged] = useState(false);

  const [loading, SetLoading] = useState(true)

  const Carga = () => {
    if (loading === true) {
      return (
        <Route exact path="/" >
          <Loading />
        </Route>
      )
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login",
            search: "",
            state: {}
          }}
        />
      )
    }
  };

  useEffect(() => {
    setTimeout(() => {
      SetLoading(false)
    }, 2500);
  }, []);


  return (
    <div className="App">
      <Switch>
        <Route path="/Register">
          <Register />
        </Route>
        <Route exact path="/">
          <Carga loading={loading} />
        </Route>
        <Route exact path="/login">
          <Login setLogged={setLogged} />
        </Route>
        <Route path="/PanelUser">
          <PanelUsers isLogged={isLogged} />
        </Route>
      </Switch>
    </div>
  );
}