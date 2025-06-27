import { useState } from 'react'
import Navbar from '../src/components/Navbar'
import Home from '../src/components/Home'
import Footer from '../src/components/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import Blogs from '../src/pages/Blogs'
import About from '../src/pages/About'
import Contact from '../src/pages/Contact'
import Login from '../src/pages/Login'
import Register from './pages/Register'
import Dashboard from '../src/pages/Dashboard'
import CreatorPage from '../src/pages/CreatorPage'
import { useAuth } from './context/AuthProvider'
import { Toaster } from 'react-hot-toast'

function App() {
  const location = useLocation()
  const hideNavbarFooter = ["/dashboard", "/register"].includes(location.pathname)

  const {blogs} = useAuth()
  console.log(blogs)

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creator-page" element={<CreatorPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </div>
  )
}

export default App
