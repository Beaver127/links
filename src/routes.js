import Login from "./components/Login/Login";
import List from "./components/List/List";

export const publicRoutes = [
    {path: '/login', element: <Login />, exact: true},
    {path: "*", element: <Login />, exact: true}
]

export const privateRoutes = [
    {path: '/list', element: <List />, exact: true},
    {path: "*", element: <List />, exact: true}
]