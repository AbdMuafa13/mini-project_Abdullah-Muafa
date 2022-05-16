import React from 'react'
import { Link } from 'react-router-dom'

export default function DescriptionRute({id,nomorangkot,namarute,hargarute, onClickItem, onDeleteRute}) {
  return (
    <tr data-key={id}>
        <th scope="row">{id}</th>
        <td scope='col '>{nomorangkot}</td>
        <td scope='col'>{namarute}</td>
        <td scope='col'>{hargarute}</td>
        <td scope='col'>
            <div className='d-flex justify-content-center col-sm-2 col-md-10'>
                <button className="btn btn-warning me-3" onClick={onClickItem}>
                    <Link to="/edit-rute" className=" text-light text-decoration-none fw-bold">
                    Edit
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
