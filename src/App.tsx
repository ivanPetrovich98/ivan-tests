import React, { Routes, Route } from "react-router-dom";
import PagePsVictorNewsItem from "./pages/Page__PsVictorNewsItem";
//import PagePsVictorTechItem from './pages/Page__PsVictorTechItem';

import NavBar from "./pages/NavBar";
import { GenericProvider } from "./providers/GenericProvider";
import HomePage from "./pages/Home";
import { ChangePicture } from "./pages/ChangePicture";
import {UploadFile} from "./pages/UploadFile/UploadFile"

function App() {
  return (
    <>
      <GenericProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/singleNewsItem" element={<PagePsVictorNewsItem />} />
          <Route path="/singleTechItem" element={<ChangePicture />} />
          <Route path="/uploadFile" element={<UploadFile />} />
        </Routes>
      </GenericProvider>
    </>
  );
}

export default App;
