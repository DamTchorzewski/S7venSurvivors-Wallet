import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.herokuapp.com/";

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

/*
 * POST @ /users/register
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const resp = await axios.post("/users/register", credentials);
      setAuthHeader(resp.data.token);
      return await resp.data;
    } catch (err) {
      console.error(err.message);
      return thunkAPI.rejectWithValue("Registration failed ⚠");
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credentials, thunkAPI) => {
    try {
      const resp = await axios.post("/users/login", credentials);
      setAuthHeader(resp.data.token);
      return await resp.data;
    } catch (err) {
      console.error(err.message);
      return thunkAPI.rejectWithValue("Login failed ⚠");
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (err) {
    console.error(err.message);
    return thunkAPI.rejectWithValue("Logout failed ⚠");
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user ⚠");
    }

    try {
      setAuthHeader(persistedToken);
      const resp = await axios.get("/users/current");
      return await resp.data;
    } catch (err) {
      console.error(err.message);
      return thunkAPI.rejectWithValue("User refresh failed ⚠");
    }
  }
);
