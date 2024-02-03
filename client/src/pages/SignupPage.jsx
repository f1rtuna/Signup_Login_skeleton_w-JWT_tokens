import React, {useState, useEffect} from 'react'
import signUpImg from '../assets/signup.jpg'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

export default function SignupPage({token, setToken}) {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userNameExists, setUserNameExists] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim().length === 0) {
            setUsernameError(true);
        }
        if (password.trim().length === 0) {
            setPasswordError(true);
        }
        else {
            axios.post('http://127.0.0.1:5000/signup', { username, password })
            .then(response => {
                navigate('/login', { state: { signedUp: true } })
            })
            .catch(error => {
                const status = error.response.status;
                console.log(error.response.data.error)
                console.log(error.response.status)
                if (status === 400){
                    setUserNameExists(true);
                }
            });
        }
    }

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        if (value.trim().length > 0) {
            setUsernameError(false);
        }
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (value.trim().length > 0) {
            setPasswordError(false);
        }
    }

    // prevent logged in user from accessing sign-up page
    useEffect(() => {
        if (token) {
            navigate('/secure', { replace: true });
        }
    }, [token, navigate]);

    return (
        <div className="w-full h-[90vh] bg-slate-200 flex justify-center items-center font-oswald">
            {userNameExists && (
                <div className="flex justify-center items-center text-[1.2rem] text-white mb-4 absolute top-[11%] right-[10%] w-[26%] h-[5%] p-2 bg-red-500 rounded-xl shadow-lg">
                    Looks like that username is already taken, if this is your username please log in
                </div>
            )}
            <div className="w-[70%] h-[85%] bg-slate-50 flex flex-col justify-center items-center rounded-3xl shadow-2xl">
                <div className="w-full h-[25%] flex flex-col justify-center items-center">
                    <div className="text-[2.5rem] text-slate-700">
                        Challenge 3 SIGNUP PAGE
                    </div>
                    <div className="text-[1.2rem] italic text-center text-slate-500">
                        Hello Visitor looks like you haven't signed up yet. You need to log in first to be granted a <span className='text-red-500'>token</span>. <br></br>
                        Once you have a <span className='text-red-500'>token</span> you can access the "secure" page.
                    </div>
                </div>
                <form className="flex gap-5 w-full h-[75%]" onSubmit={handleSubmit}>
                    <div className="w-[50%] py-[2%] px-[1%] bg-zinc-50 flex flex-col justify-center items-center">
                        <img src={signUpImg} alt="loginImg" className="w-full h-full object-cover"/>
                    </div>
                    <div className="w-[50%] h-full flex flex-col justify-center bg-zinc-50 px-[5%] gap-5 text-[1.8rem] text-slate-700">
                        <label className="flex flex-col">
                            Username:
                            <input type="text" value={username} onChange={handleUsernameChange} className='shadow-lg'/>
                            {usernameError && <p className='text-[1rem] text-red-500'>please fill in username before submitting</p>}
                        </label>
                        <label className="flex flex-col">
                            Password
                            <input type="password" value={password} onChange={handlePasswordChange} className='shadow-lg'/>
                            {passwordError && <p className='text-[1rem] text-red-500'>please fill in password before submitting</p>}
                        </label>
                        <div className="w-[100%] flex flex-col items-center">
                            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 rounded-full px-3 py-3 text-white shadow-lg">Sign-Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
