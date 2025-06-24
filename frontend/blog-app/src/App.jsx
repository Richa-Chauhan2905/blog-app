import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import Home from '../src/components/Home'
import Footer from '../src/components/Footer'
import Blogs from '../src/pages/Blogs'
import About from '../src/pages/About'
import Contact from '../src/pages/Contact'
import Dashboard from '../src/pages/Dashboard'
import Login from '../src/pages/Login'
import Signup from '../src/pages/Signup'
import { Route, Routes, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  const hideNavbarFooter = ["/dashboard", "/login", "/signup"].includes(location.pathname)
  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </div>
  )
}

export default App
