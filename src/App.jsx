import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import print from 'ink-html';

export default  function App() {
  
  const [usuarios,setUsuarios] = useState([]);
  const [nome,setNome] = useState('');
  const [endereco,setEndereco] = useState('');
  const [contato,setContato] = useState('');
  const [observacao,setObservacao] = useState('');
  const formadepagamento = useRef(null);
  const [podeCadastrar,setPodeCadastrar] = useState(false);

  // Contato 1 e 2
  // Dividir endereço em chunks
  // Tela para recibos
  // Imprimir varios recibos
  // Editar info dos clientes
  // Deletar clientes
  // Imprimir recibos de um dia especifico
  // Imprimir lista dos clientes
  // Marcar todos os clientes de um dia especifico
  // Cadastro deve haver valor que o cliente paga


  useEffect( ()=>{
    if(nome != '' && endereco != '' && contato != '')
    {
      setPodeCadastrar(true);
    }
    else
    {
      setPodeCadastrar(false);
    }
  },[nome,endereco,contato])


  function cadastrarCliente()
  {
    if(!podeCadastrar)
    {
      return;
    }
    
    let clientIds = [];
    let id = 0;

    if(usuarios.length > 0)
    {
      usuarios.forEach(user =>{
        clientIds.push(user.id);
      });

      do
      {
        id = Math.floor(Math.random() * 1001);
      } while (clientIds.includes(id));
    }

    const newObj = {
      id:id,
      nome:nome,
      endereco:endereco,
      contato:contato.toString(),
      formadepagamento:formadepagamento.current.value
    };

    console.log(newObj);

    setUsuarios([...usuarios,newObj]);

  }

  function formatarTelefone(value) {
    const numero = value.replace(/\D/g, '');
    let numeroFormatado = '';
  
    if (numero.length >= 3) {
      numeroFormatado = `(${numero.substring(0, 2)}) `;
  
      if (numero.length >= 8) {
        numeroFormatado += `${numero.substring(2, 7)}-`;
  
        if (numero.length > 6) {
          numeroFormatado += numero.substring(7);
        }
      } else {
        numeroFormatado += numero.substring(2);
      }
    } else {
      numeroFormatado = numero;
    }
  
    return numeroFormatado;
  }

  return (
    <PageContainer>
      <h1 className='title'>Cadastrar clientes</h1>

      <StyledForm onSubmit={(e)=> {e.preventDefault(); cadastrarCliente();}}>
        <label htmlFor="nome">Nome</label>
        <input required value={nome} onChange={(e) => setNome(e.target.value)} id='nome' name='nome' type='text' placeholder='nome do cliente'/>
        <label htmlFor="edereco">Endereço</label>
        <input required  value={endereco} onChange={(e) => setEndereco(e.target.value)} type="text" id='endereco' name='endereco' placeholder='endereço do cliente' />
        <label htmlFor="contato">Contato</label>
        <input required value={contato} onChange={(e) =>setContato(formatarTelefone(e.target.value))} type="text" name='contato' id='contato' placeholder='(51) 99999-9999' pattern='\(\d{2}\) \d{5}-\d{4}' maxLength={15} />
        <label htmlFor='forma-de-pagamento'>Forma de pagamento</label>
        <select ref={formadepagamento}  name="forma-de-pagamento" id="forma-de-pagamento">
          <option>Dinheiro/Pix</option>
          <option>Boleto</option>
        </select>
        {podeCadastrar ? <button type='submit'>Cadastrar cliente</button> : <button disabled type='submit'>Cadastrar cliente</button>}
        <label htmlFor='observacao'>Observação</label>
        <input className='obs' value={observacao} onChange={(e) =>setObservacao(e.target.value)} type="text" name='observacao' id='observacao' placeholder='o cliente fuma maconha'/>
       
      </StyledForm>

      {usuarios.length > 0 && 
      
      <ClientsContainer>
        {usuarios.map((user,index) =>{
          return(
            <ClientDiv key={index}> 
              <h1>Cliente</h1>
              <h2>{user.nome}</h2>
              <h3>{user.endereco}</h3>
              <h4>{user.contato}</h4>
              <h5>{user.formadepagamento}</h5>
              <input type="checkbox" className='check' />
              <button onClick={(e) => {
                //let blob = new Blob([`Nome: ${user.nome}\nEndereço: ${user.endereco}\nContato: ${user.contato}\nForma de pagamento: ${user.formadepagamento}`], {type: "text/plain;charset=utf-8"});
                //saveAs(blob, `Dados do usuario ${user.nome}.txt`);
                print(e.target.parentElement,1);
              }}>Imprimir recibo</button>
            </ClientDiv>
          );
        })}
      </ClientsContainer>}
    </PageContainer>
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
  top: 20px;
  font-size: 40px;
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

const ClientDiv = styled.div`
  background-color: #3b3b3b;
  border-radius: 5px;
  color: white;
  width: 300px;
  max-width: 300px;
  flex-shrink: 0;
  position: relative;
  .check{
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
`;

const StyledForm = styled.form`

  width: 600px;
  display: flex;
  padding-top: 20px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: 40px;
  flex-shrink: 0;
  background-color: rgba(255,255,255,0.5);

  label{
    color: #020202;
    align-self: self-start;
    margin-left: 20px;
  }

  input{
    border: 1px solid rgba(143, 143, 143, 0.288);
    border-radius: 5px;
    height: 40px;
    width: 95%;
    padding-left: 10px;
    &:focus{
      outline: 2px solid green;
    }
  }

  select{
    border: 1px solid gray;
    border-radius: 5px;
    height: 40px;
    width: 95%;
    cursor: pointer;
  }

  .obs{
    margin-bottom: 40px;
  }

  button{
    border: 0;
    background-color: green;
    color: white;
    cursor: pointer;
    height: 40px;
    width: 95%;
    border-radius: 5px;
    transition: all 200ms;
   
    &:hover{
      &:enabled{
        color: green;
      border: 1px solid green;
      background-color: white;
      }
    }

    &:disabled{
      cursor: not-allowed;
      background-color: #40884081;
      color: #ffffff76;
    }

  }
`;

