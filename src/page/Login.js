import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { gql, useQuery, useLazyQuery } from "@apollo/client"
import Cookies from 'universal-cookie';

const GetAuthByUserId = gql`
query MyQuery($_eq: String , $_eq1: String ) {
    auth(where: {nama: {_eq: $_eq}, password: {_eq: $_eq1}}) {
      id
      nama
      username
      password
    }
  }
`;

export default function Login() {
    const [nama, setNama] = useState("");
    const [password, setPassword] = useState("");
    const [getAuth, { data, loading, error}] = useLazyQuery(GetAuthByUserId);
    let navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
      if (data?.auth.length === 1) {
        console.log("data", data);
        cookies.set("auth", true, {path: "/login"});
        return navigate("/home");
      }
    }, [data]);

    const handleChangeName = (e) => {
        setNama(e.target.value);
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const login = () => {
      getAuth({ variables: { _eq: nama, _eq1: password } });
    };
    // if (loading){
    //   return <h1>Loading</h1>
    // }
    console.log(nama + " " + password);

  return (
    <div className='App'>
    <div className="container">
      <div className='col-lg-12'>
      <div className="row justify-content-center" style={{marginTop:"60px"}}>
          <div className="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3 shadow p-3 mb-5 bg-body rounded">
            <fieldset>
              <h2 className='text-dark'>Please Sign In</h2>
              <hr className="colorgraph"/>
              <div className="form-group">
                  <input type="text" name="nama" id="nama" className="form-control input-lg" placeholder="Input Name" onChange={handleChangeName}/>
              </div>
              <div className="form-group mt-2">
                <input type="password" name="password" id="password" className="form-control input-lg" placeholder="Password" onChange={handleChangePassword}/>
              </div>
              
              <hr className="colorgraph"/>
              <div className="row">
              {data && <h3>Gagal</h3>}
                <div className="col-xs-4 col-sm-6 col-md-6">
                  <input type="submit" className="btn btn-lg btn-success btn-block" value="Sign In" onClick={login}/>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6">
                  <Link to="/" >
                    <input className="btn btn-lg btn-secondary btn-block col-4" value="Back"/>
                  </Link> 
                </div>
              </div>
            </fieldset>
        </div>
      </div>
      </div>
    </div>
    
{/* <br/>
        <input type="text" onChange={handleChangeName} />
        <input type="password" onChange={handleChangePassword} />
        
        {data && <h3>Gagal</h3>}

        <button onClick={login}>Submit</button> */}
        
        
    </div>
  )
}
