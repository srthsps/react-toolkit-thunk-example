import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const loginUser = createAsyncThunk(
    "users/login",
    async ({ username, password }, thunkAPI) => {
      try {
        const response = await fetch(
          "https://dev.enfono.com/api_downtown/api/v1/auth/login/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          }
        )
        let data = await response.json()
        console.log("response", data)
        if (response.status === 200) {
          localStorage.setItem("property-token", data.token)
          return data
        } else {
          return thunkAPI.rejectWithValue(data)
        }
      } catch (e) {
        console.log("Error", e.response.data)
        thunkAPI.rejectWithValue(e.response.data)
      }
    }
  )
const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    }
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
        state.username = payload.username;
        // state.username = payload.name;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
      },
      [loginUser.rejected]: (state, { payload }) => {
        console.log('payload', payload);
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      },
      [loginUser.pending]: (state) => {
        state.isFetching = true;
      },
  },
})

export const { clearState } = userSlice.actions;

export const userSelector = state => state.user

export default userSlice.reducer