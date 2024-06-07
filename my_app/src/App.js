import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import { ToastContainer ,toast} from 'react-toastify';
import Home from './components/Home';
import { Routes, Route , Link  } from 'react-router-dom';
import Login from './components/Login';


function App() {



  return (
    <>
    <div className='app-container'>
      <Header />
          <Container>
              <Routes>
                  <Route path="/"        element={<Home />}       />
                  <Route path="/ManageUsers" element={<TableUsers/>}   />
                  <Route path="/login" element={<Login/>}   />
                  {/* <Route path="/logout" element={<Logout/>}   /> */}
              </Routes>
             
          </Container>
    </div>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
  />
  
    </>
  );
}

export default App;
