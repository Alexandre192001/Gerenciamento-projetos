import React from 'react'
import FooterModule from './Footer.module.css'
import {FaGithubAlt,FaIdBadge,FaLinkedin} from 'react-icons/fa'


function Footer() {
  return (
    <footer className={FooterModule.container_footer}>

        <h1 className={FooterModule.title_footer}>Cors</h1>

        <div className={FooterModule.list_media_sociais}>

        <div className={FooterModule.description_icons}>
          <FaGithubAlt/>
          <h2 className={FooterModule.Title_icons}>Github</h2>
        </div>

        <div className={FooterModule.description_icons}>
          <FaIdBadge/>
          <h2 className={FooterModule.Title_icons}>Portfólio</h2>
        </div>

        <div className={FooterModule.description_icons}>
          <FaLinkedin/>
          <h2 className={FooterModule.Title_icons}>Linkedin</h2>
        </div>
         
        </div>
    </footer>
  )
}

export default Footer