import React, {useContext} from 'react';
import {Route, Routes} from "react-router";
import {privateRoutes, publicRoutes} from '../../routes'
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";



const Router = () => {
    //получаем из контекста объект с информацией про аунтетификацию
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return user ? (
            <Routes>
                {
                    privateRoutes.map(route =>
                        <Route key={route.path} path={route.path} element={route.element} exact={route.exact}/>
                    )
                }
            </Routes>
        ) :

        (
            <Routes>
                {
                    publicRoutes.map(route =>
                        <Route key={route.path} path={route.path} element={route.element} exact={route.exact}/>
                    )
                }
            </Routes>
        )
};

export default Router;