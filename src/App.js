
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Router from "./components/Router/Router";
import React, {useContext} from "react";
import {Context} from "./index";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./components/Loader/Loader";

function App() {

  const {auth} = useContext(Context)
  const [user, loading , error] = useAuthState(auth)

  if(loading) {
    return (<Loader />)
  }

  return (
      <BrowserRouter>
         <Router />
      </BrowserRouter>
  );
}

export default App;
