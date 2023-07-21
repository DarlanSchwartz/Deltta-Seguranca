import { useEffect, useState } from 'react'
import ClientsContext from './Contexts/ClientsContext';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Clients from './Pages/Clients';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientsList from './Pages/ClientsList';
import ClientsReceipt from './Pages/ClientsReceipt';
import axios from 'axios';
import { GetAllClients } from './API/requests';
import RegisterClientPage from './Pages/RegisterClientPage';

export default function App() {

  const [usuarios, setUsuarios] = useState(undefined);
  const [editingClient,setEditingClient] = useState(null);
  const [viewingClient,setViewingClient] = useState(null);
  const [clientSearchValue,setClientSearchValue] = useState('');
  const [selectedUsers,setSelectedUsers] = useState([]);
  const [token,setToken] = useState('');

  useEffect(() => {
      if(!localStorage.getItem('token'))
      {
        const tk = window.prompt('Insira a chave de acesso');
        localStorage.setItem('token',tk);
        GetAllClients(tk,setUsuarios);
        axios.defaults.headers.common['Authorization'] = tk;
        setToken(tk);
      }
      else
      {
        GetAllClients(null,setUsuarios);
      }
  }, []);

  return (
    <BrowserRouter>
      <ClientsContext.Provider value={{ usuarios, setUsuarios,editingClient,setEditingClient,viewingClient,setViewingClient,clientSearchValue,setClientSearchValue,selectedUsers,setSelectedUsers,token}}>
        <ToastContainer />
        <Navbar/>
        <Routes>
          <Route path='/' element={<RegisterClientPage />}/>
          <Route path='/clients' element={<Clients />}/>
          <Route path='/clients-list' element={<ClientsList />}/>
          <Route path='/clients-receipts' element={<ClientsReceipt/>}/>
        </Routes>
      </ClientsContext.Provider>
    </BrowserRouter>
  );
}