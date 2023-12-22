import { createSlice } from '@reduxjs/toolkit';

const initialContacts = {
  contacts: [],
  isLoading: false,
  error: ''

};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
      state.isLoading = false;
    },
    deleteContact(state, action) {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
      state.isLoading = false;
    },
    fetchingData(state, action) {
      state.contacts = action.payload;
      state.isLoading = false;
    },
    isPending(state, action) {
      state.error = '';
      state.isLoading = true;
    },
    isError(state, action) {
      state.error = action.payload;
      console.log('for err',  action.payload);
      state.isLoading = false;
    },
  },
});

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    updateFilter(state, action) {
      return action.payload;
    },
  },
});

export const { addContact, deleteContact, fetchingData, isPending, isError } = contactsSlice.actions;
export const { updateFilter } = filterSlice.actions;
