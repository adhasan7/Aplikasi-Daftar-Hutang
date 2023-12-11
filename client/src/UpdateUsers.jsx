import axios from "axios";
import { useEffect, useState } from "react";
import { updateUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams();
  const [nama, setNama] = useState();
  const [alamat, setAlamat] = useState();
  const [total, setTotal] = useState();

  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    const user = users.find((u) => u.id === id);
    setNama(user.nama);
    setAlamat(user.alamat);
    setTotal(user.total);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    axios;
    e.preventDefault();
    axios
      .put("http://localhost:3001/update/" + id, { nama, alamat, total })
      .then((res) => {
        dispatch(updateUser({ id, nama, alamat, total }));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className='mb-2'>
            <label htmlFor=''>Nama</label>
            <input
              type='text'
              placeholder='Enter Name'
              className='form-control'
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Alamat</label>
            <input
              type='text'
              placeholder='Enter Nama'
              className='form-control'
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor=''>Total </label>
            <input
              type='text'
              placeholder='Enter Total'
              className='form-control'
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </div>
          <button className='btn btn-success'>Update</button>
          <a href='/' className='btn btn-error'>
            Batal
          </a>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
