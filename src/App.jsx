import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentuser()
    .then((userData)=> {
      if(userData){
        dispatch(login({userData}));
      } else{
        dispatch(logout());
      }
    })
    .finally(()=> setLoading(false));
  }, [])
  
  return loading ? (
      <h1 className="min-h-screen bg-red-500">Loading..</h1>
  ) : (
    <div className="bg-green-600">
      helo
    </div>
  )
}

export default App
