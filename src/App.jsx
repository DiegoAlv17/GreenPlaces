import { useState } from 'react'
import NavBar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx' 
import Footer from './components/Footer.jsx'
import About from './components/About.jsx'
import Education from './components/Education.jsx'
import Events from './components/Events.jsx'
import Areas from './components/Areas.jsx'
import Tips from './components/Tips.jsx'
import Modal from './components/Modal.jsx'


function App() {

  return (
    <div className='min-h-screen bg-white' >
      <NavBar />
      <main>
        <Hero />
        <About />
        <Education />
        <Events />
        <Modal />
        <Areas />
        <Tips />
      </main>
      <Footer/>
    </div>
      
    
  )
}

export default App
