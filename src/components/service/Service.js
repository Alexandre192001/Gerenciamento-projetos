import React from 'react'
import style from '../projects/ProjectForm.module.css'
import {useState} from 'react'
import Input from '../form/input'
import SubmitButton from '../form/Submit'

function Service({handleSubmit,btnText,projectData}) {

  const [ service, setService] = useState({})

  function submit(e){
    e.preventDefault()
    projectData.services.push(service)
    handleSubmit(projectData)
  }

  function handleChange(e){
    setService({...service, [e.target.name]:e.target.value})
  }

  return (
    <form onSubmit={submit} className={style.form}>
        <Input
          type="text"
          text="Nome do serviço"
          name="name"
          placeholder="Insira o nome do serviço"
          handleonchange={handleChange}
        />

        <Input
          type="number"
          text="Custo do serviço"
          name="cost"
          placeholder="Insira o valor total"
          handleonchange={handleChange}
        />

        <Input
          type="text"
          text="Descrição do serviço"
          name="description"
          placeholder="Escreva o serviço"
          handleonchange={handleChange}
        />
      <SubmitButton text={btnText}/>
    </form>
  )
}

export default Service