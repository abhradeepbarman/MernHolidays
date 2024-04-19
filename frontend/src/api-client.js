import {toast} from "react-hot-toast"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async(formData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })

    const result = await response.json()

    if(!response.ok) {
        throw new Error(result.message)
    }
}

export const signIn = async(formData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    
    const result = await response.json()

    if(!response.ok) {
        throw new Error(result.message)
    }

    return result
}

export const signout = async() => {

    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
    })

    if(!response.ok) {
        throw new Error("Error during sign out")
    }

    const result = response.json()
    return result
}

export const addMyHotel = async(formData) => {
    const toastId = toast.loading("Loading...")

    const response = await fetch(`${API_BASE_URL}/api/my-hotels/addHotel`, {
        method: "POST",
        credentials: "include",
        body: formData
    })

    if(!response.ok) {
        throw new Error("Failed to add hotel!");
    }

    toast.dismiss(toastId)
    return response.json();
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

    const queryParams = new URLSearchParams()
    queryParams.append("destination", searchParams.destination || "")
    queryParams.append("checkIn", searchParams.checkIn || "")
    queryParams.append("checkOut", searchParams.checkOut || "")
    queryParams.append("adultCount", searchParams.adultCount || "")
    queryParams.append("childCount", searchParams.childCount || "")
    queryParams.append("page", searchParams.page || "")

    queryParams.append("maxPrice", searchParams.maxPrice || "")
    queryParams.append("sortOptions", searchParams.sortOptions || "")

    searchParams?.facilities?.forEach((facility) => 
        queryParams.append("facilities", facility)
    )

    searchParams?.types?.forEach((type) => 
        queryParams.append("types", type)
    )

    searchParams?.stars?.forEach((star) => 
        queryParams.append("stars", star)
    )

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
}

export const fetchHotelById = async(hotelId) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)

    if(!response.ok) {
        throw new Error("Error fetching Hotels");
    }

    return response.json()
}

export const storeEmail = () => {
    return async(email) => {
        console.log(email);
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/storeEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // Ensure this aligns with your CORS policy and security requirements
                body: JSON.stringify({
                    email,
                })
            });

            const result = await response.json()
    
            if(!response.ok) {
                toast.error(result.message)
                return;
            }

            toast.success(result.message);

            return result
        } 
        catch (error) {
            console.log("STORE EMAIL API ERROR");
            console.log(error);
        }
    }
}

export const fetchCurrentUser = async() => {
    const res = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include",
    })

    if(!res.ok) {
        throw new Error("Error fetching user")
    }

    return res.json()
}