// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";

// const store = configureStore({
//   reducer: {
//     users: userReducer,
//   },
// });

// export default store;

// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Sesuaikan path sesuai struktur folder Anda

const store = configureStore({
  reducer: {
    users: userReducer,
    // Tambahkan reducers lain jika ada
  },
});

export default store;
