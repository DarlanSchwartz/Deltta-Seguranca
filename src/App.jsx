import { useEffect, useState } from 'react'
import ClientsContext from './Contexts/ClientsContext';
import RegisterClient from './Pages/RegisterClient';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Clients from './Pages/Clients';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientsList from './Pages/ClientsList';
import ClientsReceipt from './Pages/ClientsReceipt';
import { loadClients } from './utils';

export default function App() {

  const [usuarios, setUsuarios] = useState([]);
  const [editingClient,setEditingClient] = useState(null);
  const [viewingClient,setViewingClient] = useState(null);
  const [clientSearchValue,setClientSearchValue] = useState('');
  const [selectedUsers,setSelectedUsers] = useState([]);

  useEffect(()=>{
    setUsuarios(loadClients());
  },[]);

  return (
    <BrowserRouter>
      <ClientsContext.Provider value={{ usuarios, setUsuarios,editingClient,setEditingClient,viewingClient,setViewingClient,clientSearchValue,setClientSearchValue,selectedUsers,setSelectedUsers}}>
        <ToastContainer />
        <Navbar/>
        <Routes>
          <Route path='/' element={<RegisterClient />}/>
          <Route path='/clients' element={<Clients />}/>
          <Route path='/clients-list' element={<ClientsList />}/>
          <Route path='/clients-receipts' element={<ClientsReceipt/>}/>
        </Routes>
      </ClientsContext.Provider>
    </BrowserRouter>
  );
}