import { Children, createContext, useContext, useReducer } from "react";
import {loginReducer} from "../reducer/login-reducer";
const LoginContext = createContext();
const LoginProvider =({Children})=>{
    const initialState={
        login :'',
        password :'',

    }
    const [{email,password}, loginDispatch]=useReducer(loginReducer,initialState  );
    return(
        <LoginContext.Provider value={{email,password,loginDispatch}}>
            {Children}
            </LoginContext.Provider>

    )
}
const useLogin=()=>useContext(LoginContext);
export {LoginProvider,useLogin}



