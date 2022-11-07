import { useCallback, useContext } from "react";
import { UserContext } from "../context/UserContext";

const useUser = () => {
    const { token, setToken } = useContext(UserContext);

    const login = useCallback(() => {
        setToken('test')
    }, [setToken]);

    return {
        isLogged: Boolean(token),
        login
    }
}

export default useUser;