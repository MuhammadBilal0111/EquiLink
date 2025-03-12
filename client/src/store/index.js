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

const profileSlice = createSlice({
  name:"Profile",
  initialState:{profile:null},
  reducers:{
    setProfile:(state,action)=>{
      state.profile = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userSlice.actions.setUser, (state, action) => {
      state.profile = action.payload; // Update profile when authUser is set
    });
  },
})



const store = configureStore({reducer:{
    userStore: userSlice.reducer,
    profileStore: profileSlice.reducer
}});


export const userActions = userSlice.actions;
export const profileActions = profileSlice.actions
export default store;