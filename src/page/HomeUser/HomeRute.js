import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

// Images
import Image1 from "../../assets/images/ANGKOT/banner_wisata/lawangsurken.png";
import Image2 from "../../assets/images/ANGKOT/banner_wisata/grandgarden.png";
import Image3 from "../../assets/images/ANGKOT/banner_wisata/airmancur.png";

import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client"
import LoadingSvg from '../../components/LoadingSvg';
import { Link } from 'react-router-dom';

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

export default function HomeRute() {
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
                {/* Hero Section */}
                <div className="hero-section">
                    <section className="carousel-section">
                    <div className="row">
                        <div className="col-12 col-lg-12">
                        <div
                            id="carouselExampleCaptions"
                            className="carousel slide"
                            data-bs-ride="carousel"
                        >
                            <div className="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="0"
                                className="active"
                                aria-current="true"
                                aria-label="Slide 1"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"
                            ></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"
                            ></button>
                            </div>
                            <div className="carousel-inner">
                            <div className="carousel-item customCarousel active">
                                <img src={Image1} className="d-block w-100" alt="slide-1" />
                                <div className="carousel-caption d-none d-md-block">
                                <h5 className="main-title-carousel">Wilujeng Sumping Sadayana!</h5>
                                <p className="description-title-carousel">
                                    Selamat Datang Semuanya!
                                </p>
                                </div>
                            </div>
                            <div className="carousel-item customCarousel">
                                <img src={Image2} className="d-block w-100" alt="slide-2" />
                                <div className="carousel-caption d-none d-md-block">
                                <h5 className="main-title-carousel">Wilujeng Sumping Sadayana!</h5>
                                <p className="description-title-carousel">
                                    Selamat Datang Semuanya!
                                </p>
                                </div>
                            </div>
                            <div className="carousel-item customCarousel">
                                <img src={Image3} className="d-block w-100" alt="slide-3" />
                                <div className="carousel-caption d-none d-md-block">
                                <h5 className="main-title-carousel">Wilujeng Sumping Sadayana!</h5>
                                <p className="description-title-carousel">
                                    Selamat Datang Semuanya!
                                </p>
                                </div>
                            </div>
                            </div>
                            <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev"
                            >
                            <span
                                className="carousel-control-prev-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next"
                            >
                            <span
                                className="carousel-control-next-icon"
                                aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        </div>
                    </div>
                    </section>
                </div>
                {/* End od Hero Section */}

                <div className="container">
                    <div className="row" style={{marginTop: "20px"}}>                   
                        <div className="col-lg-12 mt-4">
                            <div className="App">
                                <p style={{ fontFamily:"'Poppins', sans-serif"}}>
                                    <h3 className="font-weight-light">
                                        Cari Rute :
                                    </h3>
                                </p>
                            </div>
                            <div class="container-fluid">
                                <div class="col-md-6 col-lg-4 mx-auto">
                                    <input class="form-control me-2" type="search" onChange={onChangeRute}
                                        value={ruteangkot} placeholder="Search" aria-label="Search"/>
                                    <div className='d-flex justify-content-center mt-4 col-lg-12'>
                                        <button className="btn btn-outline-success me-2" onClick={handleSearch}
                                        value={ruteangkot} type="submit">Search<i class="bi bi-search ms-1"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* list angkot */}
                <div className='container-fluid' style={{backgroundColor: "#eee", width: "auto", marginTop: "50px"}}>
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
                                        <div className="card card-wisata">
                                        {/* <img
                                            src={value.gambar}
                                            className="card-img-top img-wisata"
                                            alt="Wisata Alam"
                                        /> */}
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
                <Footer/>
            </div>
        );
    }
