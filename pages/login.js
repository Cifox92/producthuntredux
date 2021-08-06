import React, { useState } from 'react'
import { css } from '@emotion/react'
import Router from 'next/router'
import Layout from '../components/layout/Layout'
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario'

//Firebase
import firebase from '../firebase'

//Sistema de validaciones
import useValidacion from '../hooks/useValidacion'
import validarIniciarSesion from '../validacion/validarIniciarSesion'

const STATE_INICIAL = {
  email: '',
  password: ''
}

const Login = () => {

  //Errores de registro que pueda devolver firebase
  const [error, guardarError] = useState(false)

  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion)

  const { email, password } = valores

  async function iniciarSesion() {
    try {
      await firebase.login(email, password) //Inicio de sesión con firebase

      Router.push('/')

    } catch (error) {
      console.error('Hubo un error al iniciar sesión: ', error.message)
      guardarError(error.message)
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1 
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >Iniciar Sesión</h1>

          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <Campo>
              <label htmlFor='email'>Email</label>
              <input 
                type='email'
                id='email'
                placeholder='Tu Email'
                name='email'
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {/*Errores de validación de campo*/}
            {errores.email && <Error>{errores.email}</Error>}
  
            <Campo>
              <label htmlFor='password'>Password</label>
              <input 
                type='password'
                id='password'
                placeholder='Tu Password'
                name='password'
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {/*Errores de validación de campo*/}
            {errores.password && <Error>{errores.password}</Error>}

            {/*Errores de registro: respuesta por parte del servidor de firebase*/}
            {error && <Error>{error}</Error>}
  
            <InputSubmit 
              type='submit' 
              value='Iniciar Sesión'
              />
          </Formulario>
        </>
      </Layout>
    </div>
  )
}

export default Login