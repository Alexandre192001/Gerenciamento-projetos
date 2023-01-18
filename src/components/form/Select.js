import React from 'react'
import style from './Select.module.css'

function Select({text,name,options,handleonchange,value}) {

  return ( 
    <div className={style.form_control}>
        <label htmlFor={name}>{text}</label>
        <select name={name} id={name} onChange={handleonchange} value={value || ''}>
            <option >Seleciona uma opção</option>
            {options.map((option)=>(
              <option value={option.id} 
              key={option.id}>{option.name}
              </option>
            ))}
        </select>
    </div>
  )
}

export default Select