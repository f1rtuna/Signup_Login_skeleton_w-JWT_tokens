import React from 'react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Navbar from './components/Navbar'
import {Routes, Route, Navigate} from 'react-router-dom'
import PrivateSecure from './routes/PrivateSecure'
import useToken from './token_helper/useToken'
import SecurePage from './pages/SecurePage'
import NotFound from './pages/NotFound'

function App() {
  const {token, removeToken, setToken } = useToken();
  return (
    <>
      <Navbar removeToken={removeToken} token={token} />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route exact path="/" element={<LoginPage token={token} setToken={setToken}/>} />
        {/* guard against url attempts of going back to login */}
        <Route element = {<PrivateSecure />}>
          <Route path="/secure" element={<SecurePage token={token} setToken={setToken}/>} />
        </Route>  
        <Route path="/login" element={<LoginPage token={token} setToken={setToken} />} />
        <Route path="/signup" element={<SignupPage token={token} setToken={setToken} />} />
      </Routes>
    </>
  )
}

export default App
