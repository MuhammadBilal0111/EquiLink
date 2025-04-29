// import {configureStore, createSlice} from "@reduxjs/toolkit"

// const userSlice = createSlice({
//     name: "User",
//     initialState: { authUser: null },
//     reducers: {
//       setUser: (state, action) => {
//         state.authUser = action.payload;
//       },
//     },
// });

// const profileSlice = createSlice({
//   name:"Profile",
//   initialState:{profile:null},
//   reducers:{
//     setProfile:(state,action)=>{
//       state.profile = action.payload
//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(userSlice.actions.setUser, (state, action) => {
//       state.profile = action.payload; // Update profile when authUser is set
//     });
//   },
// })

// const store = configureStore({reducer:{
//     userStore: userSlice.reducer,
//     profileStore: profileSlice.reducer
// }});

// export const userActions = userSlice.actions;
// export const profileActions = profileSlice.actions
// export default store;

// import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "@/lib/axios";

// // Async thunk to fetch and filter pitches
// export const fetchPitches = createAsyncThunk("pitches/fetchPitches", async () => {
//   const response = await axiosInstance.get("/startups/get-all-startups", {
//       headers: { "Content-Type": "multipart/form-data" },
//   });

//   console.log("API Response:", response.data); // Debugging log

//   const pitchesArray = Array.isArray(response.data.data) ? response.data.data : [];

//   return pitchesArray.map(({ id, title, description, pitchVideo, pitchImages, fundingGoal, equity }) => ({
//       id,
//       title,
//       description,
//       pitchVideo,
//       pitchImages,
//       fundingGoal,
//       equity
//   }));
// });

// // Pitch slice
// const pitchSlice = createSlice({
//     name: "Pitches",
//     initialState: { pitches: [], loading: false, error: null },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchPitches.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchPitches.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.pitches = action.payload;
//             })
//             .addCase(fetchPitches.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

// // User slice
// const userSlice = createSlice({
//     name: "User",
//     initialState: { authUser: null },
//     reducers: {
//         setUser: (state, action) => {
//             state.authUser = action.payload;
//         },
//     },
// });

// // Profile slice
// const profileSlice = createSlice({
//     name: "Profile",
//     initialState: { profile: null },
//     reducers: {
//         setProfile: (state, action) => {
//             state.profile = action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(userSlice.actions.setUser, (state, action) => {
//             state.profile = action.payload;
//         });
//     },
// });

// // Configure store
// const store = configureStore({
//     reducer: {
//         userStore: userSlice.reducer,
//         profileStore: profileSlice.reducer,
//         pitchStore: pitchSlice.reducer,
//     },
// });

// export const userActions = userSlice.actions;
// export const profileActions = profileSlice.actions;
// export default store;

import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { axiosInstance } from "@/lib/axios";

// // Async thunk to fetch and filter pitches
// export const fetchPitches = createAsyncThunk("pitches/fetchPitches", async () => {
//   const response = await axiosInstance.get("/startups/get-all-startups", {
//       headers: { "Content-Type": "multipart/form-data" },
//   });

//   console.log("API Response:", response.data); // Debugging log
//   console.log("Data Array:", response.data.data); // Debugging log
// });

// // Pitch slice
// const pitchSlice = createSlice({
//     name: "Pitches",
//     initialState: { pitches: [], loading: false, error: null },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchPitches.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchPitches.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.pitches = action.payload;
//             })
//             .addCase(fetchPitches.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });

export const fetchPitches = createAsyncThunk(
  "pitches/fetchPitches",
  async () => {
    const response = await axiosInstance.get("/startups/get-all-startups");
    // console.log("API Response:", response.data); // Debugging log
    // console.log("Data Array:", response.data.data); // Debugging log
    return response.data.data;
  }
);

const pitchSlice = createSlice({
  name: "Pitches",
  initialState: { pitches: [] },
  reducers: {
    setPitches: (state, action) => {
      state.pitches = action.payload;
    },
  },
});

// User slice
const userSlice = createSlice({
  name: "User",
  initialState: { authUser: null },
  reducers: {
    setUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

// Profile slice
const profileSlice = createSlice({
  name: "Profile",
  initialState: { profile: null, walletAddress: null },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSlice.actions.setUser, (state, action) => {
      state.profile = action.payload;
    });
  },
});

// Configure store
const store = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    profileStore: profileSlice.reducer,
    pitchStore: pitchSlice.reducer,
  },
});

export const userActions = userSlice.actions;
export const profileActions = profileSlice.actions;
export const { setPitches } = pitchSlice.actions; // Add this line
export default store;
