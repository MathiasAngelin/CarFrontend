import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CarList from "./pages/CarList"
import CarCreate from "./pages/CarCreate"
import CarEdit from "./pages/CarEdit"
 
function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/"  element={<CarList/>} />
          <Route path="/create"  element={<CarCreate/>} />
          <Route path="/edit/:id"  element={<CarEdit/>} />
      </Routes>
    </Router>
  );
}
 
export default App;