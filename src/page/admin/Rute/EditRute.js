import React, { useState, useEffect } from 'react'
import Sidebar from '../../../components/Sidebar'
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client"
import LoadingSvg from '../../../components/LoadingSvg'

const GetRute = gql`
query MyQuery {
  rute {
    id
    nomorangkot
    namarute
    hargarute
  }
}`

// query search
// const GetSearchByNama = gql`
// query MyQuery( $search: String!) {
//   pesan(where: {nama: {_eq: $search}}) {
//     email
//     nama
//     pesan
//   }
// }
// `

// query update
const UpdateRute = gql`
mutation MyMutation($id: Int!, $namarute: String!, $nomorangkot: String!, $hargarute: Int!) {
  update_rute_by_pk(pk_columns: {id: $id}, _set: {namarute: $namarute, nomorangkot: $nomorangkot, hargarute: $hargarute}) {
    id
  }
}
`

export default function EditRute() {
    const {data, loading, error, refetch} = useQuery(GetRute)
    const [updateRute, {loading: loadingUpdate}] = useMutation(UpdateRute, {refetchQueries: [GetRute]});
    const [ruteangkot, setRuteAngkot] = useState();
    const [nomorangkot, setNomorAngkot] = useState();
    const [namarute, setNamaRute] = useState();
    const [hargarute, setHargaRute] = useState();
      
    if(loading || loadingUpdate){
      return <LoadingSvg/>
    }
  
    if(error){
      console.log(error)
      return null
    }
  
    const onChangeRute = (e) => {
      if (e.target) {
        setNomorAngkot(e.target.value);
        setNamaRute(e.target.value);
        setHargaRute(e.target.value);
      }
    }
  
    const onSubmitRute = (e) => {
      e.preventDefault();
      setRuteAngkot((prev) => [...prev, {nomorangkot, namarute, hargarute}]);
      setNomorAngkot("");
      setNamaRute("");
      setHargaRute("");
    };

    const onClickItem = (id) => {
      const item = data?.rute.find(v => v.id ===id )
      updateRute({
        variables: {
          id: id,
          nomorangkot : !item.nomorangkot,
          namarute : !item.namarute,
          hargarute : !item.hargarute
        },
      });
      // refetch();
    };
  
    const onDeleteSaran = (id) => {
      const newRuteAngkot = ruteangkot.filter((_, i) => i !== id);
      setRuteAngkot(newRuteAngkot);
    }; 

  return (
    <div>
          <Sidebar />
            <div className='container'>
                <div>
                    <div className='p-4'>
                      <h1>Edit Rute : </h1>
                      <div className="container-fluid">
                          <div className="row">
                            <div className='col-12 mt-2'>
                                <div className="row justify-content-center">
                                  <div className="col-xs-12 col-sm-8 col-md-8 col-sm-offset-2 col-md-offset-3 shadow p-3 mb-5 bg-body rounded">
                                  {data?.rute.map((v) => (
                                    <form>
                                    <div class="row mb-3">
                                        <label for="inputNama3" class="col-sm-2 col-form-label">No. Rute : </label>
                                        <div class="col-sm-10">
                                        <input type="text" class="form-control" id="inputNama3" name='nomorangkot' value={v.nomorangkot}/>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                    <label for="inputEmail3" class="col-sm-2 col-form-label">Jurusan : </label>
                                        <div class="form-floating col-sm-10">
                                        <textarea class="form-control" placeholder="Leave a comment here" value={v.namarute} name='namarute' id="floatingTextarea2" style={{height: "100px"}}></textarea>
                                        <label for="floatingTextarea2" className='ps-4 text-secondary'>Jurusan</label>
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Harga : </label>
                                        <div class="d-flex col-sm-3">
                                        <label for="inputEmail3" class=" col-sm-3 col-form-label">Rp. </label>
                                        <input type="number" class="form-control" id="inputEmail3" placeholder='' value={v.hargarute} name='hargarute' />
                                        </div>
                                    </div>
                                    <div className='App'>
                                        <button type="submit" class="btn btn-warning me-2">Update</button>
                                        <button type="submit" class="btn btn-danger">Reset</button>
                                    </div>
                                    </form>
                                  ))}
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
