import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/movieflix_logo.svg'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from'../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'

const Navbar = ({ setActiveCategory }) => {
  const navRef= useRef();
  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      if(window.scrollY >=80){
        navRef.current.classList.add('nav-dark')
      }else{
        navRef.current.classList.remove('nav-dark')
      }
    })
  },[])

  const handleNavClick = (category) => {
    if (setActiveCategory) {
      setActiveCategory(category);
      const section = document.getElementById(`category-${category}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt='MovieFlix'/>
        <ul>
          <li onClick={() => handleNavClick('now_playing')}>Home</li>
          <li onClick={() => handleNavClick('top_rated')}>Movies</li>
          <li onClick={() => handleNavClick('popular')}>Popular</li>
          <li onClick={() => handleNavClick('upcoming')}>New & Popular</li>
          <li onClick={() => handleNavClick('now_playing')}>My List</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon}alt='' className='icons'/>
        <p>Children</p>
        <img src={bell_icon} alt='' className='icons'/>
        <div className="navbar-profile">
          <img src={profile_img} alt='' className='profile'/>
          <img src={caret_icon} alt='dropdown' className='dropdown-icon'/>
          <div className="dropdown">
            <p onClick={() => { logout() }}>Sign Out of MovieFlix</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
