import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios";

export const Login = createAsyncThunk(
  "/user/signIn",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/auth/signin", user, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3001",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
          "Access-Control-Allow-Headers": "X-Requested-With,content-type",
          "Access-Control-Allow-Credentials": true,
        }
      });
      // localStorage.setItem("authToken", response.data.token);

      // axios.defaults.headers.common = {
      //   Authorization: `bearer ${response.data.token}`,
      // };
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);

export const me = createAsyncThunk(
  "/user/me",
  async (data, thunkAPI) => {
    try {
      let authToken = localStorage.getItem("authToken");
      const response = await axios.post("/auth/me", { authToken });
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);


export const checkCode = createAsyncThunk(
  "/user/checkCode",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/auth/checkCode", data);
      localStorage.setItem("authToken", response.data?.access_token);

      // axios.defaults.headers.common = {
      //   Authorization: `bearer ${response.data.token}`,
      // };
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          err: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          err: "Network Error",
        });
      }
    }
  }
);


const auth = createSlice({
  name: "auth",
  initialState: {
    err: "",
    loading: false,
    done: false,
    doneMe: false,
    data: {},
  },
  reducers: {
    SetState(state, { payload: { field, value } }) {
      state[field] = value;
    },

    SetError(state, { payload: { message } }) {
      state.err = message;
      state.isError = true;
    },
  },
  extraReducers: {
    [checkCode.pending]: (state, action) => {
      state.loading = true;
    },
    [checkCode.fulfilled]: (state, action) => {
      state.done = true;
    },
    [checkCode.rejected]: (state, action) => {
      state.err = action.payload.err;
    },
    [me.pending]: (state, action) => {
      state.loading = true;
    },
    [me.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.doneMe = true;
    },
    [me.rejected]: (state, action) => {
      state.loading = false;
      state.err = action.payload.err;
    }
  },
});

const { reducer, actions } = auth;

export const {
  SetState,
  SetError
} = actions;

export default reducer;
