import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DescriptionAbout from '../../components/DescriptionAbout';
import Navbar from '../../components/Navbar';
import LoadingSvg from '../../components/LoadingSvg';
import Footer from '../../components/Footer';

import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client"

const GetRute = gql`
query MyQuery {
  rute(order_by: { id: asc }) {
    id
    nomorangkot
    namarute
    hargarute
    gambar
  }
}`;

const GetRuteByNomorAngkot = gql`
query MyQuery($nomorangkot: String!) {
    rute(where: {nomorangkot: {_ilike: $nomorangkot}}) {
      id
      nomorangkot
      namarute
      hargarute
      gambar
    }
  }`;

const RuteAngkot = () => {
  const {data, loading, error, refetch} = useQuery(GetRute)
    const [getNomorAngkot, { data: dataByRute, loading: loadingNomorAngkot}] = useLazyQuery(GetRuteByNomorAngkot, {
        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },});
    
    const [ruteangkot, setRuteAngkot] = useState("");

    const [isInitialQuery, setInitialQuery] = useState(true);
  
    const onChangeRute = (e) => {
      if (e.target) {
        setRuteAngkot(e.target.value);
      }
    };
  
    const handleSearch = (e) => {
      e.preventDefault();
      if (ruteangkot === "") {
        setInitialQuery(true);
      } else {
        setInitialQuery(false);
        getNomorAngkot({ variables: { nomorangkot: `%${ruteangkot}%` } });
      }
    };
  
    useEffect(() => {
      console.log("ini loading", loading);
    }, [loading]);
  
    useEffect(() => {
      console.log("ini loadingNomorAngkot", loadingNomorAngkot);
    }, [loadingNomorAngkot]);
  
    useEffect(() => {
      console.log("ini isInitialQuery", isInitialQuery);
    }, [isInitialQuery]);
  return (
    <div>
    <Navbar />
      <div className="container-fluid" style={{ marginTop: "7rem"}}>
        <div className="row">
          <div className="col-12">
            <DescriptionAbout
              title="Angkutan Kota Bogor"
              // text="Angkot atau Angkutan Kota di Kota Bogor ialah transportasi umum untuk publik dengan rute yang sudah ditentukan."
            />
          </div>
                  <div className="container">
                    <div className="row" style={{marginTop: "0.5rem"}}>                   
                        <div className="col-lg-12">
                            <div className="App">
                                <p style={{ fontFamily:"'Poppins', sans-serif"}}>
                                    <h3 className="font-weight-light">
                                        Masukkan Nomor Angkot :
                                    </h3>
                                </p>
                            </div>

                            {/* search */}
                            <div class="container-fluid">
                                <div class="col-md-6 col-lg-6 mx-auto">
                                  <div className="section-section mb-4">
                                      <div className="row justify-content-center">
                                          <div className="col-md-3">
                                              <input
                                              onChange={onChangeRute}
                                              value={ruteangkot}
                                              autoFocus
                                              type="text"
                                              className="form-control searchbyname-input"
                                              />
                                          </div>
                                          <div className="col-md-2">
                                              <button
                                              type="submit"
                                              className="btn btn-outline-success btn-search"
                                              onClick={handleSearch}
                                              >
                                              Search
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* list angkot */}
                  <div className='container-fluid' style={{marginTop: "50px"}}>
                    <div className="py-4 px-4" >
                        <p style={{fontSize:"30px", fontFamily:"'Poppins', sans-serif"}}>
                            <span className="font-weight-light">
                                List Angkutan Perkotaan : 
                            </span>
                        </p>
                        {loading || loadingNomorAngkot ? ( <LoadingSvg /> ) : isInitialQuery ? (
                            <>
                            <div className="row row-cols-1 row-cols-md-3 ms-5">
                                {data?.rute.map((value, valueIdx) => (
                                <div className="col mb-4" key={valueIdx}>
                                    <div className="card card-wista shadow" style={{width:"60%", height:"100%"}}>
                                    <img
                                        src={value.gambar}
                                        className="card-img-top"
                                        alt="Angkutan Kota"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                        {value.nomorangkot}
                                        </h5>
                                        <p className="card-text text-justify">
                                        {value.namarute.substr(0, 100)}
                                        <br />
                                        Rp.{value.hargarute}
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                            </>
                        ) : (
                            <>
                            {dataByRute?.rute.length === 0 ? (
                                <div>
                                    <h1>Data Tidak Ditemukan</h1>
                                </div>
                            ) : (
                                <div className="row row-cols-1 row-cols-md-3">
                                {dataByRute?.rute.map((value) => (
                                    <div className="col mb-4" key={value.id}>
                                        <div className="card card-wista">
                                            
                                            <div className="card-body">
                                            <h5 className="card-title">
                                                
                                                {value.nomorangkot}
                                            </h5>
                                            <p className="card-text text-justify">
                                                {value.namarute.substr(0, 100)}
                                            </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                                )}
                                </div>
                            )}
                            </>
                        )}
                    </div> 
                </div>
                              
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default RuteAngkot;
