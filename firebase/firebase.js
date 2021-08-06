import app from "@firebase/app";
import 'firebase/auth'

import firebaseConfig from "./config";

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth()
    }

    //Registro de usuario en firebase
     async registrar(nombre, email, password) {
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email, password)

        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        })
    }

    //Inicio de sesión con firebase
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    //Cierre de sesión
    async cerrarSesion() {
        await this.auth.signOut()
    }
}

const firebase = new Firebase()
export default firebase