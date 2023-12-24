import axios from "axios";
import { createAsyncThunk, } from '@reduxjs/toolkit';
// import { fetchingData, isError, isPending, deleteContact, addContact } from "./slice";
// here is asynchrone actions /thunk + api
// mock api endpoint:
// https://6585af9d022766bcb8c927c2.mockapi.io/contacts

// defaults for all axios in project => global
axios.defaults.baseURL = 'https://6585af9d022766bcb8c927c2.mockapi.io';

// request on back for asynchrone actions
export const fetchContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('contacts');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// delete contacts
export const deleteContactsThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`contacts/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// add contacts
export const addContactsThunk = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const { data } = await axios.post('contacts', { name, number });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);






