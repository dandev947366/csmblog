import React, { createContext, useState, useContext, ReactNode } from "react";

export type ToastType = 'success' | 'error' | 'warning' | null; 

interface ToastContextType {
    message: string;
    type: ToastType; 
    setMessage: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<{ message: string; type: ToastType }>({
        message: '',
        type: null,
    });

    const setMessage = (message: string, type: ToastType = null) => {
        setToast({ message, type });
    };

    return (
        <ToastContext.Provider value={{ message: toast.message, type: toast.type, setMessage }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
