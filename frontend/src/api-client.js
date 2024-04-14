import {toast} from "react-hot-toast"
import { setToken, setUserId, setIsLoading } from "./Store/slices/authSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async(formData, dispatch, navigate) => {
    const toastId = toast.loading("Loading...")

    try {
        const response = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        const result = await response.json()

        if(!response.ok) {
            toast.error(result.message)
            throw new Error(result.message)
        }
        
        toast.success("Registration Successful", {
            duration: 2000,
        })

        navigate("/sign-in")
    } 
    catch (error) {
        console.log(error.message);
    }  

    toast.dismiss(toastId)
}

export const signIn = async(formData, dispatch, navigate) => {
    const toastId = toast.loading("Loading..")
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const result = await response.json()

        const {token, userId} = result;

        if(!response.ok) {
            toast.error(result.message)
            throw new Error(result.message)
        }

        localStorage.setItem("auth_token", token)
        const payload = {
            token: token,
        }
        await dispatch(setToken(payload))

        localStorage.setItem("userId", userId)
        dispatch(setUserId(userId))

        toast.success("Sign in successful", {
            duration: 2000,
        })

        navigate("/")
    } 
    catch (error) {
        console.log(error.message);
    }

    toast.dismiss(toastId);
}

export const validateToken = async() => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    })

    if(!response.ok) {
        throw new Error("Token invalid")
    }

    return response;
}

export const signout = async(dispatch, navigate) => {

    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
    })

    if(!response.ok) {
        throw new Error("Error during sign out")
    }

    localStorage.removeItem("auth_token");
    localStorage.removeItem("userId");

    dispatch(setToken(null))
    dispatch(setUserId(null))

    toast.success("Signed Out")

    navigate("/")
}

export const addMyHotel = async(formData) => {
    const toastId = toast.loading("Loading...")
    setIsLoading(true)

    try {
        const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
            method: "POST",
            credentials: "include",
            body: formData
        })


        if(!response.ok) {
            toast.error(Error);
            throw new Error("Failed to add hotel!");
        }

        toast.success("Hotel added!")

        return response.json();
    } 
    catch (error) {
        console.log(error);
        toast.error("Error")
        console.log("ADD HOTELS API ERROR");
    }

    finally{
        setIsLoading(false)
        toast.dismiss(toastId)
    }
}