import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components';

import jsPDF from 'jspdf';

import Client from './Components/Client';

import { saveAs } from 'file-saver';
import ClientsContext from './Contexts/ClientsContext';
import RegisterClient from './Components/RegisterClient';
//let blob = new Blob([`Nome: ${user.nome}\nEndereço: ${user.endereco}\nContato: ${user.contato}\nForma de pagamento: ${user.formadepagamento}`], {type: "text/plain;charset=utf-8"});
//saveAs(blob, `Dados do usuario ${user.nome}.txt`);

export default  function App() {
  
  const [usuarios,setUsuarios] = useState([]);

  // Tela para recibos
  // Imprimir varios recibos
  // Editar info dos clientes
  // Deletar clientes
  // Imprimir recibos de um dia especifico
  // Imprimir lista dos clientes
  // Marcar todos os clientes que pagam em um dia especifico

  return (
    <ClientsContext.Provider value={{usuarios,setUsuarios}}>
      
      <PageContainer>
      <RegisterClient/>
        <h1 className='title'>Cadastrar cliente</h1>
        {usuarios.length > 0 && 
        
        <ClientsContainer>
          {usuarios.map((user) =>{
            return(
                <Client user={user} key={user.id}/>
            );
          })}
        </ClientsContainer>}
      </PageContainer>
    </ClientsContext.Provider>
  )
}


const PageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
flex-direction: column;

.title{
  color: #10461b;
  position: fixed;
  top: 0px;
  font-size: 40px;
  background-color: white;
  width: 100%;
  height: 100px;
  align-items: center;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #10461b;
}
`;

const ClientsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 100%;
  margin-top: 40px;
  margin-left: 20px;
`;

