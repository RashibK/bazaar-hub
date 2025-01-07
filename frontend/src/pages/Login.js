const Login = () => {

    const onSubmit = (event) => {
        event.preventDefault();
    }
    return (

    <div><form onSubmit={onSubmit}>       
    <label for='email'><input id='email'placeholder="Email" name='email' /></label><br></br>
    <label for='password'><input id='password' placeholder="Password" name='password' /></label><br></br>
    <button> Login </button>
</form>
<p>New here? <a href="/register">Click here</a> to register</p>
</div>
  )
}

export default Login