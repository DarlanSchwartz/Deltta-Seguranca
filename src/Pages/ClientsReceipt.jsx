import { useContext, useEffect, useRef, useState } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import { styled } from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import logo from '/logotipo.png';
import { converterValorPorExtenso , obterMesAtualPorExtenso , obterAnoAtual} from "../utils";
export default function ClientsReceipt() {
    const { usuarios } = useContext(ClientsContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [showBackButton,setShowBackButton] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            window.print();
            setShowBackButton(true);
        }, 1000);
    }, []);

    return (
        <PageContainer>
            { showBackButton && <button onClick={() => navigate('/clients')}>Voltar</button>}
            <ClientsContainer>
                {usuarios.map((usuario) => {
                    return (
                        <>
                        {   location.state.ids.includes(usuario.id) &&
                            
                            <ReceiptContainer key={usuario.id}>
                            <div className="logo">
                                <img src={logo} alt="" />
                            </div>
                            <div className="main-info">
                                <p>MONITORAMENTO E PORTARIA 24hrs</p>
                                <p>Fone:(51) 99067-8532</p>
                            </div>
                            <div className="value-and-id">
                                <p>RECIBO Nº {usuario.id}</p>
                                <p>VALOR: R$ {usuario.valorCombinado.toFixed(2).replace('.',',')}</p>
                            </div>
                            <div className="user-info">
                                <p>Recebemos de {usuario.nome}</p>
                                <p>End: {`${usuario.rua}, ${usuario.numero} - ${usuario.bairro} - ${usuario.cidade}`}</p>
                            </div>
                            <div className="redundant-info">
                                <p>A quantida de: {converterValorPorExtenso(usuario.valorCombinado)}</p>
                                <p>Proveniente de <span>MONITORAMENTO</span></p>
                            </div>
                            <p className="day-info">Novo Hamburgo , {usuario.vencimento} de {obterMesAtualPorExtenso().toUpperCase()} de {obterAnoAtual()}</p>
                            <div className="redundant-info2">
                                <p>{usuario.nome} ???</p>
                                <p>OBS:Este recibo será validado ASSINADO ou CARIMBADO</p>
                            </div>
                        </ReceiptContainer>
                        }
                        </>
                    );
                })}
            </ClientsContainer>
        </PageContainer>
    );
}

const PageContainer = styled.div`

    width: 100%;
    min-height: 100%;
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
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
    background-color: white;
    gap: 3px;
    max-width: 840px;
    

`;

const ReceiptContainer = styled.div`
    width: 370px;
    height: 410px;
    background-color: white;
    border: 2px solid black;

    &:nth-child(4n+5) {
    
        margin-top: 300px;
    }

    &:nth-child(4n+6){
        margin-top: 300px;
    }

    .logo{
        width: 100%;
        height: 60px;
        border-bottom:2px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            height: 80%;
        }
    }

    .main-info{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        font-weight: bold;
        font-size: 13px;
        gap: 5px;
        width: 100%;
        height: 60px;
    }

    .value-and-id{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding-top: 30px;
        font-weight: bold;
        font-size: 13px;
        width: 100%;
        gap:50px;
        height: 60px;
    }

    .user-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 5px;
        font-size: 13px;
        width: 100%;
        gap: 7px;
        height: 60px;
    }

    .redundant-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 5px;
        font-size: 13px;
        width: 100%;
        gap: 7px;
        height: 60px;   
        span{
            font-weight: bold;
        }
    }

    .day-info{
        font-size: 13px;
        width: 100%;
        padding-left: 5px;
        border-bottom: 2px solid black;
        height: 60px;
        display: flex;
        align-items: flex-end;
        padding-bottom: 2px;
    }

    .redundant-info2{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 5px;
        font-size: 13px;
        width: 100%;
        height: 50px;
        gap: 7px;

        p{
            font-weight: bold;
            align-self: center;

            &:nth-child(2)
            {
                font-size: 10px;
                align-self:self-start;
            }
        }
    }
`;