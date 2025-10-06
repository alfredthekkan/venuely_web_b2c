import { createContext } from "react"; 

type NavigationContextType = {
    title: string,
    setTitle: (data:string) => void
}

const defaultContext: NavigationContextType = {
    title: "Home",
    setTitle: (data) => { console.log(data) }
}

export const NavigationContext = createContext<NavigationContextType>(defaultContext)

