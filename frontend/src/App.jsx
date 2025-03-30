import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page404 from './components/Page404';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import DemoPage from './pages/DemoPage';
const App = () => {

  return (  
    <Router>
      <Routes>
        <Route path='/' element={ <UserPage /> } />
        <Route path="/demo" element={ <DemoPage/> } />
        <Route path="/admin/*" element={ <AdminPage/> } />
        <Route path='*' element={ <Page404/> } />
      </Routes>
    </Router>
  )
}

export default App