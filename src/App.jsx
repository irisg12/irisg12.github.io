import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from 'react'
import './App.css'

import About from "./About"
import Error from "./Error"
import Guestbook from "./Guestbook"
import PicGarden from "./PicGarden"
import Projects from "./Projects"
import ProjectsFun from "./ProjectsFun"
import { InventoryProvider } from "./InventoryContext"; 

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <InventoryProvider>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/404" element={<Error />} />
          <Route path="/guest-garden" element={<Guestbook />} />
          <Route path="/pic-garden" element={<PicGarden />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects-fun" element={<ProjectsFun />} />
          <Route path="/*" element= {<About /> /* TODO: change to launch pg*/} /> 
        </Routes>
      </InventoryProvider>
    </BrowserRouter>
  )
}

export default App
