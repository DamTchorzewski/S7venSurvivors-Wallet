import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirebaseAuth,
  googleProvider,
  authMessage,
} from "../../services/firebase";
import { DEMO_TOKEN, DEMO_USER } from "../../services/demo";
import { actionCodeSettings } from "../../services/emailAction";

// The API address is set at build time (VITE_API_URL); the default is the local API.
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// Every request to the API carries a fresh Firebase ID token (the SDK renews it when it is about to expire).
axios.interceptors.request.use(async (config) => {
  const currentUser = getFirebaseAuth()?.currentUser;
  if (currentUser) {
    config.headers.Authorization = `Bearer ${await currentUser.getIdToken()}`;
  }
  return config;
});

const NOT_CONFIGURED = "Sign-in is not configured for this site";

const toUser = (firebaseUser) => ({
  username:
    firebaseUser.displayName ?? firebaseUser.email?.split("@")[0] ?? "User",
  email: firebaseUser.email,
});

const requireAuth = () => {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error(NOT_CONFIGURED);
  return auth;
};

/*
 * Sign-up with e-mail and password: the account is created in Firebase, which sends the confirmation e-mail.
 * The user stays signed out of the app until the address is confirmed.
 * body: { username, email, password }
 */
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const auth = requireAuth();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: username });
      await sendEmailVerification(user, actionCodeSettings());
      return { user: { username, email } };
    } catch (err) {
      console.error(err.message);
      return thunkAPI.rejectWithValue(authMessage(err));
    }
  }
);

/*
 * Sends the confirmation e-mail again to the account that has just been created.
 */
export const resendVerification = async () => {
  const currentUser = getFirebaseAuth()?.currentUser;
  if (!currentUser) throw new Error(NOT_CONFIGURED);
  await sendEmailVerification(currentUser, actionCodeSettings());
};

/*
 * Sign-in with e-mail and password. An address that is not confirmed yet gets a new confirmation e-mail and no access.
 * body: { email, password }
 */
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const auth = requireAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (!user.emailVerified) {
        await sendEmailVerification(user, actionCodeSettings());
        await signOut(auth);
        return thunkAPI.rejectWithValue(
          "E-mail is not confirmed. We sent you a new confirmation link"
        );
      }

      return { user: toUser(user) };
    } catch (err) {
      console.error(err.message);
      return thunkAPI.rejectWithValue(authMessage(err));
    }
  }
);

/*
 * Sign-in with a Google account (a pop-up window)
 */
export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async (_, thunkAPI) => {
    try {
      const auth = requireAuth();
      const { user } = await signInWithPopup(auth, googleProvider);
      return { user: toUser(user) };
    } catch (err) {
      console.error(err.message);
      return thunkAPI.rejectWithValue(authMessage(err));
    }
  }
);

/*
 * Demo mode: a local user, no request to the API
 */
export const loginDemo = createAsyncThunk("auth/loginDemo", async () => {
  return { user: DEMO_USER, token: DEMO_TOKEN };
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    if (!thunkAPI.getState().auth.isDemo) await signOut(requireAuth());
  } catch (err) {
    console.error(err.message);
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

/*
 * On start: the demo user, or the Firebase session that the SDK has kept in the browser
 */
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    if (thunkAPI.getState().auth.isDemo) return { user: DEMO_USER };

    const auth = getFirebaseAuth();
    if (!auth) return thunkAPI.rejectWithValue("Unable to refresh user");

    await auth.authStateReady();
    const user = auth.currentUser;

    if (!user) return thunkAPI.rejectWithValue("Unable to refresh user");

    if (!user.emailVerified) {
      await signOut(auth);
      return thunkAPI.rejectWithValue("Unable to refresh user");
    }

    return { user: toUser(user) };
  }
);
