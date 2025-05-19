import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";

interface UserState {
  user: {
    id: string | null;
    email: string | null;
    username: string | null;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const signUpWithEmail = createAsyncThunk(
  "user/signUpWithEmail",
  async (
    { email, username }: { email: string; username: string },
    { rejectWithValue }
  ) => {
    try {
      // First check if username is already taken
      const { data: existingUsers, error: checkError } = await supabase
        .from("profile")
        .select("username")
        .eq("username", username)
        .single();

      if (existingUsers) {
        return rejectWithValue("Username already taken");
      }

      // Sign up with email OTP
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
      // Return the email and username for later use when verifying
      return { email, username };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to sign up");
    }
  }
);

export const verifyOtpLogin = createAsyncThunk(
  "user/verifyOtpLogin",
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      // Verify the OTP
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email", // or 'sms' if you use SMS OTP
      });

      if (error) throw error;

      if (data?.user) {
        // Get the user profile with username
        const { data: profile, error: profileError } = await supabase
          .from("profile")
          .select("username")
          .eq("id", data.user.id)
          .single();

        if (profileError && profileError.code !== "PGRST116") {
          // PGRST116 means no rows found, which is okay if profile not mandatory at login
          throw profileError;
        }

        return {
          id: data.user.id,
          email: data.user.email,
          username: profile?.username || null, // Handle case where profile might not exist yet or username is not set
        };
      }

      return rejectWithValue("Login verification failed");
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to verify OTP for login");
    }
  }
);

export const verifyOtpSignup = createAsyncThunk(
  "user/verifyOtpSignup",
  async (
    { email, otp, username }: { email: string; otp: string; username: string },
    { rejectWithValue }
  ) => {
    try {
      // Verify the OTP
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email", // or 'sms' if you use SMS OTP
      });

      if (error) throw error;

      if (data?.user) {
        const { error: profileError } = await supabase.from("profile").insert([
          {
            id: data.user.id,
            username,
          },
        ]);

        if (profileError) throw profileError;

        return {
          id: data.user.id,
          email: data.user.email,
          username,
        };
      }

      return rejectWithValue("Signup verification failed");
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to verify OTP for signup"
      );
    }
  }
);

export const signInWithEmail = createAsyncThunk(
  "user/signInWithEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) throw error;
      return email;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to sign in");
    }
  }
);

export const signOut = createAsyncThunk(
  "user/signOut",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to sign out");
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (!session?.user) return null;

      // Get the user profile with username
      const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("username")
        .eq("id", session.user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") throw profileError;

      return {
        id: session.user.id,
        email: session.user.email,
        username: profile?.username || null,
      };
    } catch (error: any) {
      await supabase.auth.signOut();
      return rejectWithValue(error.message || "Failed to get current user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Sign up
    builder
      .addCase(signUpWithEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpWithEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Verify OTP Login
      .addCase(verifyOtpLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        verifyOtpLogin.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      )
      .addCase(verifyOtpLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Verify OTP Signup
      .addCase(verifyOtpSignup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        verifyOtpSignup.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      )
      .addCase(verifyOtpSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Sign in
      .addCase(signInWithEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInWithEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Sign out
      .addCase(signOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isAuthenticated = !!action.payload;
          state.user = action.payload;
        }
      )
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false; // Explicitly set to false on rejection
        state.user = null; // Clear user data on rejection
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
