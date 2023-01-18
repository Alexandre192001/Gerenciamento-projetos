import {useNavigate} from 'react-router-dom'
import React from 'react'
import ProjectForm from '../projects/ProjectForm'
import style from './Cadastro.module.css'

function NovoProjeto() {


  const navigate = useNavigate()
  
  function createPost(project){
    //initialize cost and service
    project.cost = 0
    project.services = []

    fetch("http://localhost:5000/projects",{
      method:"POST",
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(project),
    }).then((resp) => resp.json()
    .then((data)=>{
      console.log(data)
      // REDIRECT
      navigate('/ProjectsAll', {message:"Projeto criado com sucesso"})
    })
    ).catch((err) => {
      console.log(err)
    });
  }

  return (
    <div className={style.container_projects}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar projeto"/>
    </div>
  )
}

export default NovoProjeto