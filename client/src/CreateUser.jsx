import axios from "axios";
import { useState } from "react";
import { addUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [nama, setNama] = useState();
  const [alamat, setAlamat] = useState();
  const [total, setTotal] = useState(); // Corrected variable name

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/create", { nama, alamat, total }) // Fixed variable names
      .then((res) => {
        dispatch(addUser(res.data));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className='mb-2'>
            <label htmlFor=''>Nama</label>
            <input
              type='text'
              placeholder='Enter Name'
              className='form-control'
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Alamat</label>
            <input
              type='text' // Corrected input type to 'text'
              placeholder='Enter Alamat'
              className='form-control'
              onChange={(e) => setAlamat(e.target.value)} // Fixed variable name
            />
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Total Hutang</label>
            <input
              type='text'
              placeholder='Total'
              className='form-control'
              onChange={(e) => setTotal(e.target.value)}
            />
          </div>
          <button className='btn btn-success'>Submit</button>
          <a href='/' className='btn btn-error'>
            Batal
          </a>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
