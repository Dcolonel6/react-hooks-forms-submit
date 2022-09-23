import React, { useState } from "react";

function Form(props) {
  const [firstName, setFirstName] = useState("Sylvia");
  const [lastName, setLastName] = useState("Woods");
  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors] = useState([]);

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }
  function validateFormData(formData) {
    if (formData.firstName.length === 0) {
      setErrors(["Provide a first Name"]);
      return false;
    }
    if (formData.lastName.length === 0) {
      setErrors(["Provide a Last Name"]);
      return false;
    }
    if (
      !(/^[a-z']+$/i.test(firstName) && /^[a-z']+$/i.test(lastName))
    ) {
      setErrors(["Please provide names that have alphabets only"]);
      return false;
    }
    setErrors([])
    return true;
  }

  function handleSubmit(evnt) {
    evnt.preventDefault();
    const formData = {
      firstName: firstName,
      lastName: lastName,
    };    
    //validate input
    if (validateFormData(formData)) {
      setFirstName("");
      setLastName("");
      setSubmittedData((currentFormData) => [...currentFormData, formData]);
    }
  }

  const liSubmitted = submittedData.map(({ firstName, lastName }, index) => {
    return (
      <li
        key={`${index}-${firstName}-${lastName}`}
      >{`${firstName} ${lastName}`}</li>
    );
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleFirstNameChange} value={firstName} />
        <input type="text" onChange={handleLastNameChange} value={lastName} />
        <button type="submit">Submit</button>
      </form>
      <h3>Submissions</h3>
      <ul>{liSubmitted}</ul>
      {errors.length ?
        errors.map((error, index) => (
          <p key={`${index}-${error}`} style={{ color: "red" }}>
            {error}
          </p>
        )) : null}
    </>
  );
}

export default Form;
