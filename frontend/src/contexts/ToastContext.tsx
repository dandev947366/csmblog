import React, { createContext, useState, useContext, ReactNode } from "react"

interface ToastContextType {
    message : string,
    type: 'success' | 'error' | 'warning',
    setMessage: (message:string, type?: 'success'|'warning'|'error')=>void,
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
    children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) =>{
    
    const [message, setToastMessage] = useState<ToastContextType>({
        message:'',
        type: null,
        setMessage: (message, type=null)=>{
            setToastMessage({message, type})
        }
    })
    
    }
    return (
        <ToastContext.Provider value={{...message, setMessage}}>
            {children}
        </ToastContext.Provider>
    )

}

export const useToast = () : ToastContextType => {
    const context = useContext(ToastContext)
    if(!context){
        throw new Error("Error")
    }
    return context
}