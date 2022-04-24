import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "../Loader/Loader";
import firebase from 'firebase/compat/app';
import classes from './List.module.scss'
import {doc, setDoc, arrayUnion, getDoc} from "firebase/firestore";
const List = () => {

    const {auth, firestore} = useContext(Context)
    //получаем пользователя с помощью хука
    const [user, loading] = useAuthState(auth)
    const [value, setValue] = useState('')
    //получаем сообщения с помощью хука
    const [loadingMessage, setLoadingMessage] = useState(false)
    const [messages, setMessages] = useState(null)


    async function getDocuments() {
        const docRef = doc(firestore, "collections", user.uid);
        const docSnap = await getDoc(docRef);
        setMessages(docSnap.data().array)
    }

    useEffect( () => {
        setLoadingMessage(true)
        getDocuments().then(() => {
            setLoadingMessage(false)
        })
    }, [])

    const sendMessage = async () => {
        try {
            await setDoc(doc(firestore, "collections", user.uid), {
                uuid: user.uid,
                array: arrayUnion({
                    userId: user.uid,
                    text: value,
                    id: new Date().getTime()
                })
            }, {merge: true})
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        getDocuments()
        setValue('')
    }

    if (loadingMessage) {
        return <Loader/>
    }

    async function deleteMessage(id) {
        try {
            await setDoc(doc(firestore, "collections", user.uid), {
                array: messages.filter(i => {
                return i.id !== id
            })
            }, {merge: true})
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        getDocuments()
    }
    function keyPress(e) {
        console.log((e.key))
        if(e.key === 'Enter'){
            sendMessage()
        }
    }

    return (
        <div>
            <div className={classes.input}>
                <input type="text"
                       value={value}
                       onChange={e => setValue(e.target.value)}
                       onKeyPress={(event) => {
                           if (event.key === "Enter") {
                               sendMessage()
                           }
                       }}
                />
                <button className={classes.button} onClick={sendMessage}  >Отправить</button>
            </div>

            <div className={classes.list}>
                <p>{user.displayName}</p>
                {messages !== null ? messages.map(message =>
                    (
                        <div key={message.id} className={classes.listItem}>
                            <div>{message.text} </div>
                            <span onClick={() => {deleteMessage(message.id)}}> X</span>
                        </div>
                    )
                ) : ""}
            </div>


        </div>
    );
}

export default List;