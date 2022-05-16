import React, { Component, useState, useEffect } from 'react'
import Sidebar from '../../../components/Sidebar'
import { gql, useQuery, useLazyQuery } from "@apollo/client"
import LoadingSvg from '../../../components/LoadingSvg'
import SaranKesan from '../../../components/SaranKesan'

const GetSaran = gql`
query MyQuery {
  pesan {
    id
    email
    nama
    pesan
  }
}`

export default function SaranAdmin() {
  const  {data, loading, error} = useQuery(GetSaran)
  const [saran, setSaran] = useState([]);
  const [email, setEmail] = useState();
  const [nama, setNama] = useState();
  const [pesan, setPesan] = useState();

  if(loading){
    return <LoadingSvg/>
  }

  if(error){
    console.log(error);
    return null;
  }

  const onChangeEmail = (e) => {
    if (e.target) {
      setEmail(e.target.value);
    }
  }

  const onSubmitSaran = (e) => {
    e.preventDefault();
    setSaran((prev) => [...prev, {email, nama, pesan}]);
    setEmail('');
    setNama('');
    setPesan('');
  };

  const onDeleteSaran = (id) => {
    const newSaran = saran.filter((_, i) => i !== id);
    setSaran(newSaran);
  }; 


  return (
    <div>
        <Sidebar />
            <div className='container'>
                <div>
                <div >
                    <div className='p-4'>
                    <h1>Saran dan Masukkan : </h1>
                    <div className='p-1 col-12'>
                        <div>
                        <div className='bg-light rounded-2 shadow'>
                            <table class="table table-striped table-responsive">
                            <thead>
                                <tr>
                                <th scope="col">No. </th>
                                <th scope="col">Email</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Pesan</th>
                                <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {data?.pesan.map((v, i) => (
                                        <SaranKesan
                                            key={i}
                                            id={i}
                                            onDeleteSaran={() => onDeleteSaran(i)}
                                            email={v.email}
                                            nama={v.nama}
                                            pesan={v.pesan}
                                        />
                                    ))}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
