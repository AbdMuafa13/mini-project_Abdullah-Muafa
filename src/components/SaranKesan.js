import React from 'react'

export default function SaranKesan({id,email,nama,pesan, onClickItem, onDeleteSaran}) {
  return (
    <tr data-key={id}>
        <th scope="row">{id}</th>
        <td scope='col '>{email}</td>
        <td scope='col'>{nama}</td>
        <td scope='col'>{pesan}</td>
        <td scope='col'>
            <div className='d-flex justify-content-center col-sm-2 col-md-10'>
                <button className="btn btn-danger" onClick={onDeleteSaran}>
                    Delete
                    <i class="bi bi-trash3 ms-1"></i>
                </button>
            </div>
        </td>
    </tr>
  )
}
