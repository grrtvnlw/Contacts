import React, { useEffect, useState } from "react";
import MaskedInput from "react-text-mask";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(undefined);
  const [formState, setFormState] = useState({
    name: "John Doe",
    email: "john@doe.com",
    phone: "(555) 555-5555",
    address: "123 Wallaby Way",
    city: "Atlanta",
    state: "GA",
    zipcode: "30326",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      editContact();
    } else {
      createContact(formState);
    }
    setFormState({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
    });
  };

  const editContact = () => {
    const updatedContacts = [...contacts];
    updatedContacts[editIndex] = formState;

    setContacts(updatedContacts);
    setIsEdit(false);
  };

  const createContact = (contactInfo) => {
    const updatedContacts = [...contacts];
    updatedContacts.push(contactInfo);

    setContacts(updatedContacts);
  };

  useEffect(() => {
    contacts.length === 0 &&
      setFormState({
        name: "John Doe",
        email: "john@doe.com",
        phone: "(555) 555-5555",
        address: "123 Wallaby Way",
        city: "Atlanta",
        state: "GA",
        zipcode: "30326",
      });
  }, [contacts]);

  return (
    <div className="container">
      <div className="form">
        <h1>Contact Form</h1>
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <MaskedInput
              type="text"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              mask={[
                "(",
                /[1-9]/,
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formState.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formState.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formState.state}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="zipcode">Zip Code</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formState.zipcode}
              onChange={handleChange}
            />
          </div>
          <button type="submit">{isEdit ? `Update` : `Add`}</button>
        </form>
      </div>
      <div className="list">
        <h1>Contacts List</h1>
        {contacts.length > 0 &&
          contacts
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((contactInfo, index) => (
              <ContactCard
                key={index}
                id={index}
                contactInfo={contactInfo}
                formState={formState}
                setFormState={setFormState}
                contacts={contacts}
                setContacts={setContacts}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
              />
            ))}
      </div>
    </div>
  );
};

const ContactCard = ({
  id,
  contactInfo,
  formState,
  setFormState,
  contacts,
  setContacts,
  isEdit,
  setIsEdit,
  editIndex,
  setEditIndex,
}) => {
  const { name, email, phone, address, city, state, zipcode } = contactInfo;

  const [hidden, setHidden] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    setHidden(!hidden);
  };

  const handleEdit = () => {
    setIsEdit(true);
    setEditIndex(id);
    setFormState({
      name,
      email,
      phone,
      address,
      city,
      state,
      zipcode,
    });

    if (isEdit) {
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = formState;

      setContacts(updatedContacts);
      setIsEdit(false);
      setFormState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
      });
    }
  };

  const handleDelete = () => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(id, 1);

    setContacts(updatedContacts);
  };

  return (
    <div className="contactCardContainer">
      <div className="contactCard">
        <h2>{name}</h2>
        <h3>{`${city}, ${state}`}</h3>
        <button onClick={handleClick}>See {hidden ? `More` : `Less`}</button>
        {!hidden && (
          <div>
            <p>{`${email}`}</p>
            <p>{`${phone}`}</p>
            <p>{`${address} ${zipcode}`}</p>
            <div>
              <button className="edit" onClick={handleEdit}>
                {isEdit ? `Update` : `Edit`}
              </button>
              <button className="delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
