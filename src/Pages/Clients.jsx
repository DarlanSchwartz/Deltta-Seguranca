import { styled } from "styled-components";
import Client from "../Components/Client";
import { useContext, useEffect, useRef, useState } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import ViewClient from "../Components/ViewClient";
import { AiTwotonePhone } from 'react-icons/ai';
import { ImLocation } from 'react-icons/im';
import { BsPersonLinesFill } from 'react-icons/bs';
import { RiPrinterFill, RiDeleteBin6Fill, RiListOrdered } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import trashIcon from '/trash.png';
import { useNavigate } from "react-router-dom";
import { saveClients } from "../utils";
import { useWindowSize } from "@uidotdev/usehooks";
import {BiTimeFive,BiMoneyWithdraw} from 'react-icons/bi';
import {GiReceiveMoney} from 'react-icons/gi';
import { MdGroups2 } from 'react-icons/md';

export default function Clients() {
  const { usuarios, setUsuarios, clientSearchValue, setSelectedUsers, selectedUsers } = useContext(ClientsContext);
  const [checkAll, setCheckAll] = useState(false);
  const [valorTotal, setValorTotal] = useState(0);
  const [vencemHoje, setVencemHoje] = useState(0);
  const orderSelect = useRef(null);
  const today = new Date().getDate();
  const navigate = useNavigate();
   const size = useWindowSize();

  useEffect(() => {
    if (usuarios !== null && usuarios !== undefined) {
      let value = 0;
      let value2 = 0;
      usuarios.forEach(usuario => {
        value += Number(usuario.valorCombinado);

        if (usuario.vencimento == today) {
          value2++;
        }
      });

      setValorTotal(value.toFixed(2));
      setVencemHoje(value2);
    }
  }, [usuarios]);

  useEffect(() => {
    ordernar('nome');
  }, []);

  useEffect(() => {

    if (usuarios !== null && usuarios !== undefined) {
      if (checkAll) {
        setSelectedUsers(usuarios.map(usuario => { return usuario.id }));
      }
      else {
        setSelectedUsers([]);
      }
    }
  }, [checkAll]);

  function ordernarPorNome() {
    if (usuarios !== null && usuarios != undefined) {
      const users = [...usuarios];

      users.sort((a, b) => {
        if (a.nome.toLowerCase() < b.nome.toLowerCase()) {
          return -1;
        } else if (a.nome.toLowerCase() > b.nome.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });

      setUsuarios(users);
    }
  }

  function ordernarPorValor() {
    if (usuarios !== null && usuarios != undefined) {
      const users = [...usuarios];

      users.sort((a, b) => {
        if (a.valorCombinado > b.valorCombinado) {
          return -1;
        } else if (a.valorCombinado < b.valorCombinado) {
          return 1;
        } else {
          return 0;
        }
      });

      setUsuarios(users);
    }
  }

  function ordernarPorDia() {
    if (usuarios !== null && usuarios != undefined) {
      const users = [...usuarios];

      users.sort((a, b) => {
        if (Number(a.vencimento) < Number(b.vencimento)) {
          return -1;
        } else if (Number(a.vencimento) > Number(b.vencimento)) {
          return 1;
        } else {
          return 0;
        }
      });

      setUsuarios(users);
    }
  }

  function ordernarPorCidade() {
    if (usuarios !== null && usuarios != undefined) {
      const users = [...usuarios];

      users.sort((a, b) => {
        if (a.cidade.toLowerCase() > b.cidade.toLowerCase()) {
          return -1;
        } else if (a.cidade.toLowerCase() < b.cidade.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });

      setUsuarios(users);
    }
  }

  function ordernar(por) {
    switch (por) {
      case 'nome':
        ordernarPorNome();
        break;
      case 'valor':
        ordernarPorValor();
        break;
      case 'cidade':
        ordernarPorCidade();
        break;
      case 'dia':
        ordernarPorDia();
        break;
      default:
        ordernarPorNome();
        break;
    }
  }

  function deleteSelected() {
    Swal.fire({
      title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px;color:white">Remover estes ${selectedUsers.length} cliente(s)?</span>`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#ddd815',
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar',
      width: 300,
      heightAuto: false,
      imageUrl: trashIcon,
      imageWidth: 100,
      imageHeight: 100,
      background: '#1f1f1f'
    }).then((result) => {
      if (result.isConfirmed) {
        toast.error(`${selectedUsers.length} clientes foram removidos da lista!`, {
          position: "bottom-left",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });

        const newUsers = usuarios.filter(user => !selectedUsers.includes(user.id));
        saveClients(newUsers);
        setUsuarios(newUsers);
        setCheckAll(false);
      }
    });
  }

  function imprimirSelecionados() {
    navigate(`/clients-receipts`, { state: { ids: selectedUsers.map(user => user) } });
  }

  return (
    <PageContainer>

      <ClientsContainer className="clients-container">
        {usuarios && usuarios.length > 0 &&

          <FilterDiv>
            <div className="order-div">
              {size.width > 1055 && <p>Ordenar por </p>}
              <select ref={orderSelect} onChange={(e) => ordernar(e.target.value)} name="order" id="order">
                <option value="nome">Nome</option>
                <option value="valor">Valor Pago</option>
                <option value="cidade">Cidade</option>
                <option value="dia">Vencimento</option>
              </select>
              <RiListOrdered className="icon" />
            </div>
            <p>{size.width > 1055 ? 'Quantidade de clientes: ' : <MdGroups2/>}<span>{usuarios ? usuarios.length : 0}</span></p>
            <p>{size.width > 1055 ? 'Média por cliente: ' : <GiReceiveMoney/>} <span>{size.width > 1055 ? 'R$ ' : ''}{usuarios && usuarios.length > 0 ? (valorTotal / usuarios.length).toFixed(2).replace('.', ',') : 0}</span></p>
            <p>{size.width > 1055 ? 'Valor total: ' :  <BiMoneyWithdraw/>} <span className="price" >{size.width > 1055 ? 'R$ ' : ''}{valorTotal.toString().replace('.', ',')}</span></p>
            <p>{size.width > 1055 ? 'Vence hoje: ' : <BiTimeFive/>}<span>{vencemHoje} {vencemHoje > 0 && 'pessoa(s)'}</span></p>
          </FilterDiv>
        }

        {usuarios && usuarios.length > 0 &&
          <IndicatorsDiv>
            {
              size.width > 720 ?
              <>
                <p>Nome <BsPersonLinesFill className="icon" /></p>
                <p>Endereço <ImLocation className="icon" /></p>
                <p>Telefone <AiTwotonePhone className="icon" /></p>
                <input type="checkbox" checked={checkAll} onChange={(e) => setCheckAll(e.target.checked)} />
              </> :
               <input type="checkbox2" checked={checkAll} onChange={(e) => setCheckAll(e.target.checked)} />
            }
            
           
          </IndicatorsDiv>
        }


        {selectedUsers.length > 0 && <div className="selection-actions">
          <button onClick={deleteSelected}><RiDeleteBin6Fill /> Excluir Selecionados</button>
          <button onClick={imprimirSelecionados}><RiPrinterFill /> Imprimir Selecionados</button>
        </div>}
        {usuarios && usuarios.length > 0 && usuarios.map((user) => {
          let hide = false;

          if (user.nome.toLowerCase().includes(clientSearchValue.toLowerCase()) || user.id.toString() == clientSearchValue.toString()) {
            hide = true;
          }

          return (
            <Client show={hide} user={user} key={user.id} checked={checkAll} />
          );
        })}
        {usuarios !== null && usuarios !== undefined && usuarios.length == 0 && <h1 className="no-users-text">Não há nenhum cliente cadastrado ainda!</h1>}
      </ClientsContainer>
      <ViewClient />

    </PageContainer>
  );
}

const FilterDiv = styled.div`

    background-color: #202122;
    border-radius: 5px;
    color: white;
    width: 100%;
    max-width: 1174px;
    display: flex;
    height: 80px;
    align-items: center;
    padding-left: 10px;
    padding-right: 11px;
    border: 2px solid #ddd815;
    gap: 20px;
    justify-content: space-between;
    @media(max-width:536px)
    {
      gap: 3px;
    }

    @media(max-width: 888px)
    {
      border: 0;
      border-radius: 0;
    }

    
    .order-div{
        display: flex;
        gap: 10px;
        position: relative;
        align-items: center;
       
        

        select{
            appearance: none;
            padding-left: 5px;
            outline: 0;
            border-radius: 5px;
            height: 30px;
            cursor: pointer;
            width: 100px;
            margin-top: 4px;
            color: white;
            background-color: #202122;
            @media(max-width:536px)
            {
              width: 80px;
              font-size: 13px;
            }
        }

        .icon{
            position: absolute;
            right: 4px;
            top: 11px;
            pointer-events: none;
        }
    }

    button{
        cursor: pointer;
        border-radius: 5px;
        height: 40px;
        width: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background-color: white;
        color: #07bc0c;
        border: 0;
        font-weight: bold;
        transition: all 200ms;
        &:hover{
            color: #022904;
        }

    }

   P{
        font-size:18px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        .price{
          color: #07bc0c;
        }
    
        span
        {
            color: #ddd815;
            font-weight: bold;
        }
        &:nth-child(1)
        {
            span {
                color: blue;
            }
        }
        &:nth-child(5)
        {
            span {
                color: red;
            }
        }

        @media(max-width:536px)
        {
          font-size:18px;
        }
   }


`;

const ClientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  margin-top: 130px;

  justify-content: center;
  align-items: center;

  .no-users-text{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 30px;
    color: white;
    width: 100%;
    text-align: center;
    @media (max-width:400px) 
    {
      transition: all 200ms;
       font-size: 15px;
    }
  }

  .selection-actions{
    display: flex;
    gap: 20px;
    width: 100%;
    max-width: 1174px;
    justify-content: flex-end;
    align-items: center;

    button{
      padding: 10px 10px 10px 10px;
      border-radius: 20px;
      border: 1px solid rgba(0,0,0,0);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      color: white;
      background-color: #202122;

      &:hover{
        border: 1px solid #ddd815;
      }
    }
  }
`;

const PageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

const IndicatorsDiv = styled.div`

    background-color: #202122;
    border-radius: 5px;
    color: white;
    width: 100%;
    max-width: 1172px;
    display: flex;
    height: 40px;
    align-items: center;
    padding-left: 10px;
    padding-right: 11px;

    

    @media(max-width: 720px)
    {
      justify-content: flex-end;
    }

    @media(max-width: 888px)
    {
      border-right: 0;
      border-left: 0;
      border-radius: 0;
    }

    p{
        font-weight: bold;
    }

    p:nth-child(1)
    {
      width: 345px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    p:nth-child(2)
    {
      width: 545px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    p:nth-child(3)
    {
      width: 245px;
      display: flex;
      align-items: center;
      gap: 5px;
      .icon{
        margin-top: 2px;
      }
    }
    

    input,.checkbox2{
        width: 20px;
        height: 20px;
        cursor: pointer;
        
    }

    .checkbox2{
      
    }
`;

