import './App.css';
import InputHandler from './components/InputHandler';
import ShowData from './components/ShowData';
import React from 'react'

function app () {
  return (
    <div className='container'>
      <h1 className='text-center my-5'>DashBoard</h1>
      <input type='file' className='form-control rounded-pill mb-5' placeholder='votre texte ici' accept=".csv" onChange={InputHandler}/>
      <ShowData/>
    </div>
  )
}

export default app