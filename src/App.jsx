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

  // Lista nova de clientes com todas infos -> Nome cliente, numero telefone, endereço


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

/*
 {
      id: 1,
      nome: 'João Silva',
      rua: 'Rua das Flores',
      numero: 123,
      bairro: 'Centro',
      cidade: 'São Paulo',
      contato: '(11) 98765-4321',
      contato2: '(11) 12345-6789',
      formadepagamento: 'Dinheiro/Pix',
      valorCombinado: 200,
      observacao: 'Cliente preferiu entrega no período da tarde',
      vencimento: 5
    },
    {
      id: 2,
      nome: 'Maria Santos',
      rua: 'Avenida Principal',
      numero: 456,
      bairro: 'Jardins',
      cidade: 'Rio de Janeiro',
      contato: '(22) 55555-5555',
      contato2: '',
      formadepagamento: 'Boleto',
      valorCombinado: 150,
      observacao: 'Cliente solicitou embalagem especial',
      vencimento: 10
    },
    {
      id: 3,
      nome: 'Pedro Oliveira',
      rua: 'Rua do Comércio',
      numero: 789,
      bairro: 'Centro',
      cidade: 'São Paulo',
      contato: '(11) 98765-4321',
      contato2: '',
      formadepagamento: 'Dinheiro/Pix',
      valorCombinado: 300,
      observacao: 'Entregar pedido nos fundos da residência',
      vencimento: 15
    },
    {
      id: 4,
      nome: 'Ana Pereira',
      rua: 'Rua das Palmeiras',
      numero: 10,
      bairro: 'Ipanema',
      cidade: 'Rio de Janeiro',
      contato: '(22) 99999-9999',
      contato2: '',
      formadepagamento: 'Boleto',
      valorCombinado: 250,
      observacao: 'Cliente pediu para entrar em contato antes da entrega',
      vencimento: 20
    },
    {
      id: 5,
      nome: 'José Santos',
      rua: 'Rua das Pedras',
      numero: 567,
      bairro: 'Centro',
      cidade: 'São Paulo',
      contato: '(11) 77777-7777',
      contato2: '(11) 88888-8888',
      formadepagamento: 'Dinheiro/Pix',
      valorCombinado: 180,
      observacao: '',
      vencimento: 25
    },
    {
      id: 6,
      nome: 'Camila Rodrigues',
      rua: 'Avenida das Árvores',
      numero: 111,
      bairro: 'Barra da Tijuca',
      cidade: 'Rio de Janeiro',
      contato: '(22) 66666-6666',
      contato2: '',
      formadepagamento: 'Boleto',
      valorCombinado: 1500,
      observacao: '',
      vencimento: 1
    },
    {
        id: 8,
        nome: 'Carla Almeida',
        rua: 'Rua das Palmeiras',
        numero: 321,
        bairro: 'Santo Antônio',
        cidade: 'Belo Horizonte',
        contato: '(31) 11111-1111',
        contato2: '',
        formadepagamento: 'Dinheiro/Pix',
        valorCombinado: 5,
        observacao: 'Cliente possui alergia a determinado ingrediente',
        vencimento: 7
      },
      {
        id: 9,
        nome: 'Mariana Ferreira',
        rua: 'Avenida Central',
        numero: 987,
        bairro: 'Botafogo',
        cidade: 'Rio de Janeiro',
        contato: '(22) 44444-4444',
        contato2: '(22) 333333333',
        formadepagamento: 'Boleto',
        valorCombinado: 280,
        observacao: 'Cliente prefere receber mensagem antes da entrega',
        vencimento: 12
      },
      {
        id: 999,
        nome: 'Lucas Souza',
        rua: 'Rua das Oliveiras',
        numero: 55,
        bairro: 'Centro',
        cidade: 'São Paulo',
        contato: '(11) 66666-6666',
        contato2: '',
        formadepagamento: 'Dinheiro/Pix',
        valorCombinado: 15,
        observacao: 'Cliente solicitou entrega após as 18h',
        vencimento: 18
      },
*/






