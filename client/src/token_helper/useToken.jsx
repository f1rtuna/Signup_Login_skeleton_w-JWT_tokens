// Helper function based off of code from aruq Abdulsalam's article: "How to add authentication to your React application."
// quite ingenious as it utilizes the useState hook to change the token state -> triggereing a re-render of the App component for actions like login logout etc.
// original plan was to implement usereducer() and a global context but this simple mechanism bypasses the need especially for a small app like this.
import { useState } from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function removeToken() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }

}

export default useToken;
