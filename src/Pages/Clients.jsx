import { styled } from "styled-components";
import Client from "../Components/Client";
import { useContext, useEffect, useRef, useState } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import ViewClient from "../Components/ViewClient";
import { AiTwotonePhone } from 'react-icons/ai';
import { ImLocation } from 'react-icons/im';
import { BsPersonLinesFill } from 'react-icons/bs';
import { RiPrinterFill ,RiDeleteBin6Fill,RiListOrdered } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import trashIcon from '/trash.png';

export default function Clients() {
  const { usuarios, setUsuarios, clientSearchValue,setSelectedUsers,selectedUsers } = useContext(ClientsContext);
  const [checkAll, setCheckAll] = useState(false);
  const [valorTotal, setValorTotal] = useState(0);
  const [vencemHoje, setVencemHoje] = useState(0);
  const orderSelect = useRef(null);
  const today = new Date().getDate();

  useEffect(() => {
    let value = 0;
    let value2 = 0;
    usuarios.forEach(usuario => {
      value += Number(usuario.valorCombinado);

      if(usuario.vencimento == today)
      {
        value2++;
      }
    });

    setValorTotal(value.toFixed(2));
    
    setVencemHoje(value2);
  }, [usuarios]);

  useEffect(() => {
    ordernar('nome');
  }, []);

  useEffect(()=>{
    
    if(checkAll)
    {
      console.log('Selected all');
      setSelectedUsers(usuarios.map(usuario=> {return usuario.id}));
    }
    else
    {
      console.log('Deselected all');
      setSelectedUsers([]);
    }
  },[checkAll])

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
        if (a.vencimento < b.vencimento) {
          return -1;
        } else if (a.vencimento > b.vencimento) {
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

  function deleteSelected()
  {
      Swal.fire({
        title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px">Remover estes ${selectedUsers.length} cliente(s)?</span>`,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#07bc0c',
        confirmButtonText: 'Remover',
        cancelButtonText: 'Cancelar',
        width: 300,
        heightAuto: false,
        imageUrl:trashIcon,
        imageWidth: 100,
        imageHeight: 100,
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
            setUsuarios(newUsers);
            setCheckAll(false);
        }
      });
  }

  return (
    <PageContainer>

      <ClientsContainer className="clients-container">
        <FilterDiv>
          <div className="order-div">
            <p>Ordenar por </p>
            <select ref={orderSelect} onChange={(e) => ordernar(e.target.value)} name="order" id="order">
              <option value="nome">Nome</option>
              <option value="valor">Valor Pago</option>
              <option value="cidade">Cidade</option>
              <option value="dia">Vencimento</option>
            </select>
            <RiListOrdered className="icon" />
          </div>
          <p>Quantidade de clientes: <span>{usuarios.length}</span></p>
          <p>Média por cliente: <span>R$ {(valorTotal / usuarios.length).toFixed(2).replace('.', ',')}</span></p>
          <p>Valor total: <span>R$ {valorTotal.toString().replace('.', ',')}</span></p>
          <p>Vence hoje: <span>{vencemHoje} {vencemHoje > 0 && 'pessoa(s)'}</span></p>
        </FilterDiv>
        
        <IndicatorsDiv>
          <p>Nome <BsPersonLinesFill className="icon" /></p>
          <p>Endereço <ImLocation className="icon" /></p>
          <p>Telefone <AiTwotonePhone className="icon" /></p>
          <input type="checkbox" checked={checkAll} onChange={(e) => setCheckAll(e.target.checked)} />
        </IndicatorsDiv>
        {selectedUsers.length > 0 && <div className="selection-actions">
          <button onClick={deleteSelected}><RiDeleteBin6Fill/> Excluir Selecionados</button>
          <button onClick={()=> alert("Isso ainda não faz nada!")}><RiPrinterFill/> Imprimir Selecionados</button>
        </div>}
        {usuarios.length > 0 && usuarios.map((user) => {
          let hide = false;

          if (user.nome.toLowerCase().includes(clientSearchValue.toLowerCase()) || user.id.toString() == clientSearchValue.toString()) {
            hide = true;
          }

          return (
            <Client show={hide} user={user} key={user.id} checked={checkAll} />
          );
        })}
      </ClientsContainer>
      <ViewClient />

    </PageContainer>
  );
}

const FilterDiv = styled.div`

    background-color: #ffffff;
    border-radius: 5px;
    color: #5e5e5e;
    width: 100%;
    max-width: 1174px;
    margin-left: 48px;
    display: flex;
    height: 80px;
    align-items: center;
    padding-left: 10px;
    padding-right: 11px;
    border: 2px solid #07bc0c;
    gap: 20px;
    justify-content: space-between;

    
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
            margin-top: 5px;
        }

        .icon{
            position: absolute;
            right: 3px;
            top: 12px;
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
    
        span
        {
            color: #07bc0c;
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

  .selection-actions{
    display: flex;
    gap: 20px;
    width: 100%;
    max-width: 1220px;
    justify-content: flex-end;
    align-items: center;
    padding-left: 40px;

    button{
      padding: 10px 10px 10px 10px;
      border-radius: 20px;
      border: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
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

    background-color: #ffffff;
    border-radius: 5px;
    color: #5e5e5e;
    width: 100%;
    max-width: 1172px;
    margin-left: 48px;
    display: flex;
    height: 40px;
    align-items: center;
    padding-left: 10px;
    padding-right: 11px;

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
    

    input{
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
`;

