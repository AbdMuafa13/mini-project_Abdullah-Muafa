import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from '../../../components/Sidebar';
import { gql, useQuery, useMutation } from "@apollo/client";
import LoadingSvg from '../../../components/LoadingSvg';
import Swal from "sweetalert2";

const GetRute = gql`
query MyQuery {
  rute(order_by: { id: asc }) {
    id
    nomorangkot
    namarute
    hargarute
    gambar
  }
}`

const Get_RuteById = gql`
query getRuteById($id: Int!) {
  rute(where: {id: {_eq: $id}}) {
    id
    nomorangkot
    namarute
    hargarute
    gambar
  }
}`

// query update
// const UpdateRute = gql`
// mutation MyMutation($id: Int!, $namarute: String!, $nomorangkot: String!, $hargarute: Int!) {
//   update_rute_by_pk(pk_columns: {id: $id}, _set: {namarute: $namarute, nomorangkot: $nomorangkot, hargarute: $hargarute}) {
//     id
//   }
// }
// `;

const Update_Rute = gql`
mutation updateRute(
  $id: Int!, 
  $nomorangkot: String = "", 
  $namarute: String = "", 
  $hargarute: Int = 10, 
  $gambar: String = "") {
  update_rute(
    where: {id: {_eq: $id}}, 
    _set: {
      nomorangkot: $nomorangkot, 
      namarute: $namarute, 
      hargarute: $hargarute, 
      gambar: $gambar}) {
    returning {
      id
      nomorangkot
      namarute
      hargarute
      gambar
    }
  }
}
`

export default function EditRute() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [isDataReady, setIsDataReady] = useState(false);

  // const { data, loading, error, refetch } = useQuery(GetRuteById, { variables: { id: 1 }, });
  const { data, loading, error } = useQuery(Get_RuteById, {
    variables: { id: id },
  });

  console.log("ini id", id);

  const [updateRute, { loading: loadingUpdate }] = useMutation(
    Update_Rute,
    {
      refetchQueries: [GetRute],
      onCompleted: (data) => {
        Swal.fire({
          title: "Sukses!",
          text: "Data Berhasil Diupdate",
          icon: "success",
        });
      },
    }
  );

  const { data : data_all, loading: loading_all } = useQuery(GetRute);
  console.log("data all", data_all)

  const [inputs, setInputs] = useState({
    namarute: "",
    nomorangkot: "",
    hargarute: "",
    gambar: "",
  });

  const [baseImage, setBaseImage] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setInputs({ ...inputs, gambar: base64 });
    console.log(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleInput = (value, key) => {
    const newInputs = { ...inputs };

    newInputs[key] = value;

    // Kepo isi variable
    console.log(newInputs[key]);

    setInputs(newInputs);

    // Kepo isi variable
    console.log(newInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateRute({
      variables: {
        id: id,
        namarute: inputs.namarute,
        nomorangkot: inputs.nomorangkot,
        hargarute: inputs.hargarute,
        gambar: inputs.gambar,
      },
    });

    setInputs({
      namarute: "",
      nomorangkot: "",
      hargarute: "",
      gambar: "",
    });

    navigate("/home");
  };

  useEffect(() => {
    if (!loading && data) {
      setInputs({
        namarute: data?.rute[0].namarute,
        nomorangkot: data?.rute[0].nomorangkot,
        hargarute: data?.rute[0].hargarute,
        gambar: data?.rute[0].gambar,
      });
      setIsDataReady(true);
      // console.log(data);
    }
  }, [loading, data]);

  // console.log(inputs);
  // console.log(isDataReady);

  console.log("ini data", data)

  const handleReset = (e) => {
    e.preventDefault();

    setBaseImage("");
    navigate("/home/edit-rute/:id");
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
                                  <section className="ubahwisata mb-3 pb-3 mt-3 pt-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              {!isDataReady ? ( <LoadingSvg /> ) : (
                <form onSubmit={handleSubmit} onReset={handleReset}>
                  <div className="row mb-3">
                    <label
                      htmlFor="namarute"
                      className="col-sm-2 col-form-label"
                    >
                      Jurusan
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="namarute"
                        className="form-control"
                        id="namarute"
                        value={inputs.namarute}
                        onChange={(e) =>
                          handleInput(e.target.value, e.target.name)
                        }
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="nomorangkot"
                      className="col-sm-2 col-form-label"
                    >
                      Nomor Angkot
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="nomorangkot"
                        className="form-control"
                        id="nomorangkot"
                        value={inputs.nomorangkot}
                        onChange={(e) =>
                          handleInput(e.target.value, e.target.name)
                        }
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="input-harga"
                      className="col-sm-2 col-form-label"
                    >
                      Harga Rute
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        name="hargarute"
                        className="form-control"
                        id="harga"
                        value={inputs.hargarute}
                        onChange={(e) =>
                          handleInput(e.target.value, e.target.name)
                        }
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="gambar"
                      className="col-sm-2 col-form-label"
                    >
                      Gambar
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        id="gambar"
                        type="file"
                        onChange={(e) => {
                          uploadImage(e);
                        }}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="image"
                      className="col-sm-2 col-form-label"
                    >
                      Preview
                    </label>
                    <div className="col-sm-10">
                      <img
                        src={inputs.gambar}
                        height="300px"
                        width="100%"
                        alt="...."
                        style={{ borderRadius: "15px" }}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10">
                      <button
                        type="submit"
                        className="btn btn-primary btn-simpan"
                      >
                        Ubah
                      </button>
                      <button
                        type="reset"
                        className="btn btn-danger ms-2 btn-batal"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
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
