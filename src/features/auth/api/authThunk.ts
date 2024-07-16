import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { isAxiosError } from 'axios';
import { AuthResponse, GlobalError, LoginMutation } from '../model/authTypes';

export const login = createAsyncThunk<
  AuthResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axios.post<AuthResponse>(
      'https://bono-bar.com/auth/users/sessions',
      loginMutation,
    );
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});

export const sendEmail = createAsyncThunk<
  string,
  string,
  { rejectValue: GlobalError }
>('changePassword/sendEmail', async (email, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      'https://bono-bar.com/auth/users/send-otp',
      {
        email,
      },
    );
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});

interface SendOtpPayload {
  email: string;
  otp: string;
}

export const sendOtp = createAsyncThunk<
  string,
  SendOtpPayload,
  { rejectValue: GlobalError }
>('changePassword/sendOtp', async ({ email, otp }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      'https://bono-bar.com/auth/users/compare-otp',
      { email, otp },
    );
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});

interface ChangePasswordData {
  email: string;
  password: string;
}

export const changePassword = createAsyncThunk<
  string,
  ChangePasswordData,
  { rejectValue: GlobalError }
>(
  'changePassword/changePassword',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://bono-bar.com/auth/users/change-password',
        { email, password },
      );
      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  },
);
