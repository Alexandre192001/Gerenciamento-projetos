import React from 'react'
import style from './Home.module.css'
import Logo from '../imgs/logo.png'
import LinkButton from '../layout/LinkButton'

const Home = () => {
  return (
    <>
      <section className={style.container_home}>
        <h1 className={style.title_home}>Bem-vindo ao <span>Cors</span></h1>
        <p className={style.description_home}>Comece a gerencia os seus projetos agora mesmo</p>
        <LinkButton to="/NovoProjeto" text="Criar projeto"/>
        <img src={Logo} alt="ImgLogo home"></img>
      </section>
    </>
  )
}

export default Home