import { useState ,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { register,reset } from "../feature/login/loginSlice";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";



export default function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const { name, email, password, password2 } = formData;

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e){
    if(password!=password2){
      toast.error('passwords do not match');
    }
    console.log(formData);
    const userData = {
      name,
      email,
      password,
    }

    dispatch(register(userData))
    e.preventDefault();
  }

  const renderForm = (
    <div className="wrapper">

      <div className="text-center mt-4 name">
        Register<br></br>Create a new Account
      </div>



      <form class="login" >
        <div class="login__field">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
          <input type="text" class="login__input" placeholder="Username" name="name" value={name} onChange={handleChange} required />
          {/* {renderErrorMessage("uname")} */}
        </div>
        <div class="login__field">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
          <input type="text" class="login__input" placeholder="Email" name="email" value={email} onChange={handleChange} required />
          {/* {renderErrorMessage("uname")} */}
        </div>
        <div class="login__field">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          </svg>
          <input type="password" class="login__input" placeholder="Password" name="password" value={password} onChange={handleChange} required />
          {/* {renderErrorMessage("pass")} */}
        </div>
        <div class="login__field">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          </svg>
          <input type="password" class="login__input" placeholder="Confirm Password" name="password2" value={password2} onChange={handleChange} required />
          {/* {renderErrorMessage("pass")} */}
        </div>
        <button className="btn mt-3" onClick={handleSubmit}>Register</button>
      </form>
    </div>
  );

  return (
    <div className="app">

      {renderForm}

    </div>
  );
}