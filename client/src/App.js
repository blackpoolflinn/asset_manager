// client/src/App.js
import React from "react";
import "./App.css";
import DisplayItems from "./routes/DisplayItems";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import useUsers from "./hooks/useUsers";
import Login from "./routes/Login";
import Register from "./routes/Register";

const App = () => {

  const {data, isLoading} = useUsers()
  if(isLoading){
    return(
      <h1>isLoading</h1> //if session hasn't loaded return isloading 
    )
  }

  return (
    <BrowserRouter basename="/"> {/* base path */}
      <Routes>
      {data.isAuthenticated ? ( 
          <> {/* Routes for users that are logged in */}
            <Route path="*" element={<DisplayItems/>}/> {/* If user enters unkown URL redirected to this page */}
          </>
        ): 
          <> {/* Routes for user that isn't logged in */}
            <Route path="*" element={<Login />}/> {/* If user enters unknown URL redirects to this page */}
            <Route path="register" element={<Register />}/>
            <Route path="login" element={<Login />}/>
          </>}
      </Routes>
    </BrowserRouter>
  )
}

export default App;