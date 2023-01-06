import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { handleUserLoginRedux } from '../redux/slice/userSlice';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [typePassword, setTypePassword] = useState('password');
    const {isLoading, auth} =  useSelector((state) => state.users);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem('token');
        // console.log(token)
        if(token){
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if(auth){
            navigate('/');
        }
    }, [auth]);

    const handleLogin = async () => {
        if(!email || !password) {
            console.log('Email/Password is required!');
            return;
        }

        dispatch(handleUserLoginRedux(email, password));

    }


    const handleKeyPress = (event) => {
        if(event && event.key === 'Enter'){
          handleLogin();
        }
      }
    
      const handleGoBack = () => {
        navigate('/');
      }

    return (
        <div className="login-container col-12 col-sm-4">
            <div className="title">Log in</div>
            <div className="text">Email or UserName (eve.holt@reqres.in)</div>
            <input 
                placeholder="Email or username"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
            />
            <div className="password">
                <input 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    type={typePassword}
                    onKeyPress={(e) => handleKeyPress(e)}
                />

                {
                    typePassword === 'password' ? 
                    <i className="fa-solid fa-eye-slash eye" onClick={() => setTypePassword('text')}></i> : 
                    <i className="fa-solid fa-eye eye" onClick={() => setTypePassword('password')}></i>
                }
            </div>
            <button 
                className={email && password && 'active'} 
                onClick={() => handleLogin()}
            >
                {isLoading && <i className="fas fa-spinner fa-spin"></i>}
                &nbsp;Login
            </button>
            <div className="go-back">
                <i className="fa-solid fa-angle-left"></i>
                <span style={{marginLeft: '5px'}} onClick={() => handleGoBack()}>Go back</span>
            </div>
        </div>
    );
}

export default Login;