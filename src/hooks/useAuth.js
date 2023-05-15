//custom Hook dafür, dass nicht jedes mal beides importiert werden muss und einfacherer Zugriff
import { useContext } from "react";
import AuthContext from "../kontext/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;