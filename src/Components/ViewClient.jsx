import { useContext, useState } from "react";
import { styled } from "styled-components";
import ClientsContext from "../Contexts/ClientsContext";
import { BsFillPrinterFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import trashIcon from '/trash.png';
import { saveClients } from "../utils";

export default function ViewClient() {
    const { usuarios, setUsuarios, viewingClient, setViewingClient, setEditingClient } = useContext(ClientsContext);

    const navigate = useNavigate();

    function edit(e) {
        e.stopPropagation();
        setEditingClient(viewingClient);
        setViewingClient(null);
        navigate('/');
    }

    function deleteThis(e) {
        e.stopPropagation();
        Swal.fire({
            title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px;color:white">Remover ${viewingClient.nome}?</span>`,
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
            background:'#1f1f1f'
        }).then((result) => {
            if (result.isConfirmed) {
                const newUsers = usuarios.filter(fuser => fuser.id != viewingClient.id);
                saveClients(newUsers);
                setUsuarios(newUsers);
                setViewingClient(null);
            }
        });
    }

    function printThis(e) {
        e.stopPropagation();
        navigate(`/clients-receipts`, { state: { ids: [viewingClient.id] } });
        setViewingClient(null);
    }

    return (
        <>
            {viewingClient &&
                <>
                    <Modal onClick={() => setViewingClient(null)}></Modal>
                    <ViewClientDiv onClick={(e) => e.stopPropagation()}>
                        <p><strong>ID: </strong> {viewingClient.id}</p>
                        <p><strong>Nome: </strong> {viewingClient.nome}</p>
                        <p><strong>Endereço: </strong> {viewingClient.rua + ' ' + viewingClient.numero + ' - ' + viewingClient.bairro + ' - ' + viewingClient.cidade}</p>
                        <p><strong>Contato 1: </strong> {viewingClient.contato != '' ? viewingClient.contato : '(--) ---- ----'}</p>
                        {viewingClient.contato2 != '' && <p><strong>Contato 2: </strong> {viewingClient.contato2}</p>}
                        <p><strong>Forma de pagamento: </strong> {viewingClient.formadepagamento}</p>
                        <p><strong>Vencimento dia: </strong> {viewingClient.vencimento}</p>
                        <p><strong>Valor combinado: </strong> <em> R$ {viewingClient.valorCombinado}</em></p>
                        <p className="obs"><strong>Obs: </strong>{viewingClient.observacao == '' ? '--------' : viewingClient.observacao}</p>
                        <button onClick={printThis}><BsFillPrinterFill />Imprimir Recibo</button>
                        <div className="actions">
                            <FaEdit onClick={edit} className="edit-btn" />
                            <RiDeleteBin6Fill onClick={deleteThis} className="delete-btn" />
                        </div>
                    </ViewClientDiv>
                </>
            }
        </>
    );
}

const ViewClientDiv = styled.div`
    max-width: 600px;
    color: white;
    max-height: 600px;
    min-width: 300px;
    width: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-55%);
    background-color: #202122;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 20px 20px;
    gap: 5px;
    overflow: hidden;
    z-index:3;

    .obs{
        width:70%;
    }

    p{
        &:nth-child(1)
        {
            margin-right: 80px;
        }
    }

    em{
        color: #07bc0c;
        font-weight: bold;
    }

    button{
        color:black;
            border: 1px solid #202122;
            background-color: white;
        width: 140px;
        position: absolute;
        right: 10px;
        bottom: 10px;
        cursor: pointer;
        font-weight: bold;
        height: 30px;
        padding: 0 5px 0 5px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        transition: all 200ms;
        &:hover{
            

            border: 1px solid white;
        background-color: #202122;
        color: white;
        }
    }

    .actions{
        position: absolute;
        right: 10px;
        top: 10px;
        display: flex;
        gap: 5px;

        .edit-btn,.delete-btn{
            cursor: pointer;
            font-size: 17px;
            &:hover{
                font-size: 19px;
            }
        }

        .edit-btn{
            color: #ddd815;
        }
        .delete-btn{
            color: red;
        }
    }
`;

const Modal = styled.div`

    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    position: fixed;
    left: 0;
    top: 0;
    z-index:2;
`;