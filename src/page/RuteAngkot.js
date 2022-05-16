import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DescriptionAbout from '../components/DescriptionAbout';
import Navbar from '../components/Navbar';
import LoadingSvg from '../components/LoadingSvg';
import Footer from '../components/Footer';

import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client"

const GetRute = gql`
query MyQuery {
  rute(order_by: { id: asc }) {
    id
    nomorangkot
    namarute
    hargarute
  }
}`;

const GetRuteByNomorAngkot = gql`
query MyQuery($nomorangkot: String!) {
    rute(where: {nomorangkot: {_ilike: $nomorangkot}}) {
      id
      nomorangkot
      namarute
      hargarute
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
                                    {/* <input class="row form-control me-2" type="search" onChange={onChangeRute}
                                        value={ruteangkot} placeholder="Search" aria-label="Search"/>
                                    <div className='d-flex justify-content-center mt-4 col-lg-12'>
                                        <button className="btn btn-outline-success me-2" onClick={handleSearch}
                                        value={ruteangkot} type="submit">Search<i class="bi bi-search ms-1"></i></button>
                                        <button className="btn btn-outline-danger" type="submit">Reset<i class="bi bi-x ms-1 mt-1"></i> </button>
                                    </div> */}
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
                            <div className="row row-cols-1 row-cols-md-3">
                                {data?.rute.map((value, valueIdx) => (
                                <div className="col mb-4" key={valueIdx}>
                                    <div className="card card-wista">
                                    {/* <img
                                        src={value.gambar}
                                        className="card-img-top img-wisata"
                                        alt="Wisata Alam"
                                    /> */}
                                    <div className="card-body">
                                        <h5 className="card-title">
                                        {/* <Link
                                            to={`/wisata/detailwisata/${value.id}`}
                                            className="link-title-wisata"
                                        >
                                            {value.namarute}
                                        </Link> */}
                                        {value.nomorangkot}
                                        </h5>
                                        <p className="card-text text-justify">
                                        {value.namarute.substr(0, 100)}
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
