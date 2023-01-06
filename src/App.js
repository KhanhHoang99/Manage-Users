
import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux'
import { handleRefresh } from './redux/slice/userSlice';
import { useNavigate } from "react-router-dom";
import {ErrorBoundary} from 'react-error-boundary';
import ErrorHandler from './components/ErrorBoundary/ErrorHandler';

function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

   
   useEffect(() => {

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
     if(token && email){
       dispatch(handleRefresh({email}));
       navigate('/');
     }
  }, [])


  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <div className='app-container'>
        <Header />
        <Container>
          <AppRoutes />
        </Container>
        <ToastContainer 
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
