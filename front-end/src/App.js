import './css/App.css';
import Home from './components/home';
import {ApiProvider, ApiClient} from './components/apiProvider';
import { decodeToken, isExpired } from "react-jwt";
import React, { useState, useEffect, useRef } from 'react';

function App() {

  const apiClient = new ApiClient(process.env.REACT_APP_API_URL);
  const [token, setToken] = useState(apiClient.token);
  const user = decodeToken(token);
  const tokenExpired = isExpired(token);
    const tokenFetchedRef = useRef(false);


    useEffect(() => {
    if(!tokenFetchedRef.current && (!token || tokenExpired)){
        tokenFetchedRef.current = true;
      apiClient.loginUser(process.env.REACT_APP_TEST_USERNAME, process.env.REACT_APP_TEST_PASSWORD)
      .then(t=>{
        setToken(t);
      });
    }
  });

  if(tokenExpired || !token){
    return <div>Token expired</div>
  }else{
    return(
      <ApiProvider value={apiClient}>    
        <Home user={user}/>
      </ApiProvider>
    );
  }

}


export default App;
