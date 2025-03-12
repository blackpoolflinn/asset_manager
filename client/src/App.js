// client/src/App.js
import React from "react";
import "./App.css";
import DisplayItems from "./routes/DisplayItems";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import useItems from "./hooks/items";

const App = () => {

  const {data, isLoading} = useItems()
  if(isLoading){
    return(
      <h1>Loading</h1> //if session hasn't loaded return isloading 
    )
  }

  return (
    <BrowserRouter basename="/"> {/* base path */}
      <Routes>
          <Route path="*" element={<DisplayItems/>}/> {/* all path where if the user enters unkown URL and they are logged in it redirects back to this page */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;