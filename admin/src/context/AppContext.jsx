import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    

    const currency = '$'
    const calculateage = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const value = {
        calculateage,
        currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider