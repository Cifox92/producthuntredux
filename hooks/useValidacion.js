import React, { useState, useEffect } from 'react'

//Hook creado para crear cuenta, iniciar sesion
const useValidacion = (stateInicial, validar, fn) => {

    const [valores, guardarValores] = useState(stateInicial)
    const [errores, guardarErrores] = useState({})
    const [submitForm, guardarSubmitForm] = useState(false)

    useEffect(() => {
        if(submitForm) {
            const noErrores = Object.keys(errores).length === 0

            if(noErrores) {
                fn() //Será la función que el usuario pida ejecutar y que se pasará desde el componente
            }

            guardarSubmitForm(false)
        }
    }, [errores])

    //Función que se ejecuta cuando el usuario escribe
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    //Función que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault()

        const erroresValidacion = validar(valores)
        guardarErrores(erroresValidacion)
        guardarSubmitForm(true)
    }

    //cuando se realiza el evento de blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores)
        guardarErrores(erroresValidacion)
    }

    return {
        valores,
        errores,
        submitForm,
        handleSubmit,
        handleChange,
        handleBlur
    }
}
 
export default useValidacion