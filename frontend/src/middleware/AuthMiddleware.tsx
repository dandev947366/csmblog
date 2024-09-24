import { PropsWithChildren } from "react";

type ProtectedRouteProps = PropsWithChildren

const AuthMiddleware = ({children}: ProtectedRouteProps) => {

    console.log(children)
    return children
}

export default AuthMiddleware