const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async(formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok) {
            throw new Error("Failed to create account")
        }
    
        const result = await response.json()
        return result;
    } 
    catch (error) {
       console.log("error in api client", error); 
       throw error;
    }
}