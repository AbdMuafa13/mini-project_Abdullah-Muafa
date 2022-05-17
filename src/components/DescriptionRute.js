import React from 'react'
import { Link } from 'react-router-dom'

const DescriptionRute = ({id,nomorangkot,namarute,hargarute, gambar, onClickItem, onDeleteRute}) => {
  return (
    <tr data-key={id}>
        <th scope="row">{id}</th>
        <td scope='col '>{nomorangkot}</td>
        <td scope='col'>{namarute}</td>
        <td scope='col'>{hargarute}</td>
        <td scope='col'><img src={gambar} style={{width:"110px", height:"150px"}} alt="Wisata Alam" /></td>
        <td scope='col'>
            <div className='d-flex justify-content-center col-sm-2 col-md-10'>
                <button className="btn btn-warning me-3">
                    <Link to={`/home/edit-rute/${id}`} className="btn text-light text-decoration-none" >
                        Update
                        <i class="bi bi-pencil ms-1"></i>
                    </Link>
                </button>
                <button className="btn btn-danger" onClick={onDeleteRute}>
                    Delete
                    <i class="bi bi-trash3 ms-1"></i>
                </button>
            </div>
        </td>
    </tr>
  )
}

export default DescriptionRute;