import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "./redux/userSlice";

function UsersDashboard() {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deleteuser/${id}`)
      .then((res) => {
        dispatch(deleteUser({ id }));
      })
      .catch((err) => console.log(err));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nama.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      user.alamat.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan kata kunci pencarian (misalnya, kirim ke server)
    console.log("Search keyword:", searchKeyword);
    // Tambahan: Anda bisa menambahkan logika untuk memperbarui data dengan hasil pencarian dari server
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form className='d-flex' role='search' onSubmit={handleSubmit}>
          <input
            className='form-control me-2'
            type='search'
            placeholder='Search'
            aria-label='Search'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button className='btn btn-outline-success' type='submit'>
            Search
          </button>
        </form>
        <Link to='/create' className='btn btn-success btn-sm'>
          Add +
        </Link>
        <table className='table'>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Alamat</th>
              <th>Total Hutang</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              return (
                // <tr key={user._id}>
                <tr key={user._id}>
                  <td>{user.nama}</td>
                  <td>{user.alamat}</td>
                  <td>{user.total}</td>
                  <td>
                    <Link
                      to={`/edit/${user.id}`}
                      className='btn btn-sm btn-success me-2'
                    >
                      Update
                    </Link>

                    <button
                      onClick={() => {
                        const isConfirmed = window.confirm(
                          "Anda yakin mau menghapus? Ini akan menghapus data secara permanen."
                        );

                        if (isConfirmed) {
                          handleDelete(user.id);
                        }
                      }}
                      className='btn btn-sm btn-danger'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersDashboard;
