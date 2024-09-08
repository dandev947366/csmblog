type LoginPayload = {
    email: string,
    password: string
}

const login = (payload:LoginPayload) => {
    console.log(payload)
}

export {login}