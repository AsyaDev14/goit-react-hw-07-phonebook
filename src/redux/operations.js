import axios from "axios";
// import { createAsyncThunk,  } from '@reduxjs/toolkit';
import { fetchingData, isError, isPending, deleteContact, addContact } from "./slice";
// here is asynchrone actions /thunk + api
// mock api endpoint:
// https://6585af9d022766bcb8c927c2.mockapi.io/contacts

// defaults for all axios in project => global
axios.defaults.baseURL = 'https://6585af9d022766bcb8c927c2.mockapi.io';

export const fetchContactsThunk = () => async dispatch => {
  try {
    dispatch(isPending())
    const res = await axios.get('contacts');
    dispatch(fetchingData(res.data))
  } catch (error) {
    dispatch(isError(error.message))
  }
};

export const deleteContactsThunk = (id) => async dispatch => {
  try {
    dispatch(isPending())
    await axios.delete(`contacts/${id}`);
    dispatch(deleteContact(id))
  } catch (error) {
    dispatch(isError(error.message))
  }
};

export const addContactsThunk = (params) => async dispatch => {

  try {
    dispatch(isPending())
    const res = await axios.post(`contacts`, params);
    console.log('res',res);
    dispatch(addContact(res.data))
  } catch (error) {
    dispatch(isError(error.message))
  }
};

// request on back for asynchrone actions
// export const fetchContactsThunk = createAsyncThunk(
//   'contacts/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await axios.get('contacts');
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const addContactThunk = createAsyncThunk(
//   'contacts/addContact',
//   async ({ name, number }, thunkAPI) => {
//     try {
//       const { data } = await axios.post('contacts', { name, phone: number });
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteContactsThunk = createAsyncThunk(
//   'contacts/deleteContact',
//   async (id, thunkAPI) => {
//     try {
//       const { data } = await axios.delete(`contacts/${id}`);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );