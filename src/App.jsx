import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components';
import ClientsContext from './Contexts/ClientsContext';
import RegisterClient from './Pages/RegisterClient';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Clients from './Pages/Clients';
//let blob = new Blob([`Nome: ${user.nome}\nEndereço: ${user.endereco}\nContato: ${user.contato}\nForma de pagamento: ${user.formadepagamento}`], {type: "text/plain;charset=utf-8"});
//saveAs(blob, `Dados do usuario ${user.nome}.txt`);
//import { saveAs } from 'file-saver';

export default function App() {

  const [usuarios, setUsuarios] = useState([]);

  // nada obrigatorio
  // Data de vencimento -> VENCIMENTO
  // Tela para recibos
  // Imprimir varios recibos
  // Editar info dos clientes
  // Deletar clientes
  // Imprimir recibos de um dia especifico
  // Imprimir lista dos clientes
  // Marcar todos os clientes que pagam em um dia especifico

  return (
    <BrowserRouter>

      <ClientsContext.Provider value={{ usuarios, setUsuarios }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<RegisterClient />}/>
          <Route path='/clients' element={<Clients />}/>
        </Routes>
      </ClientsContext.Provider>

    </BrowserRouter>
  )
}






