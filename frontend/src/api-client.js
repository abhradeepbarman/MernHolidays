import {toast} from "react-hot-toast"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const verifyEmail = async(email) => {
    const toastId = toast.loading("Loading...")
    const response = await fetch(`${API_BASE_URL}/api/auth/sendOtp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email})
    })

    if(!response.ok) {
        toast.dismiss(toastId)
        throw new Error("Error while verifying email")
    }

    toast.dismiss(toastId)
    const result = await response.json()
    return result
}

export const register = async(body) => {
    const toastId = toast.loading("Loading...")

    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    
    const result = await response.json()

    //DOUBT
    if(!response.ok) {
        toast.dismiss(toastId)
        throw new Error(result.message)
    }

    toast.dismiss(toastId)
    return result;
}

export const signIn = async(formData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
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
    })

    if(!response.ok) {
        throw new Error("Error during sign out")
    }

    const result = response.json()
    return result
}

export const addMyHotel = async(formData, token) => {
    const toastId = toast.loading("Loading...")

    const response = await fetch(`${API_BASE_URL}/api/my-hotels/addHotel`, {
        method: "POST",
        credentials: "include",
        body: formData,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })


    if(!response.ok) {
        throw new Error("Failed to add hotel!");
    }

    const result = await response.json();

    toast.dismiss(toastId)
    return result;
}

export const fetchMyHotels = async(token) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/getMyHotels`, {
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })

    if(!response.ok) {
        throw new Error("Error fetching Hotels");
    }

    const result = await response.json()
    return result
}

export const fetchMyHotelById = async(hotelId, token) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })

    if(!response.ok) {
        throw new Error("Error fetching Hotel")
    }

    const result = await response.json()
    return result;
}

export const updatedMyHotelById = async(hotelFormData, navigate, token) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await fetch(`${API_BASE_URL}/api/my-hotels/edit/${hotelFormData.get("hotelId")}`, {
            method: "PUT",
            credentials: "include",
            body: hotelFormData,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
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

    const response = await fetch(
        `${API_BASE_URL}/api/hotels/search?${queryParams}`
    )

    if(!response.ok) {
        throw new Error("Error fetching hotels");
    }

    const result = await response.json()
    return result
}

export const fetchHotels = async() => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`);

    if(!response.ok) {
        throw new Error("Error fetching Hotels!")
    }

    const result = await response.json()
    return result
}

export const fetchHotelById = async(hotelId) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)

    if(!response.ok) {
        throw new Error("Error fetching Hotels");
    }

    return response.json()
}

export const storeEmail = (token) => {
    return async(email) => {
        console.log(email);
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/storeEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
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

export const fetchCurrentUser = async(token) => {
    const res = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })

    if(!res.ok) {
        throw new Error("Error fetching user")
    }

    return res.json()
}

export const createPaymentIntent = async(hotelId, numberOfNights, token) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNights }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })

    if(!response.ok) {
        throw new Error("Error fetching payment intent")
    }

    const result = await response.json()
    return result;
}

export const createRoomBooking = async(formData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${formData.token}`,
        },
        credentials: "include",
        body: JSON.stringify(formData)
    })

    console.log("response", response);

    if(!response.ok) {
        throw new Error("Error booking room")
    }

    return response
}

export const fetchMyBookings = async(token) => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    console.log(response);

    if(!response.ok) {
        throw new Error("Unable to fetch bookings")
    }

    const result = await response.json()
    return result
}

export const changeAcceptBooking = async(hotelId, token) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/acceptBooking`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({hotelId})
    })

    if(!response.ok) {
        throw new Error( "Hotel accept booking status not changed")
    }

    const result = await response.json()
    return result;
}

export const deleteHotelById = async(hotelId, token) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/deleteHotel`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({hotelId})
    })

    console.log("response", response);

    if(!response.ok) {
        toast.error("Error")
        throw new Error("Error while deleting Hotel")
    }

    toast.success("Hotel Deleted!")
    const result = await response.json()
    return result
}