import {toast} from "react-hot-toast"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async(formData) => {
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

        if(!response.ok) {
            throw new Error("Failed to create account")
        }
    
        const result = await response.json()
        toast.success("Registration Successful", {
            duration: 2000,
        })
        return result;
    } 
    catch (error) {
        toast.error("Error")
        console.log("error in api client", error); 
        throw error;
    }

    finally {
        toast.dismiss(toastId)
    }
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