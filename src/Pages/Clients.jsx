import { styled } from "styled-components";
import Client from "../Components/Client";
import { useContext, useEffect, useRef, useState } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import ViewClient from "../Components/ViewClient";
import {AiTwotonePhone} from 'react-icons/ai';
import {ImLocation} from 'react-icons/im';
import {BsPersonLinesFill} from 'react-icons/bs';
import {RiListOrdered} from 'react-icons/ri';

export default function Clients() {
    const { usuarios ,setUsuarios,clientSearchValue } = useContext(ClientsContext);
    const [checkAll,setCheckAll] = useState(false);
    const [valorTotal,setValorTotal] = useState(0);
    const orderSelect = useRef(null);
    const today = new Date().getDate();

    useEffect(()=>{
        let value = 0;
       usuarios.forEach(usuario => {
            value +=Number(usuario.valorCombinado);
       });

       setValorTotal(value.toFixed(2));

       ordernar('nome');
    },[]);

    function ordernarPorNome()
    {
        if(usuarios !== null && usuarios != undefined)
        {
            const users = [...usuarios];
            
            users.sort((a, b) => {
                if (a.nome.toLowerCase()  < b.nome.toLowerCase() ) {
                  return -1;
                } else if (a.nome.toLowerCase()  > b.nome.toLowerCase() ) {
                  return 1;
                } else {
                  return 0;
                }
              });

              setUsuarios(users);
        }
    }

    function ordernarPorValor()
    {
        if(usuarios !== null && usuarios != undefined)
        {
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

    function ordernarPorDia()
    {
        if(usuarios !== null && usuarios != undefined)
        {
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

    function ordernarPorCidade()
    {
        if(usuarios !== null && usuarios != undefined)
        {
            const users = [...usuarios];
            
            users.sort((a, b) => {
                if (a.cidade.toLowerCase() > b.cidade.toLowerCase()) {
                  return -1;
                } else if (a.cidade.toLowerCase()  < b.cidade.toLowerCase() ) {
                  return 1;
                } else {
                  return 0;
                }
              });

              setUsuarios(users);
        }
    }

    function ordernar(por)
    {
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
                        <RiListOrdered className="icon"/>
                    </div>
                    <p>Quantidade de clientes: <span>{usuarios.length}</span></p>
                    <p>Média por cliente: <span>R$ {(valorTotal / usuarios.length).toFixed(2).replace('.',',')}</span></p>
                    <p>Valor total: <span>R$ {valorTotal.toString().replace('.',',')}</span></p>
                </FilterDiv>
                <IndicatorsDiv>
                    <p>Nome <BsPersonLinesFill className="icon"/></p>
                    <p>Endereço <ImLocation className="icon"/></p>
                    <p>Telefone <AiTwotonePhone className="icon"/></p>
                    <input type="checkbox" onChange={(e) => setCheckAll(e.target.checked)} />
                </IndicatorsDiv>
                {usuarios.length > 0 && usuarios.map((user) => {
                    let hide = false;
                   
                    if(user.nome.toLowerCase().includes(clientSearchValue.toLowerCase()))
                    {
                        hide = true;
                    }

                    return (
                        <Client show={hide} user={user} key={user.id} checked={checkAll}/>
                    );
                })}
            </ClientsContainer>
            <ViewClient/>
                
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
   }


`;

const ClientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  margin-top: 130px;
  margin-bottom: 1330px;
  justify-content: center;
  align-items: center;
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

