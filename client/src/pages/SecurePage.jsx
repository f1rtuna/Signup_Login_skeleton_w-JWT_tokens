import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

export default function SecurePage({token, setToken}) {

  const navigate = useNavigate();

  const [secureMessage, setSecureMessage] = useState('');
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/congrats',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const status = response.status;
      const message = response.data.message;
      setSecureMessage(message);
    })
    .catch(error => {
      console.log(error)
    });
  }, []);

  return (
    <div className='h-[90vh] w-full flex justify-center items-center font-oswald text-[2.5rem]'>
        {secureMessage}
    </div>
  )
}
