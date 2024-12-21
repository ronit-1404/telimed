import { createContext } from "react";

export const AdminContext = createContext()

//we are creating this context to add login and token functionality 
const AdminContextProvider = (props) => {
    
    const value = {

    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider