import {parse,v4 as uuidv4} from 'uuid'
import React from 'react'
import style from './project.module.css'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Container from '../layout/Container'
import ProjectForm from '../projects/ProjectForm'
import Message  from '../layout/Message'
import ServiceForm from '../service/Service'
import ServiceCard from '../service/ServiceCard'

function Project() {

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [service, setService] = useState([])
    const [showProjectForm, setProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [showServiceForm, setServiceForm] = useState(false)

    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:5000/projects/${id}`,{
                method:"GET",
                headers:{"Content-Type":"application/json"}
            }).then((respo) => respo.json())
            .then((data)=>{
                setProject(data)
                setService(data.services)
                
            }).catch((err) => {
                console.log(err)
            });
        },1000)
        },[id])
        // eslint-disable-next-line

        function createService(project){
            setMessage('')
            const lastService = project.services[project.services.length -1] 
            
            lastService.id = uuidv4()

            const lastServiceCost = lastService.cost

            const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
            
            if(newCost>parseFloat(project.budget)){
                setMessage("Orçamento ultrapassado, verifique o valor do service")
                setType("error")
                project.services.pop()
                return false
            }
            project.cost = newCost

            fetch(`http://localhost:5000/projects/${project.id}`,{
                method:"PATCH",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(project)
            }).then((res)=>res.json())
            .then((data)=>{
                setServiceForm(false)
            }).catch((err)=>{
                console.log(err)
            })
        }

        function RemoveService(id,cost){
            const serviceUpdate = project.services.filter((service)=>service.id !==id)
            const projectsUpdate = project
            projectsUpdate.services = serviceUpdate
            projectsUpdate.cost = parseFloat(projectsUpdate.cost) - parseFloat(cost)

            fetch(`http://localhost:5000/projects/${projectsUpdate.id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(projectsUpdate)
            }).then((respo)=>respo.json())
            .then((data)=>{
                setProject(projectsUpdate)
                setService(serviceUpdate)
                setMessage("Serviço removido com sucesso")
                setType("sucess")
            }).catch((err) => {
                console.log(err)
            });
        }

        function ShowProjectForm(){
            setProjectForm(!showProjectForm)
        }
        function ToggleServiceForm(){
            setServiceForm(!showServiceForm)
        }
        function editPost(project){
            setMessage('')
            if(project.budget < project.cost){
               setMessage("O orçamento não pode ser menor que o custo do projeto")
               setType("error")
               return false
            }
            fetch(`http://localhost:5000/projects/${project.id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(project)
            }).then((res)=>res.json())
            .then(data=>{
                setProject(data)
                setProjectForm(false)
                setMessage("Projeto atualizado!")
                setType("sucess")
            }).catch((err)=>{
                console.log(err)
            })
        }


  return (
   <>
    {project.name ?(
    <div className={style.project_details}>
        <Container customClass="column">
        {message && <Message type={type} msg={message}/>}
            <div className={style.details_container}>
                <h1>{project.name}</h1>
                <button className={style.btn} onClick={ShowProjectForm}>
                    {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                </button>
                {!showProjectForm ? (
                    <div className={style.project_info} >
                        <p>
                            <span>Categoria:</span> {project.category.name}
                        </p>
                        <p>
                            <span>Total de Orçamento:</span> {project.budget}
                        </p>
                        <p>
                            <span>Total Utilizado:</span> {project.cost}
                        </p>
                    </div>
                ) : (
                    <div className={style.project_info}>
                        <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                    </div>
                )}
            </div>
            <div className={style.service_form_container}>
                <h2>Adicione um serviço:</h2>
                <button className={style.btn} onClick={ToggleServiceForm}>
                    {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                </button>
                <div className={style.project_info}>
                    {showServiceForm && (
                    (<ServiceForm
                        handleSubmit={createService}
                        btnText="Adicionar Serviço"
                        projectData={project}
                    />)
                    )}
                </div>
            </div>
            <h2>Serviços</h2>
                <Container customClass="start">
                   {service.length >0 &&
                   service.map((serviceItems)=>(
                    <ServiceCard
                        id={serviceItems.id}
                        name={serviceItems.name}
                        cost={serviceItems.cost}
                        description={serviceItems.description}
                        key={serviceItems.id}
                        handleRemove={RemoveService}/>
                   ))

                   }{
                    service.length===0 && <p>Não há serviços cadastrados</p>
                   }
                </Container>
        </Container>
    </div>)
     : (<p>Carregando</p>)}    
   </>
      
    
  )
}

export default Project