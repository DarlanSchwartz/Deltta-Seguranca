import { useContext, useEffect, useRef, useState } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import { styled } from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import logo from '/logotipo.png';
import logo2 from '/new-logo2.png';
import { converterValorPorExtenso, obterMesAtualPorExtenso, obterAnoAtual } from "../utils";
export default function ClientsReceipt() {
    const { usuarios } = useContext(ClientsContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [showBackButton, setShowBackButton] = useState(false);
    //{`${usuario.rua}, ${usuario.numero} - ${usuario.bairro} - ${usuario.cidade}`}
    useEffect(() => {
        setTimeout(() => {
            window.print();
            setShowBackButton(true);
        }, 1000);
    }, []);

    return (
        <PageContainer>
            {showBackButton && <button onClick={() => navigate('/clients')}>Voltar</button>}
            <ClientsContainer>
                {usuarios.map((usuario) => {
                    return (
                        <>
                            {location.state.ids.includes(usuario.id) &&

                                <ReceiptContainer key={usuario.id}>
                                    <img className="background-logo" src={logo2}/>
                                    <div className="logo">
                                        <div className="content">
                                            <img src={logo2} alt="" />
                                            <div className="main-info">
                                                <p>Fone: (51) 99607-8532</p>
                                                <p>email: segurancadeltta@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="value-and-id">
                                        <p>RECIBO Nº {usuario.id}</p>
                                        <p>VALOR: R$ {Number(usuario.valorCombinado).toFixed(2).replace('.', ',')}</p>
                                    </div>
                                    <div className="user-info">
                                        <p>Recebi(emos) de {usuario.nome}</p>
                                        <p>A quantida de: {converterValorPorExtenso(usuario.valorCombinado).toUpperCase()}</p>
                                    </div>
                                    <div className="redundant-info">
                                        <p>Valor Ref. a PRESTAÇÃO DE SERVIÇO DE MONITORAMENTO.</p>
                                        <p>e para clareza firmo(amos) o presente,</p>
                                        <p>{`${usuario.rua}, ${usuario.numero} - ${usuario.bairro} - ${usuario.cidade}`}</p>
                                    </div>
                                    <p className="day-info">Novo Hamburgo , {usuario.vencimento} de {obterMesAtualPorExtenso().toUpperCase()} de {obterAnoAtual()}.</p>
                                    
                                    <div className="final-info">
                                        <p>CPF/CNPJ:</p>
                                        <p>Emitente: </p>
                                        <p>Endereço: </p>
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
    width: 385px;
    height: 500px;
    background-color: white;
    border: 2px solid black;
    position: relative;

    .background-logo{
        width: 100%;
        position: absolute;
        opacity: 15%;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }

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

        .content
        {   
            display: flex;
            align-items: center;
            gap: 20px;
            height: 80%;
            img{
                height: 100%;
            }

            p{
                &:nth-child(2)
                {
                    margin-bottom: 10px;
                }
            }
        }
       
    }

    .main-info{
        display: flex;
        flex-direction: column;
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
        align-items: center;
        padding-left: 5px;
        font-size: 13px;
        width: 100%;
        gap: 7px;
        height: 60px;
        font-weight: bold;
    }

    .redundant-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 5px;
        font-size: 13px;
        width: 100%;
        gap: 7px;
        height: 90px;   
        font-weight: bold;
        P{
            &:nth-child(1)
            {
                font-size: 12px;
            }
            &:nth-child(3)
            {
                font-size: 12px;
                padding-top: 20px;
            }
        }
        span{
            font-weight: bold;
        }
    }

    .cpf-cnpj{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 5px;
        font-size: 13px;
        width: 100%;
        height: 40px;
        font-weight: bold;
    }

    .day-info{
        font-size: 13px;
        width: 100%;
        padding-left: 5px;
        height: 40px;
        display: flex;
        align-items: flex-end;
        padding-bottom: 2px;
        font-weight: bold;
    }

    .final-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 5px;
        font-size: 13px;
        padding-top: 60px;
        width: 100%;
        height: 50px;
        gap: 7px;
        font-weight: bold;
    }
`;