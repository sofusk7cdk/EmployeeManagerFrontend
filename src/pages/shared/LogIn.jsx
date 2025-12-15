import {useState} from "react"
import facade from "../../utils/apiFacade.js";
import {useNavigate} from "react-router";

function LogIn() {
    const navigate = useNavigate();

    const init = {username: "", password: ""};
    const [loginCredentials, setLoginCredentials] = useState(init);

    const [loginValidationError, setLoginValidationError] = useState(true);
    const [loginError, setLoginError] = useState(false);


    const performLogin = (evt) => {
        evt.preventDefault();

        facade.login(loginCredentials.username, loginCredentials.password)
            .then(() => {
                navigate("/home");
            })
            .catch(() => {
                    setLoginError(true);
                }
            );
    }

    const onChange = (evt) => {
        setLoginCredentials({...loginCredentials, [evt.target.id]: evt.target.value})
        if (loginCredentials.username.length > 0 && (evt.target.id === "password" && evt.target.value.length) > 0) {
            setLoginValidationError(false);
        } else {
            setLoginValidationError(true);
        }
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={performLogin}>
                <input placeholder="User Name" id="username" onChange={onChange} value={loginCredentials.username}/>
                <input placeholder="Password" id="password" type="password" onChange={onChange}
                       value={loginCredentials.password}/>
                <button type="submit" disabled={loginValidationError}>Submit</button>

                {loginError && <p className="error">Login failed. Please try again.</p>}
            </form>
        </div>
    )
}

export default LogIn