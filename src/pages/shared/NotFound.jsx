import { useNavigate } from "react-router";

function NotFound() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>404 - Page Not Found</h2>
            <button onClick={() => navigate('/home')}>Home</button>
        </div>
    )
}

export default NotFound;