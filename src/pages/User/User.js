import { useContext } from "react";
import Login from "./components/Login/Login";
import { AuthContext } from "../../context/AuthContext";
import Account from "./components/Account/Account";

const User = ()=>{

    const { loggedIn } = useContext(AuthContext);

    return (
        <>
            {loggedIn ? <Account/> : <Login/> }
        </>
    )
}

export default User;