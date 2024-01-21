import getToken from "./getToken"

const isAuth = () => {
    const token = getToken()
    return !!token
}

export default isAuth