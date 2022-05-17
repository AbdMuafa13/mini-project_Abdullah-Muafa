import React, { useState } from 'react';
import DescriptionAbout from '../../components/DescriptionAbout';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LoadingSvg from '../../components/LoadingSvg';

import { gql, useQuery, useMutation } from "@apollo/client"
import Swal from "sweetalert2";

const GetPesan = gql`
query MyQuery {
  pesan(order_by: {id: asc}) {
    id
    email
    nama
    pesan
  }
}`

const InsertPesan =gql`
mutation MyMutation($object1: pesan_insert_input!) {
  insert_pesan_one(object: $object1) {
    id
    email
    nama
    pesan
  }
}`

const PesanUser = () => {
  // const { data, loading, error} = useQuery(GetPesan);
  // const [insertPesan, { loading: loadingInsert }] = useMutation(InsertPesan, { refetchQueries: [GetPesan],});

  // const [saran, setSaran] = useState([]);
  // const [nama, setNama] = useState();
  // const [email, setEmail] = useState();
  // const [pesan, setPesan] = useState();

  // if(loading || loadingInsert){
  //   return <LoadingSvg/>
  // }

  // if(error){
  //   console.log(error)
  //   return null
  // }

  // const onChangeEmail = (e) => {
  //   if (e.target) {
  //     setEmail(e.target.value);
  //   }
  // }

  // const onChangenama = (e) => {
  //   if (e.target) {
  //     setNama(e.target.value);
  //   }
  // }

  // const onChangePesan = (e) => {
  //   if (e.target) {
  //     setPesan(e.target.value);
  //   }
  // }

  // const onSubmitSaran = (id) => {
  //   id.preventDefault();
  //   insertPesan({ variables: {
  //     object: {
  //       email: email,
  //       nama: nama,
  //       pesan: pesan,
  //     },
  //   },
  //   });
  //   setEmail('');
  //   setNama('');
  //   setPesan('');
  // };

  // const onClickItem = (id) => {
  //   InsertPesan({
  //     variables: {
  //       id: id
  //     }
  //   })
  // }

  const { data, loading, error} = useQuery(GetPesan);
  const [insertPesan, { loading: loadingInsert }] = useMutation(
    InsertPesan,
    {
      refetchQueries: [GetPesan], onCompleted: (data) => {
        Swal.fire({
          title: "Sukses!",
          text: "Data Berhasil Disimpan",
          icon: "success",
        });
      },
    }
  );

  const [inputs, setInputs] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  const handleInput = (value, key) => {
    const newInputs = { ...inputs };
    newInputs[key] = value;
    console.log(newInputs[key]);
    setInputs(newInputs);
    console.log(newInputs);
  };

  const onSubmitSaran = (e) => {
    e.preventDefault();

    insertPesan({
      variables: {
        object1: {
          nama: inputs.nama,
          email: inputs.email,
          pesan: inputs.pesan,
        },
      },
    });

    setInputs({
      nama: "",
      email: "",
      pesan: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid" style={{ marginTop: "7rem"}}>
        <div className="row">
          <div className="col-12">
            <DescriptionAbout title="Saran dan Kesan" />
          </div>
            <div className='col-12'>
              <div className="row justify-content-center">
                <div className="col-xs-12 col-sm-8 col-md-8 col-sm-offset-2 col-md-offset-3 shadow p-3 mb-5 bg-body rounded">
                <form onSubmit={onSubmitSaran}>
                  <div class="row mb-3">
                      <label for="nama" class="col-sm-2 col-form-label">Nama : </label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="nama" name='nama' value={inputs.nama} onChange={(e) => handleInput(e.target.value, e.target.name) } />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label for="email" class="col-sm-2 col-form-label">Email : </label>
                      <div class="col-sm-10">
                        <input type="email" class="form-control" id="email" name='email' placeholder='example@gmail.com' value={inputs.email} onChange={(e) => handleInput(e.target.value, e.target.name) } />
                      </div>
                    </div>
                    <div class="row mb-3">
                    <label for="pesan" class="col-sm-2 col-form-label">Pesan : </label>
                      <div class="form-floating col-sm-10">
                        <textarea class="form-control" name='pesan' value={inputs.pesan} onChange={(e) => handleInput(e.target.value, e.target.name) } placeholder="Leave a comment here" id="pesan" style={{height: "100px"}}></textarea>
                        <label for="pesan" className='ps-4 text-secondary'>Pesan</label>
                      </div>
                    </div>
                    <div className='App'>
                      <button type="submit" class="btn btn-primary me-2">Submit</button>
                      <button type="reset" class="btn btn-danger">Reset</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PesanUser;
