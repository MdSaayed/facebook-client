import { useSelector } from 'react-redux';
import { Navigate, useLocation } from "react-router-dom";


const Private = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const location = useLocation();

    if (user) {
        return children;
    }

    return <Navigate state={{ form: location }} to={'/login'} replace></Navigate>
};

export default Private;