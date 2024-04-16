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

export const addMyHotel = async(formData, dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setIsLoading(true))

    try {
        const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
            method: "POST",
            credentials: "include",
            body: formData
        })

        console.log(response.json());


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
        dispatch(setIsLoading(false))
        toast.dismiss(toastId)
    }
}

export const fetchMyHotels = async() => {
    const toastId = toast.loading("Loading...")
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    })

    const result = await response.json()
    console.log(result);

    if(!response.ok) {
        throw new Error("Error fetching Hotels");
    }

    toast.dismiss(toastId)
    return result;
}

export const fetchMyHotelById = async(hotelId) => {
    const toastId = toast.loading("Loading...")

    try {
        const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
            credentials: "include"
        })
        const result = await response.json()
    
        if(!response.ok) {
            throw new Error("Error fetching Hotel")
        }

        console.log("result", result);
    
        return result;
    } catch (error) {
        console.log("FETCH HOTEL BY ID API ERROR");
        console.log(error);
    }

    finally {
        toast.dismiss(toastId)
    }
}

export const updatedMyHotelById = async(hotelFormData, navigate) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
            method: "PUT",
            credentials: "include",
            body: hotelFormData,
        })
    
        console.log("response", await response.json());
    
        if(!response.ok) {
            throw new Error("Failed to update Hotel")
        }

        toast.success("Details Updated!")
    
        return response.json()
    } catch (error) {
        console.log("UPDATE HOTEL API ERROR");
        console.log(error);
    }

    finally {
        toast.dismiss(toastId)
        navigate("/my-hotels")
    }
}

export const searchHotels = async(searchParams) => {
    const toastId = toast.loading("Loading..")

    const queryParams = new URLSearchParams()
    queryParams.append("destination", searchParams.destination || "")
    queryParams.append("checkIn", searchParams.checkIn || "")
    queryParams.append("checkOut", searchParams.checkOut || "")
    queryParams.append("adultCount", searchParams.adultCount || "")
    queryParams.append("childCount", searchParams.childCount || "")
    queryParams.append("page", searchParams.page || "")

    try {
        const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)
        const result = await response.json()

        if(!response.ok) {
            toast.error("Error")
            throw new Error("Error fetching Hotels!")
        }

        return result
    } 
    catch (error) {
        console.log(error);
    }

    finally {
        toast.dismiss(toastId)
    }
}