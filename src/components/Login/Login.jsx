import React, {useContext} from 'react';
import {Context} from "../../index";
import firebase from "firebase/compat/app";
const Login = () => {

    const {auth} = useContext(Context)

    const login = async () => {
        //способ авторизации
        const provider = new firebase.auth.GoogleAuthProvider()
        //авторизация
        const {user} = await auth.signInWithPopup(provider)
        console.log(user)
    }


    return (
        <div>
            <div onClick={login} >Войти с помощью Google</div>
        </div>
    );
};

export default Login;