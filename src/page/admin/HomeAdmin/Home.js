import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar'
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client"
import LoadingSvg from '../../../components/LoadingSvg';
import DescriptionRute from '../../../components/DescriptionRute';
import Swal from "sweetalert2";

const GetRute = gql`
query MyQuery {
  rute(order_by: {id: asc}) {
    id
    namarute
    nomorangkot
    hargarute
    gambar
  }
}`

const UpdateRute = gql`
mutation MyMutation($id: Int!, $namarute: String!, $nomorangkot: String!, $hargarute: Int!, $gambar: String!) {
  update_rute_by_pk(pk_columns: {id: $id}, _set: {namarute: $namarute, nomorangkot: $nomorangkot, hargarute: $hargarute, gambar: $gambar}) {
    id
  }
}
`

const DeleteRute = gql`
mutation MyMutation($id: Int!) {
  delete_rute_by_pk(id: $id) {
    id
  }
}
`

export default function Home() {
    const {data, loading, error, refetch} = useQuery(GetRute)
    const [updateRute, {loading: loadingUpdate}] = useMutation(UpdateRute);
    const [deleteRute, { loading: loadingDeleteRute }] = useMutation(
      DeleteRute,
      {
        onCompleted: (data) => {
          refetch();
        },
        onError: (error) => {
          console.log("Error in mutation delete", { error });
        },
      }
    );
    const [ruteangkot, setRuteAngkot] = useState();
    const [nomorangkot, setNomorAngkot] = useState();
    const [namarute, setNamaRute] = useState();
    const [hargarute, setHargaRute] = useState();
    const [gambar, setGambar] = useState();
    
    if(loading || loadingUpdate || loadingDeleteRute){
      return <LoadingSvg/>
    }
  
    if(error){
      console.log(error)
      return null
    }
  
    const onChangeNomorAngkot = (e) => {
      if (e.target) {
        setNomorAngkot(e.target.value);
        setNamaRute(e.target.value);
        setHargaRute(e.target.value);
        setGambar(e.target.value);
      }
    }
  
    const onSubmitRute = (e) => {
      e.preventDefault();
      setRuteAngkot((prev) => [...prev, {nomorangkot, namarute, hargarute, gambar}]);
      setNomorAngkot("");
      setNamaRute("");
      setHargaRute("");
      setGambar("");
    };
  
    const onClickItem = (id) => {
      const item = data?.rute.find(v => v.id ===id )
      updateRute({
        variables: {
          id: id,
          nomorangkot : !item.nomorangkot,
          namarute : !item.namarute,
          hargarute : !item.hargarute,
          gambar : !item.gambar
        },
      })
    };

    const onDeleteRute = (idx) => {
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
          deleteRute({
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
              <h1>Tersedia Rute : </h1>
              <div className='p-1 col-12'>
                <div>
                  <div className='bg-light rounded-2 shadow'>
                    <table class="table table-striped ">
                      <thead>
                        <tr>
                          <th className="col">No. </th>
                          <th className="col">No. Angkot</th>
                          <th className="col">Rute Jurusan</th>
                          <th className="col">Tarif</th>
                          <th className="col">Gambar</th>
                          <th className="col px-4">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                      {data?.rute.map((v) => (
                          <DescriptionRute
                          key={v.id}
                          id={v.id}
                          nomorangkot={v.nomorangkot}
                          namarute={v.namarute}
                          hargarute={v.hargarute}
                          gambar = {v.gambar}
                          // onClickItem={() => onClickItem(v.id)}
                          onDeleteRute={() => onDeleteRute(v.id)}
                          />
                      ))}
                      </tbody>
                    </table>

            {/* {loading ? ( <LoadingSvg /> ) : (
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nomor Angkot</th>
                    <th>Rute Jurusan</th>
                    <th>Tarif</th>
                    <th>Gambar</th>
                    <th className="text-center" colSpan={2}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.rute.map((value, valueIdx) => (
                    <tr key={valueIdx}  data-key={value.id}>
                      <td className="text-center">{valueIdx + 1}</td>
                      <td>{value.nomorangkot}</td>
                      <td className="text-center">{value.namarute}</td>
                      <td>{value.hargarute}</td>
                      <td>
                        <img
                          src={value.gambar}
                          style={{width:"110px", height:"150px"}}
                          alt="Wisata Alam"
                        />
                      </td>
                      <td className="text-center">
                        <Link
                          to={`/home/edit-rute/${value.id}`}
                          className="btn btn-outline-primary"
                        >
                          Update
                        </Link>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => onDeleteRute(value.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )} */}


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

