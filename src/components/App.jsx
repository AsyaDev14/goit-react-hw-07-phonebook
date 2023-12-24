import React, { useEffect } from 'react';
import { ContactForm } from './contactForm/ContactForm'
import { Section } from './section/Section';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsThunk } from '../redux/operations';
import { selectError, selectLoading } from '../redux/selectors';

const App = () => {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchContactsThunk())
  }, [dispatch])


  if (error) {
    return (<div>{error}</div>)
  }
  return (
    <>
      <Section title='Phonebook'>
        <ContactForm />
      </Section>
      <Section title='Contacts'>
        <Filter />
        {loading
          ? <div className='loading'>loading</div>
          : <ContactList />
        }
      </Section>
    </>
  );
}

export default App;
