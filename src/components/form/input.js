import React from 'react'
import style from './input.module.css'

function Input({type,text,name,placeholder,handleonchange,value}) {

  return (
    <div className={style.form_control}>
        <label htmlFor={name}>{text}</label>
        <input 
        autoComplete='off'
        id={name} 
        name={name}
        type={type} 
        placeholder={placeholder}
        onChange={handleonchange} 
        value={value}
        />
    </div>
  )
}

export default Input