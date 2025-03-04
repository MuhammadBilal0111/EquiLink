import {configureStore, createSlice} from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: "User",
    initialState: { authUser: null },
    reducers: {
      setUser: (state, action) => {
        state.authUser = action.payload;
      },
    },
});



const store = configureStore({reducer:{
    userStore: userSlice.reducer
}});


export const userActions = userSlice.actions;
export default store;