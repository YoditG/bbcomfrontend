import {React, useContext} from 'react'
import axios from "axios";
import Cookies from "js-cookie";
import jwt from 'jsonwebtoken';
import UserContext from '../contexts/UserContext'

const APP_NAME = 'bbcom'

if (process.env.NODE_ENV === "development") {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_LOCAL;
  } else {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_HEROKU;
  }

const setAuthHeaders = () => {
  const token = Cookies.get(`${APP_NAME}-auth-token`,{path:'/'});
  //console.log(token)
  if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  //console.log('this is the token in setauthheaders:',axios.defaults.headers.common["Authorization"])
}

const decodeToken = () => {
    const token = Cookies.get(`${APP_NAME}-auth-token`,{path:'/'});
    console.log('token:',token)
    let decodedToken
    try {
      if (token) {
        // The hard way:
        // const base64Url = token.split('.')[1]
        // const base64 = base64Url.replace('-', '+').replace('_', '/')
        // decodedToken = JSON.parse(window.atob(base64))
        // Window.atob ?
        // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/atob
        // Decodes a string of data which has been encoded using Base64 encoding

        // The easy way:
        // https://www.npmjs.com/package/jsonwebtoken#jwtdecodetoken--options
        decodedToken = jwt.decode(token)
      }
    } catch (error) {
      console.log('erroooooooooooooor:',error.message)
    }
    return decodedToken
  }

const login = async (credentials) => {
  
    const { username, password } = credentials
    let data
    try {
        data = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      })
      
      //console.log(data.headers)
      
      const token = data.headers['x-authorization-token'];
      
      //console.log(token)

      if (token) {
          Cookies.set(`${APP_NAME}-auth-token`, token,{path:'/'},{expires: -1});
          window.localStorage.setItem('bbcom-userID',`${data.data.user._id}`)
          setAuthHeaders()
          
      }
    } catch (e) {
      console.log(e.message)
    }
    return data
  }

  const logout = () => {
    Cookies.delete(`${APP_NAME}-auth-token`,{path:'/'});
  }


  const userContext = async () => {
    setAuthHeaders()
    console.log('wesh')
    try {
        const data = await axios.get('/auth/me')
        return data
      } catch (error) {
        console.log(error.message)
        return false
      }
  }

export { 
    axios as client,
    setAuthHeaders,
    login,
    logout,
    userContext,
    decodeToken,
}