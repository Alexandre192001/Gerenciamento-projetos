
import React, { useState,useEffect } from 'react'
import styles from './Projects.module.css'
import LinkButton from '../layout/LinkButton'
import Container from '../layout/Container'
import ProjectCard from '../projects/ProjectCard'

function Projects() {

  const [projects, setProjects] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/projects',{
      method:"GET",
      headers:{
        'Content-Type':'application/json',
      }
    }).then((res)=>res.json())
    .then(data=>{
      setProjects(data)
    }).catch(error=>{
      console.log(error)
    })
  },[])

  function removeProjects(id){
    fetch(`http://localhost:5000/projects/${id}`,{
      method:"Delete",
      headers:{
        "Contente-Type":"application/json"
      }
    }).then((respo) => {
      respo.json()
    }).then(()=>{
      setProjects(projects.filter((project)=>project.id !==id))
    }).catch((err) => {
      console.log(err)
    });
  }


  return (
    <div className={styles.project_container}>
        <div className={styles.title_container}>
          <h1>Meus Projetos</h1>
          <LinkButton to="/NovoProjeto" text="Criar projeto"/>
        </div>
        <Container customClass="start">
          {projects.length>0 &&
          projects.map((project)=>(
            <ProjectCard 
            id={project.id}
            name={project.name}
            budget={project.budget}
            category={project.category.name}
            key={project.id}
            handleRemove={removeProjects}
            />
          ))}
        </Container>
    </div>
  )
}

export default Projects