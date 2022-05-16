import React, { Component, useState, useEffect } from 'react'
import Sidebar from '../../../components/Sidebar'
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client"
import LoadingSvg from '../../../components/LoadingSvg'
import Swal from "sweetalert2";

const GetRute = gql`
query MyQuery {
  rute(order_by: {id: desc}) {
    id
    nomorangkot
    namarute
    hargarute
  }
}
`

const InsertRute = gql`
mutation MyMutation($object: rute_insert_input!) {
  insert_rute_one(object: $object) {
    id
    nomorangkot
    namarute
    hargarute
  }
}
`


export default function TambahRute() {
  const {data, loading, error} = useQuery(GetRute)
  // const [UpdateRute, {loading: loadingUpdate}] = useMutation(UpdateRute);
  const [ruteangkot, setRuteAngkot] = useState();
  const [nomorangkot, setNomorAngkot] = useState();
  const [namarute, setNamaRute] = useState();
  const [hargarute, setHargaRute] = useState();
  
  const [insertPesan, { loading: loadingInsert }] = useMutation(
    InsertRute,
    {
      refetchQueries: [GetRute], onCompleted: (data) => {
        Swal.fire({
          title: "Sukses!",
          text: "Data Berhasil Disimpan",
          icon: "success",
        });
      },
    }
  );

  const [inputs, setInputs] = useState({
    nomorangkot: "",
    namarute: "",
    hargarute: "",
  });

  const handleInput = (value, key) => {
    const newInputs = { ...inputs };
    newInputs[key] = value;
    console.log(newInputs[key]);
    setInputs(newInputs);
    console.log(newInputs);
  };

  const onSubmitRute = (e) => {
    e.preventDefault();

    insertPesan({
      variables: {
        object: {
          nomorangkot: inputs.nomorangkot,
          namarute: inputs.namarute,
          hargarute: inputs.hargarute,
        },
      },
    });

    setInputs({
      nomorangkot: "",
      namarute: "",
      hargarute: "",
    });
  };

  // if(loading){
  //   return <LoadingSvg/>
  // }

  // if(error){
  //   console.log(error)
  //   return null
  // }

  // const onChangeNomorAngkot = (e) => {
  //   if (e.target) {
  //     setNomorAngkot(e.target.value);
  //     setNamaRute(e.target.value);
  //     setHargaRute(e.target.value);
  //   }
  // }

  // const onSubmitRute = (e) => {
  //   e.preventDefault();
  //   setRuteAngkot((prev) => [...prev, {nomorangkot, namarute, hargarute}]);
  //   setNomorAngkot("");
  //   setNamaRute("");
  //   setHargaRute("");
  // };

  // const onClickItem = (id) => {
  //   const newRuteAngkot = [...ruteangkot];
  //   newRuteAngkot[id].checked = !newRuteAngkot[id].checked;
  //   setRuteAngkot(newRuteAngkot);
  // }
    
  // const onDeleteRute = (id) => {
  //   const newRuteAngkot = ruteangkot.filter((_, i) => i !== id);
  //   setRuteAngkot(newRuteAngkot);
  // }; 

    return (
      <div>
          <Sidebar />
            <div className='container'>
                <div>
                <div >
                    <div className='p-4'>
                    <h1>Tambah Rute : </h1>
                    <div className="container-fluid">
                        <div className="row">
                        {/* <div className="col-12 pt-5">
                            <DescriptionAbout title="Saran" />
                        </div> */}
                        <div className='col-12 mt-2'>
                            <div className="row justify-content-center">
                            <div className="col-xs-12 col-sm-8 col-md-8 col-sm-offset-2 col-md-offset-3 shadow p-3 mb-5 bg-body rounded">
                            <form onSubmit={onSubmitRute}>
                                <div class="row mb-3">
                                    <label for="nomorangkot" class="col-sm-2 col-form-label">No. Rute : </label>
                                    <div class="col-sm-10">
                                    <input type="text" class="form-control" id="nomorangkot" name='nomorangkot' value={inputs.nomorangkot} onChange={(e) => handleInput(e.target.value, e.target.name) } />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Jurusan : </label>
                                    <div class="form-floating col-sm-10">
                                    <textarea class="form-control" placeholder="Leave a comment here" name='namarute' value={inputs.namarute} onChange={(e) => handleInput(e.target.value, e.target.name) } id="floatingTextarea2" style={{height: "100px"}}></textarea>
                                    <label for="floatingTextarea2" className='ps-4 text-secondary'>Jurusan</label>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Harga : </label>
                                    <div class="d-flex col-sm-3">
                                    <label for="inputEmail3" class=" col-sm-3 col-form-label">Rp. </label>
                                    <input type="number" class="form-control" id="inputEmail3" name='hargarute' value={inputs.hargarute} onChange={(e) => handleInput(e.target.value, e.target.name) } placeholder='' />
                                    </div>
                                </div>
                                <div className='App'>
                                    <button type="submit" class="btn btn-primary me-2">Submit</button>
                                    <button type="submit" class="btn btn-danger">Reset</button>
                                </div>
                                </form>
                            </div>
                            </div>
                            
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
