import { useState } from 'react'
import {Button, Box, Sidebar} from "@agorouniversity/agoro-ui-components";
import { Header } from '@agorouniversity/agoro-ui-components';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ButtonPage from "./pages/buttons.jsx";

function App() {

  return (
    <>
        <BrowserRouter location="" navigator="">
            <Routes>
                <Route path="/buttons" element={ <ButtonPage />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
