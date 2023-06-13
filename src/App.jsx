import { useEffect, useRef, useState } from 'react'
import ClientsContext from './Contexts/ClientsContext';
import RegisterClient from './Pages/RegisterClient';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Clients from './Pages/Clients';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//let blob = new Blob([`Nome: ${user.nome}\nEndereço: ${user.endereco}\nContato: ${user.contato}\nForma de pagamento: ${user.formadepagamento}`], {type: "text/plain;charset=utf-8"});
//saveAs(blob, `Dados do usuario ${user.nome}.txt`);
//import { saveAs } from 'file-saver';

export default function App() {

  const [usuarios, setUsuarios] = useState([]);
  const [editingClient,setEditingClient] = useState(null);
  const [viewingClient,setViewingClient] = useState(null);

  // Selecionar varios para deletar ou imprimir recibo
  // Filtrar por : Valor pago, Dia do pagamento, nome do cliente, endereço
  // Total em dinheiro de todos os clientes e quantidade de clientes
  // Tela para recibos
  // Imprimir varios recibos
  // Imprimir recibos de um dia especifico
  // Marcar todos os clientes que pagam em um dia especifico

  return (
    <BrowserRouter>

      <ClientsContext.Provider value={{ usuarios, setUsuarios,editingClient,setEditingClient,viewingClient,setViewingClient }}>
      <ToastContainer />
        <Navbar/>
        <Routes>
          <Route path='/' element={<RegisterClient />}/>
          <Route path='/clients' element={<Clients />}/>
        </Routes>
      </ClientsContext.Provider>

    </BrowserRouter>
  )
}






