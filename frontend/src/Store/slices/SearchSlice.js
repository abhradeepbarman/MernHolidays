import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        destination: "",
        checkIn: new Date(),
        checkOut: new Date(),
        adultCount: 1,
        childCount: 0,
        hotelId: ""
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
        }
    }
})

export const { setSearchValues } = searchSlice.actions
export default searchSlice.reducer