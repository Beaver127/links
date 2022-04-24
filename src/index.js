import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


firebase.initializeApp({
    apiKey: "AIzaSyCvRmVikOfUJgEoM4hS1-zZa4DSs9OptAs",
    authDomain: "chat-react-c7fca.firebaseapp.com",
    projectId: "chat-react-c7fca",
    storageBucket: "chat-react-c7fca.appspot.com",
    messagingSenderId: "675870595920",
    appId: "1:675870595920:web:bd8c37e0e16e2a242daa55"
});


export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()

//используем хук контекста \ с помощью хука useContext сможем использовать нужные объекты

ReactDOM.render(
    <Context.Provider value={{
        firebase,
        auth,
        firestore
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);
