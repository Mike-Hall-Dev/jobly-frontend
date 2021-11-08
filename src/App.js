import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Routes from "./Routes";
import CurrUserContext from "./CurrUserContext";
import JoblyApi from "./api";
import jwt from "jsonwebtoken";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  useEffect(() => {
    async function getCurrUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let user = await JoblyApi.getCurrentUser(username);
          setCurrUser(user);
          setApplicationIds(new Set(user.applications))
        } catch (error) {
          setCurrUser(null)
        }
      }
    }
    getCurrUser();
  }, [token]);

  async function signup(formData) {
    try {
      let token = await JoblyApi.signup(formData);
      let tokenForLocal = saveToken(token);
      setToken(tokenForLocal);
      return { success: true }
    } catch (errors) {
      return { success: false, errors: errors }
    }
  }

  async function login(formData) {
    try {
      let token = await JoblyApi.login(formData);
      let tokenForLocal = saveToken(token);
      setToken(tokenForLocal);
      return { success: true }
    } catch (errors) {
      return { success: false, errors: errors }
    }
  }


  function logout() {
    setCurrUser(null);
    setToken(null);
  }

  function saveToken(token) {
    localStorage.setItem("token", token)
    return token;
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.apply(currUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
    console.log("adding new IDs", applicationIds)
  }

  return (
    <div>
      <BrowserRouter>
        <CurrUserContext.Provider
          value={{ currUser, setCurrUser, hasAppliedToJob, applyToJob }}>
          <NavBar logout={logout} />
          <Routes login={login} signup={signup} />
        </CurrUserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
