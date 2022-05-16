import React from 'react'
import { Route, Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
        <div className="mt-1">
        {/* <!-- Footer --> */}
            <footer className="text-center text-lg-start text-white" style={{backgroundColor: "#3e4551"}} >
                {/* <!-- Grid container --> */}
                <div className="container p-4 pb-0">
                    {/* <hr className="mb-4" /> */}
                        <section className="">
                            <p className="d-flex justify-content-center align-items-center">
                                <span className="me-3">Cari Rute Angkutan Perkotaan Kota Bogor</span>
                            </p>
                        </section>
                    <hr className="mb-4" />
                </div>
                <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>© 2022 Copyright :
                    <a className="text-white" href="https://github.com/AbdMuafa13"> github.com/AbdMuafa13</a>
                </div>
            </footer>
        </div>
    </> 
  )
}
