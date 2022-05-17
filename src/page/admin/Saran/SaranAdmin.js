import React, { Component, useState, useEffect } from 'react'
import Sidebar from '../../../components/Sidebar'
import { gql, useQuery, useMutation } from "@apollo/client"
import LoadingSvg from '../../../components/LoadingSvg'
import SaranKesan from '../../../components/SaranKesan'
import Swal from "sweetalert2";

const GetSaran = gql`
query MyQuery {
  pesan(order_by: {id: asc}) {
    id
    email
    nama
    pesan
  }
}`

const DeleteSaran = gql`
mutation MyMutation($id: Int!) {
  delete_pesan_by_pk(id: $id) {
    id
  }
}
`

export default function SaranAdmin() {
  const  {data, loading, error, refetch} = useQuery(GetSaran)
  const [deleteSaran, { loading: loadingDeleteSaran }] = useMutation(
    DeleteSaran,
    {
      onCompleted: (data) => {
        refetch();
      },
      onError: (error) => {
        console.log("Error in mutation delete", { error });
      },
    }
  );
  const [saran, setSaran] = useState([]);
  const [email, setEmail] = useState();
  const [nama, setNama] = useState();
  const [pesan, setPesan] = useState();

  if(loading || loadingDeleteSaran){
    return <LoadingSvg/>
  }

  if(error){
    console.log(error);
    return null;
  }

  const onDeleteSaran = (idx) => {
    Swal.fire({
      title: "Yakin hapus data ini?",
      text: "Kamu tidak dapat mengembalikan data yang telah dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSaran({
          variables: {
            id: idx,
          },
        });
        Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
      } else {
        Swal.fire("Batal", "Data batal dihapus", "error");
      }
    });
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
                                    {data?.pesan.map((v) => (
                                        <SaranKesan
                                            key={v.id}
                                            id={v.id}
                                            onDeleteSaran={() => onDeleteSaran(v.id)}
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
