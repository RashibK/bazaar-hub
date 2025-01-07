const Register = () => {
    
    const onSubmit = (event) => {
        event.preventDefault();

    }

  return (
    <div>
        <form onSubmit={onSubmit}>
            <label for='full_name'><input id='full_name' placeholder="Full Name"/></label><br></br>
            <label for='username'><input id='username' placeholder="Username"/></label><br></br>
            <label for='email'><input id='email'placeholder="Email" /></label><br></br>
            <label for='password'><input id='password' placeholder="Password"/></label><br></br>
            <label for='password2'><input id='password2' placeholder="Retype Password"/></label><br></br>
            <button> Register </button>
        </form>
        <p>Already a user? <a href="/login">Click here</a> to login</p>
    </div>
  )
}

export default Register