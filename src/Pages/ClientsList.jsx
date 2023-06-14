import { useContext, useEffect, useRef, useState } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
export default function ClientsList() {
    const { usuarios } = useContext(ClientsContext);
    const navigate = useNavigate();

    const [showBackButton,setShowBackButton] = useState(false);

    useEffect(() => {
        window.print();
        setShowBackButton(true);
    }, []);

    return (
        <PageContainer>
            { showBackButton && <button onClick={() => navigate('/clients')}>Voltar</button>}
            <ClientsContainer>
                <ListHeader>
                    <p>Dia</p>
                    <p>ID</p>
                    <p>Nome</p>
                    <p>Endereço</p>
                    <p>Valor</p>
                    <p></p>
                </ListHeader>
                {usuarios.map((usuario) => {
                    return (
                        <User>
                            <p>{usuario.vencimento}</p>
                            <p>{usuario.id}</p>
                            <p>{usuario.nome}</p>
                            <p>{usuario.rua + ' ' + usuario.numero + ' - ' + usuario.bairro + ' - ' + usuario.cidade}</p>
                            <p>R$ {usuario.valorCombinado}</p>
                            <p></p>
                        </User>
                    );
                })}
            </ClientsContainer>
        </PageContainer>
    );
}

const ListHeader = styled.div`
    display: flex;
    font-size: 20px;
    justify-content: flex-start;
    width: 100%;
    overflow: hidden;
    p{
        line-height: 30px;
        font-size: 13px;
        border-bottom: 1px solid black;
        padding-left: 4px;
        border-right: 1px solid black;
        border-top: 1px solid black;
        font-weight: bold;
        
        &:nth-child(1)
        {
            width: 30px;
            border-left: 1px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &:nth-child(2)
        {
            width: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        &:nth-child(3)
        {
            width: 140px;
        }
        &:nth-child(4)
        {
            width: 400px;
        }
        &:nth-child(5)
        {
            width: 65px;
            
        }
        &:nth-child(6)
        {
            min-width: 30px;
            font-size: 30px;
        }
    }
`;

const User = styled.div`
    display: flex;
    font-size: 20px;
    justify-content: flex-start;
    width: 100%;
    overflow: hidden;
    p{
        line-height: 30px;
        font-size: 13px;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        padding-left: 5px;
        padding-right: 5px;
        overflow: hidden;
        display: inline;
        white-space: nowrap;

        &:nth-child(1)
        {
            width: 30px;
            border-left: 1px solid black;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &:nth-child(2)
        {
            width: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            
        }
        &:nth-child(3)
        {
            width: 140px;
        }
        &:nth-child(4)
        {
            width: 400px;
            overflow: hidden;
        }
        &:nth-child(5)
        {
            width: 65px;
            overflow: hidden;
        }
        &:nth-child(6)
        {
            width: 30px;
            font-size: 30px;
        }
    }

`;

const PageContainer = styled.div`

    height: 100%;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    button{
        background-color: #07bc0c;
        border-radius: 50px;
        height: 40px;
        border: 1px solid white;
        cursor: pointer;
        transition: all 200ms;
        width: 100px;
        color: white;
        position: fixed;
        left: 20px;
        top: 20px;


        &:hover{
            color: #07bc0c;
            background-color: white;
            border: 1px solid #07bc0c;
        }
}

`;

const ClientsContainer = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;

`;