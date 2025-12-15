import {Navigate, Outlet} from "react-router";
import facade from "../utils/apiFacade.js";


const ProtectedRoutes = () => {
    const loggedIn = facade.loggedIn();
    return loggedIn ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes