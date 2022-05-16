// import BigTitle from "../components/BigTitle";
// import Navbar from "../components/Navbar";
// import {useRef} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {removeTodo, addTodo, changeTodoStatus as change} from "../store/todo-slice";
// import CompleteIndicator from "../components/CompleteIndicator";

// const Home = () => {
//   const title = useRef();
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.todo.data);

//   const resetInput = () => {
//     title.current.value = "";
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (title) {
//       let newTodo = {
//         id: new Date().now,
//         title: title.current.value,
//         completed: false,
//       };
//       resetInput();
//       return newTodo;
//     } else {
//       alert("Don't forget to fill your To Do!");
//     }
//   };

//   return (
//     <>
//       <Navbar></Navbar>
//       <BigTitle>Todos</BigTitle>
//       {/* input form */}
//       <section className="container">
//         <div className="row justify-content-center gap-3">
//           <div className="col-lg-6 col-md-8">
//             <div className="row">
//               <div className="input-group mb-4">
//                 <input
//                   type="text"
//                   className="form-control py-2"
//                   ref={title}
//                   name="title"
//                   placeholder="What's to do for today?"
//                 />
//                 <div class="input-group-append">
//                   <button
//                     onClick={(e) => dispatch(addTodo(handleSubmit(e)))}
//                     className="btn btn-primary py-2"
//                     type="button"
//                   >
//                     <i className="bi bi-plus-circle"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <section className="container">
//             <div className="row justify-content-center gap-3 mb-5">
//               <CompleteIndicator />
//               {/* to do list */}
//               {data.map((todo, i) => {
//                 return (
//                   <div
//                     onClick={() => dispatch(change(i))}
//                     className={
//                       todo.completed
//                         ? "todo inactive col-lg-6 col-md-8 p-2"
//                         : "todo active col-lg-6 col-md-8 p-2"
//                     }
//                     key={todo.id}
//                   >
//                     <div className="container">
//                       <div className="row align-items-center">
//                         <div className="col-8 text-start">
//                           <span className={todo.completed ? "todo-title strike" : "todo-title"}>
//                             {todo.title}
//                           </span>
//                         </div>
//                         <div className="col-4 text-end">
//                           <button
//                             onClick={() => dispatch(removeTodo(todo.id))}
//                             className={
//                               todo.completed ? "btn btn-outline-secondary" : "btn btn-outline-light"
//                             }
//                           >
//                             <i className="bi bi-trash"></i>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;

import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client"
import LoadingSvg from '../../components/LoadingSvg';
import DescriptionRute from '../../components/DescriptionRute';

const GetRute = gql`
query MyQuery {
  rute {
    id
    namarute
    nomorangkot
    hargarute
  }
}`

const UpdateRute = gql`
mutation MyMutation($id: Int!, $namarute: String!, $nomorangkot: String!, $hargarute: Int!) {
  update_rute_by_pk(pk_columns: {id: $id}, _set: {namarute: $namarute, nomorangkot: $nomorangkot, hargarute: $hargarute}) {
    id
  }
}
`

export default function Home() {
    const {data, loading, error, refetch} = useQuery(GetRute)
    const [updateRute, {loading: loadingUpdate}] = useMutation(UpdateRute);
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
  
    const onChangeNomorAngkot = (e) => {
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
      })
    };

    // const onClickItem = (id) => {
    //   const newRuteAngkot = [...ruteangkot];
    //   newRuteAngkot[id].checked = !newRuteAngkot[id].checked;
    //   setRuteAngkot(newRuteAngkot);
    // }
      
    const onDeleteRute = (id) => {
      const newRuteAngkot = ruteangkot.filter((_, i) => i !== id);
      setRuteAngkot(newRuteAngkot);
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
                          onClickItem={() => onClickItem(v.id)}
                          onDeleteRute={() => onDeleteRute(v.id)}
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

