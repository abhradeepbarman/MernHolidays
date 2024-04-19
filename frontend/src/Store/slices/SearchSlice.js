import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        destination: sessionStorage.getItem("destination") || "",
        checkIn: sessionStorage.getItem("checkIn") || new Date(),
        checkOut: sessionStorage.getItem("checkOut") || new Date(),
        adultCount: parseInt(sessionStorage.getItem("adultCount")) || 1,
        childCount: parseInt(sessionStorage.getItem("childCount")) || 0,
        hotelId: sessionStorage.getItem("hotelId") || ""
    },
    reducers: {
        setSearchValues: (state, action) => {
            const { destination, checkIn, checkOut, adultCount, childCount, hotelId } = action.payload;
            state.destination = destination;
            state.checkIn = checkIn;
            state.checkOut = checkOut;
            state.adultCount = adultCount;
            state.childCount = childCount;
            if(hotelId) {
                state.hotelId = hotelId
            }

            sessionStorage.setItem("destination", destination)  
            sessionStorage.setItem("checkIn", checkIn)  
            sessionStorage.setItem("checkOut", checkOut)  
            sessionStorage.setItem("adultCount", adultCount.toString())  
            sessionStorage.setItem("childCount", childCount.toString())  

            if(hotelId) {
                sessionStorage.setItem("hotelId", hotelId)
            }
        }
    }
})

export const { setSearchValues } = searchSlice.actions
export default searchSlice.reducer