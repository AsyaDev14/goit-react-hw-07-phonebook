import React from "react";
import css from "./ContactList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { deleteContactsThunk } from "../../redux/operations";
import { selectContact, selectFilter } from "../../redux/selectors";

export const ContactList = () => {
  const contacts = useSelector(selectContact);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  
  const contactFilter = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  };

  return (
    <ul className={css.contact_list}>
      {contactFilter().map(({ id, name, number }) => (
        <li className={css.contact_item} key={nanoid()}>
          {name}: {number}
          <button
            type="button"
            className={css.delete_button}
            onClick={() => dispatch(deleteContactsThunk(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

