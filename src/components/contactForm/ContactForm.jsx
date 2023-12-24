import React, {useState} from "react";
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addContactsThunk } from "../../redux/operations";
import { selectContact } from '../../redux/selectors';

export const ContactForm = () => {
  const contacts = useSelector(selectContact);

  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (event, name) => {
    if (name === 'name') {
      setName(event.target.value)
    } else {
      setNumber(event.target.value)
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (name && number) {
      if (checkName(name)) {
        alert(`${name} already in contact`)
      } else {
        const params = { name, number };

        dispatch(addContactsThunk(params))
        reset()
      }
    }
  }

 const reset = () => {
    setName('');
    setNumber('');
  };

const checkName = (name) => {
    return contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit} >
      <label htmlFor="name">
        <input
          className={css.input}
          value={name}
          onChange={(event)=>handleChange(event, 'name')}
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
      </label>
      <label htmlFor="number">
        <input
          className={css.input}
          value={number}
          onChange={(event)=>handleChange(event, 'number')}
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
      </label>
      <button type="submit" className={css.button_contact} >Add contact</button>
    </form>
  );
};

