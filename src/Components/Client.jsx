import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ClientsContext from '../Contexts/ClientsContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import trashIcon from '/trash.png';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { saveClients } from '../utils';


export default function Client(props) {
  const { setEditingClient, usuarios, setUsuarios, setViewingClient, setSelectedUsers, selectedUsers } = useContext(ClientsContext);

  const { user, checked } = props;
  const { nome, rua, contato, numero, bairro, cidade, vencimento } = user;
  const isChecked = useRef(null);
  const navigate = useNavigate();
  const today = new Date().getDate();


  useEffect(() => {
    isChecked.current.checked = checked;
  }, [checked])

  function setChecked(checked) {
    let sUsers = [...selectedUsers];

    if (checked) {
      sUsers.push(user.id);
      setSelectedUsers(sUsers);
    }
    else {
      sUsers = sUsers.filter(fuser => fuser != user.id)
      setSelectedUsers(sUsers);
    }
  }

  function edit(e) {
    e.stopPropagation();
    setEditingClient(user);
    navigate('/');
  }

  function deleteThis(e) {
    e.stopPropagation();
    Swal.fire({
      title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px">Remover ${nome}?</span>`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#07bc0c',
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar',
      width: 300,
      heightAuto: false,
      imageUrl: trashIcon,
      imageWidth: 100,
      imageHeight: 100,
    }).then((result) => {
      if (result.isConfirmed) {
        toast.error(`${user.nome} foi removido da lista`, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        const newUsers = usuarios.filter(fuser => fuser.id != user.id);
        saveClients(newUsers);
        setUsuarios(newUsers);
      }
    });
  }

  function view(e) {
    e.stopPropagation();
    setViewingClient(user);
  }

  return (
    <ClientDiv id='client' client_id={user.id} show={props.show.toString()} onClick={view} expires_today={(today == vencimento).toString()}>
      <p>{nome}</p>
      <p>{rua + ' ' + numero + ' - ' + bairro + ' - ' + cidade}</p>
      <p>{contato != '' ? contato : '( -- ) -------------'}</p>
      <div className='actions'>
        <FaEdit onClick={edit} className='edit-icon' />
        <RiDeleteBin6Fill onClick={deleteThis} className='delete-icon' />
        <div className='checkbox' onClick={(e) => e.stopPropagation()}>
          <input className='checkbox-input' ref={isChecked} type="checkbox" onClick={(e) => { e.stopPropagation(); setChecked(e.target.checked) }} />
        </div>
      </div>
    </ClientDiv>
  );
}


const ClientDiv = styled.div`
  
    background-color: #ffffff;
    border-radius: 5px;
    color: #5e5e5e;
    width: 100%;
    max-width: 1100px;
    display: ${(props) => props.show == 'true' ? 'flex' : 'none'};
    gap: 30px;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: content-box;
    border: 2px solid rgba(0,0,0,0);
    cursor: pointer;

    &:last-child
    {
      margin-bottom: 40px;
    }
    

    &:hover{
      border: 2px solid black;
    }


    p:nth-child(1)
    {
      width: 300px;
      color: ${(props) => props.expires_today == 'true' ? 'red' : 'black'};
      font-weight: ${(props) => props.expires_today == 'true' ? 'bold' : 'normal'};
    }

    p:nth-child(2)
    {
      width: 500px;
    }
    p:nth-child(3)
    {
      width: 127px;
    }
    

    .actions{
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 84px;
      position: relative;

      .edit-icon,.delete-icon{
        color: #07bc0c;
        cursor: pointer;
        font-size: 22px;
        flex-shrink: 0;

        &:hover{
          font-size: 26px;
        }
      }

      .delete-icon{
        color: red;
      }

      .checkbox{
          position: absolute;
          right: -60px;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 5px;
          cursor: auto;

          input{
            cursor: pointer;
            accent-color: #2686d4;
            width: 20px;
            height: 20px;
        }
      }

      
    }
`;