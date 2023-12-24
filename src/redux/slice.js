import { createSlice } from '@reduxjs/toolkit';
import { fetchContactsThunk, deleteContactsThunk, addContactsThunk } from './operations';

// const initialContacts = {
//   contacts: [],
//   isLoading: false,
//   error: ''
// };

const initialContacts = {
  contacts: {
    items: [],
    isLoading: false,
    error: null
  },
  filter: ""
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {
    updateFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // fulfiled
      .addCase(
        fetchContactsThunk.fulfilled,
        (state, { payload }) => {
          state.contacts.items = payload;
          state.contacts.isLoading = false;
        })
      .addCase(deleteContactsThunk.fulfilled,
        (state, { payload }) => {
          state.contacts.items = state.contacts.items.filter((contact) => contact.id !== payload.id)
        })
      .addCase(addContactsThunk.fulfilled,
        (state, { payload }) => {
          state.contacts.items.push(payload);
          state.contacts.isLoading = false;
        }
      )
      // pending
      .addCase(fetchContactsThunk.pending, state => {
        state.contacts.isLoading = true;
      })
      //rejected
      .addCase(fetchContactsThunk.rejected, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.error = payload;
      })
  }
});



export const { updateFilter } = contactsSlice.actions;


