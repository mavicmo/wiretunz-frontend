import React, {useState} from 'react'

function Login() {
  const [values, setValues] = useState({

      firstName: '',
      lastName: '',
      email: ''
    });
    const [submitted, setSubmitted] = useState(true);
    const [valid, setValid] = useState(false);   

  const handleFirstNameInputChange =(event) => {
    setValues({...values, firstName: event.target.value})
  }
      
  const handleLastNameInputChange =(event) => {
    setValues({...values, lastName: event.target.value})    
  }

  const handleEmailInputChange =(event) => {
    setValues({...values, email: event.target.value})
  }
  const handleSubmit = (event) => { 
    event.preventDefault() 
    if(values.firstName && values.lastName && values.email) {
      setValid(true);
    }
    setSubmitted(true);
    
  }
  return (
    <div className="form-container">
      <form className='Sign-in-form' onSubmit={handleSubmit}></form>
      <h1> WireTunz Sign In</h1>

      {submitted && valid ? <div className='Successful! Start Listening'></div> :null }



      <form className="sign-in"></form>
        <input
        onChange={handleFirstNameInputChange}
        value={values.firstName}
        className= 'form-field'
        placeholder='First Name'
        name='firstName' />
       {submitted && !values.firstName ? <span>Enter First Name</span> :null } 

        <input
        onChange={handleLastNameInputChange}
        value={values.LastName}
        className= 'form-field'
        placeholder='Last Name'
        name='LastName' />
        {submitted && !values.LastName ? <span>Enter Last Name</span> :null}

        <input
        onChange={handleEmailInputChange}
        value={values.email}
        className= 'form-field'
        placeholder='email'
        name='email' />
          {submitted && !values.email ?<span>Enter Email Name</span> :null}
         <button
         className='form-field'
         type='submit'>Sign In</button>
  </div>
  )};


export default Login;
