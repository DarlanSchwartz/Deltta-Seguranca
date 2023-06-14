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

  const [usuarios, setUsuarios] = useState([
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
      valorCombinado: 120,
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
        valorCombinado: 190,
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
        id: 10,
        nome: 'Lucas Souza',
        rua: 'Rua das Oliveiras',
        numero: 55,
        bairro: 'Centro',
        cidade: 'São Paulo',
        contato: '(11) 66666-6666',
        contato2: '',
        formadepagamento: 'Dinheiro/Pix',
        valorCombinado: 220,
        observacao: 'Cliente solicitou entrega após as 18h',
        vencimento: 18
      },
    ]);
  const [editingClient,setEditingClient] = useState(null);
  const [viewingClient,setViewingClient] = useState(null);
  const [clientSearchValue,setClientSearchValue] = useState('');

  // Selecionar varios para deletar ou imprimir recibo
  // Filtrar por : Valor pago, Dia do pagamento, nome do cliente, endereço
  // Tela para recibos
  // Imprimir varios recibos
  // Imprimir recibos de um dia especifico
  // Marcar todos os clientes que pagam em um dia especifico

  return (
    <BrowserRouter>

      <ClientsContext.Provider value={{ usuarios, setUsuarios,editingClient,setEditingClient,viewingClient,setViewingClient,clientSearchValue,setClientSearchValue}}>
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






