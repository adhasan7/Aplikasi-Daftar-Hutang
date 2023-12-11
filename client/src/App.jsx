import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./CreateUser";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/userSlice";
import UpdateUser from "./UpdateUsers";
import UsersDashboard from "./DashboardUser";

function App() {
  const dispatch = useDispatch(); // Add this line to get the dispatch function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001");
        dispatch(getUser(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]); // Add dispatch to the dependency array

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UsersDashboard />} />
        <Route path='/' element={<Users />} />
        <Route path='/create' element={<CreateUser />} />
        <Route path='/edit/:id' element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
