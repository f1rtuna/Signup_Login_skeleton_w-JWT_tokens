import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import f1rtuna_logo from "../assets/logo2(1).png"

export default function Navbar({token, removeToken}) {
    const navigate = useNavigate();
    function clearToken() {
        removeToken()
        // additional function to call logout endpoint
        axios
            .post('http://127.0.0.1:5000/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                navigate('/login');
            })
            .catch((err) => {
                console.log('error from logout: ', err)
            })
    }

    return (
        <div className='w-full h-[10vh] bg-black text-white flex justify-around items-center px-[2%] py-[2%] text-[1.5rem] font-oswald'>
            <div className="w-[25%]">
                <img src={f1rtuna_logo} alt="cipher_log" className="w-[22%]"/>
            </div>
            <div className="text-[3rem]">
                Example Header
            </div>
            {/* need to conditionally render whether logout is seen or login/sign up */}
            {token ? (
                <div className="w-[25%]">
                    <ul className='flex justify-center cursor-pointer'>
                        <li onClick={clearToken}>Logout</li>
                    </ul>
                </div>
            ) : (
                <div className="w-[25%]">
                    <ul className='flex justify-center gap-20'>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign-Up</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
  )
}
