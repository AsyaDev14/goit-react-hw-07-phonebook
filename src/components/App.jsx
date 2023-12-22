import React, { useEffect } from 'react';
import { ContactForm } from './contactForm/ContactForm'
import { Section } from './section/Section';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsThunk } from '../redux/operations';

const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const loading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const dispatch = useDispatch()
  const checkName = (name) => {
    return contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
  };
  useEffect(() => {
    dispatch(fetchContactsThunk())
  }, [dispatch])

  if (loading) {
    return(<div>loading</div>)
  }
  if (error) {
    return(<div>{error}</div>)
  }
  console.log('contact',contacts);
  return (
    <>
      <Section title='Phonebook'>
        <ContactForm
          checkName={checkName}
        />
      </Section>
      <Section title='Contacts'>
        <Filter />
        <ContactList/>
      </Section>
    </>
  );
}

export default App;
