export default function validarCrearProducto(valores) {
    let errores = {}

    //Validar nombre de usuario
    if(!valores.nombre) {
        errores.nombre = 'El Nombre es obligatorio'
    }

    //Validar Empresa
    if(!valores.empresa) {
        errores.empresa = 'El Nombre de Empresa es obligatorio'
    }

    //validar la URL
    if(!valores.url) {
        errores.url = 'La URL de Producto es obligatoria'
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = 'La URL está mal formateada o no es válida'
    }

    //Validar la descripción
    if(!valores.descripcion) {
        errores.descripcion = 'Agrega una descripción a tu producto'
    }
    
    return errores
}