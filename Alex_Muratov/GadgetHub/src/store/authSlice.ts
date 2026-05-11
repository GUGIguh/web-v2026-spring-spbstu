import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    loading: boolean;
    error: string | null;
    initializing: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    username: null,
    loading: false,
    error: null,
    initializing: true,
};

export const checkAuth = createAsyncThunk("auth/check", async () => {
    const res = await api.get("/me");
    return res.data;
});

export const login = createAsyncThunk(
    "auth/login",
    async (data: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await api.post("/login", data);
            return res.data;
        } catch (err: any) {
            const status = err.response?.status;
            const serverError = err.response?.data?.error;

            if (status === 400) return rejectWithValue(serverError || "Некорректные данные");
            if (status === 401) return rejectWithValue(serverError || "Неверный пароль");
            if (status === 500) return rejectWithValue("Ошибка сервера");
            return rejectWithValue("Не удалось подключиться");
        }
    }
);

export const register = createAsyncThunk(
    "auth/register",
    async (data: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await api.post("/register", data);
            return res.data;
        } catch (err: any) {
            const status = err.response?.status;
            const serverError = err.response?.data?.error;

            if (status === 409) return rejectWithValue(serverError || "Пользователь уже существует");
            if (status === 400) return rejectWithValue(serverError || "Некорректные данные");
            if (status === 500) return rejectWithValue("Ошибка сервера");
            return rejectWithValue("Не удалось подключиться");
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await api.post("/logout");
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkAuth.pending, (state) => {
            state.initializing = true; // на случай повторного вызова вручную
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.initializing = false;
        });
        builder.addCase(checkAuth.rejected, (state) => {
            state.isAuthenticated = false;
            state.username = null;
            state.initializing = false;
        });

        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.username = action.payload.username;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.username = action.payload.username;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        builder.addCase(logout.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.username = null;
            state.error = null;
        });
    },
});

export default authSlice.reducer;