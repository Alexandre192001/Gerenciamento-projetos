import React from 'react'
import { Link } from 'react-router-dom'
import Style from './NavBar.module.css'
import Logo from '../imgs/logo.png'

function NavBar() {
  return (
    <>
      <nav className={Style.NavBarContainer}>
        <div className={Style.Container_Nav}>
          <img src={Logo} alt="Img-NavBar"/>
        </div>
        <div className={Style.Container_Nav}>
          <Link className={Style.LinksNav} to="/">Home</Link>
          <Link className={Style.LinksNav} to="/ProjectsAll">Projetos</Link>
          <Link className={Style.LinksNav} to="/Contato">Contato</Link>
          <Link className={Style.LinksNav} to="/Empresa">Empresa</Link>
          
        </div>
      </nav>
    </>
  )
}

export default NavBar