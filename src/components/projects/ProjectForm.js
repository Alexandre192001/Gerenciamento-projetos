import { useEffect, useState } from 'react'
import React from 'react'
import style from './ProjectForm.module.css'
import Input from '../form/input'
import Select from '../form/Select'
import SubmitButton from '../form/Submit'

export default function ProjectForm({handleSubmit,btnText,projectData}) {

  const [categories,setCategories] = useState([])
  const [project, setProject] = useState(projectData || {})

  useEffect(()=>{
    fetch("http://localhost:5000/categories",{
    method:"GET",
    headers:{
      'Content-Type':'Application/json'
    }
  }).then((res) =>res.json() 
  .then((data)=>{
    setCategories(data)
  })
  ).catch((err) => {
    console.log(err)
  });
  },[])


  const submit = (e)=>{
    e.preventDefault()
    handleSubmit(project)
  }


  function handleChange(e){
    setProject({...project,[e.target.name]:e.target.value})
   
  }

  function handleCategory(e){
    setProject({...project,category:{
      id:e.target.value,
      name:e.target.options[e.target.selectedIndex].text
    }})
   
  }

  return (
    <form onSubmit={submit} className={style.form}>
        <Input 
        type="text" 
        text="Nome do projeto" 
        name="name" 
        placeholder="Insira o nome do projeto"
        handleonchange={handleChange}
        value={project.name ? project.name : ''}
        />
        
        <Input type="number"
         text="Orçamento do projeto"
          name="budget" 
          placeholder="Insira o orçamento total"
          handleonchange={handleChange}
          value={project.budget ? project.budget : ''}
          />
        
        <Select 
        name="category_id" 
        text="Selecione a categoria"
        options={categories}
        handleonchange={handleCategory}
        value={project.category ? project.category.id : ''}
        />
        <SubmitButton type={handleSubmit} text={btnText}/>
    </form>
  )
}