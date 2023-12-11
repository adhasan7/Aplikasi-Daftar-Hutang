// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { deleteUser } from "./redux/userSlice";

// function Users() {
//   const users = useSelector((state) => state.users.users);
//   const dispatch = useDispatch();
//   const [searchKeyword, setSearchKeyword] = useState("");

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:3001/deleteuser/${id}`)
//       .then((res) => {
//         dispatch(deleteUser({ id }));
//       })
//       .catch((err) => console.log(err));
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.nama.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//       user.alamat.toLowerCase().includes(searchKeyword.toLowerCase())
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Lakukan sesuatu dengan kata kunci pencarian (misalnya, kirim ke server)
//     console.log("Search keyword:", searchKeyword);
//     // Tambahan: Anda bisa menambahkan logika untuk memperbarui data dengan hasil pencarian dari server
//   };

//   return (
//     <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
//       <div className='w-50 bg-white rounded p-3'>
//         <form className='d-flex' role='search' onSubmit={handleSubmit}>
//           <input
//             className='form-control me-2'
//             type='search'
//             placeholder='Search'
//             aria-label='Search'
//             value={searchKeyword}
//             onChange={(e) => setSearchKeyword(e.target.value)}
//           />
//           <button className='btn btn-outline-success' type='submit'>
//             Search
//           </button>
//         </form>
//         <Link to='/create' className='btn btn-success btn-sm'>
//           Add +
//         </Link>
//         <table className='table'>
//           <thead>
//             <tr>
//               <th>Nama</th>
//               <th>Alamat</th>
//               <th>Total Hutang</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => {
//               return (
//                 // <tr key={user._id}>
//                 <tr key={user._id}>
//                   <td>{user.nama}</td>
//                   <td>{user.alamat}</td>
//                   <td>{user.total}</td>
//                   <td>
//                     <Link
//                       to={`/edit/${user.id}`}
//                       className='btn btn-sm btn-success me-2'
//                     >
//                       Update
//                     </Link>

//                     <button
//                       onClick={() => {
//                         const isConfirmed = window.confirm(
//                           "Anda yakin mau menghapus? Ini akan menghapus data secara permanen."
//                         );

//                         if (isConfirmed) {
//                           handleDelete(user.id);
//                         }
//                       }}
//                       className='btn btn-sm btn-danger'
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Users;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Users() {
  const dispatch = useDispatch();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    // Cek apakah ada token di local storage saat komponen dimuat
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    axios
      .post("http://localhost:3001/login", { username, password })
      .then((response) => {
        const { token } = response.data;
        // Simpan token di local storage
        localStorage.setItem("token", token);
        setLoggedIn(true);
        history.push("/dashboard"); // Redirect ke halaman dashboard setelah login
      })
      .catch((error) => {
        console.error("Gagal login:", error);
      });
  };

  const handleLogout = () => {
    // Hapus token dari local storage
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} className='btn btn-danger btn-sm'>
              Logout
            </button>
            {/* Tambahkan komponen UserDashboard di sini */}
          </>
        ) : (
          <form>
            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>
                Username:
              </label>
              <input
                type='text'
                className='form-control'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password:
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type='button'
              onClick={handleLogin}
              className='btn btn-primary'
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Users;
