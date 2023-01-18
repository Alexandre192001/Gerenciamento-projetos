import React from 'react'
import style from './project.module.css'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Container from '../layout/Container'


function Project() {

    const {id} = useParams()
    const [project, setProject] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then((respo) => respo.json())
        .then((data)=>{
            setProject(data)
            console.log(data)
        }).catch((err) => {
            console.log(err)
        });

    },[id])

  return (
    <div>
        <Container customClass="column">
            <div>
                <h1>Projeto: {project.name}</h1>
                <button>Editar Projeto</button>
            </div>
        </Container>    
    </div>
  )
}

export default Project