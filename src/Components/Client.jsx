import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ClientsContext from '../Contexts/ClientsContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import trashIcon from '/trash.png';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useWindowSize } from "@uidotdev/usehooks";
import { AiTwotonePhone } from 'react-icons/ai';
import { ImLocation } from 'react-icons/im';
import { BsPersonLinesFill } from 'react-icons/bs';
import { GetAllClients, RemoveClient } from '../API/requests';

export default function Client(props) {
  const { setEditingClient, usuarios, setUsuarios, setViewingClient, setSelectedUsers, selectedUsers } = useContext(ClientsContext);

  const { user, checked } = props;
  const { nome, rua, contato, numero, bairro, cidade, vencimento,id } = user;
  const adress = rua + ' ' + numero + ' - ' + bairro + ' - ' + cidade;
  const isChecked = useRef(null);
  const navigate = useNavigate();
  const today = new Date().getDate();
  const size = useWindowSize();


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
      title: `<span style="font-family: 'Mulish', sans-serif;font-size: 20px; color:white">Remover ${nome}?</span>`,
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

        const AfterRemove = (res)=>{
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
          setUsuarios(undefined);
          GetAllClients(null,setUsuarios);
        }
        
        RemoveClient(null,AfterRemove,id);
      }
    });
  }

  function view(e) {
    e.stopPropagation();
    setViewingClient(user);
  }

  return (
    <ClientDiv id='client' client_id={user.id} show={props.show.toString()} onClick={view} expires_today={(today == vencimento).toString()}>
      <div className='content'>
        {
          size.width > 720 ?

          <>
            <p className='name'>{nome && nome.substring(0, 30)}{nome && nome.length > 30 && '...'}</p>
            <p className='address'>{adress && adress.substring(0, 35)}{adress && adress.length > 35 && '...'}</p>
            <p className='contact'>{contato != '' ? contato : '( -- ) -------------'}</p>
          </> :
           <div className='column-info'>
            <p className='name'><BsPersonLinesFill className='i'/>- {nome && nome.substring(0, 30)}{nome && nome.length > 30 && '...'}</p>
            <p className='address'><ImLocation className='i'/>- {adress && adress.substring(0, 35)}{adress && adress.length > 35 && '...'}</p>
            <p className='contact'><AiTwotonePhone className='i'/>- {contato != '' ? contato : '( -- ) -------------'}</p>
          </div>
        }
        {
          size.width > 510 &&
          <div className='actions'>
          <FaEdit onClick={edit} className='edit-icon' />
          <RiDeleteBin6Fill onClick={deleteThis} className='delete-icon' />
        </div>
        }
       
      </div>
      <div className='checkbox' onClick={(e) => e.stopPropagation()}>
        <input className='checkbox-input' ref={isChecked} type="checkbox" onClick={(e) => { e.stopPropagation(); setChecked(e.target.checked) }} />
      </div>
    </ClientDiv>
  );
}


const ClientDiv = styled.div`
    max-width:1174px;
    width: 100%;
    display: ${(props) => props.show == 'true' ? 'flex' : 'none'};
    gap: 2px;
    height: fit-content;
    overflow: hidden;
    @media(max-width: 728px)
    {
      gap: 0;
    }
    &:hover{
      .content{
        border: 2px solid #ddd815;
      }
    }
    .content{
      cursor: pointer;
      border: 2px solid rgba(0,0,0,0);
      background-color: #202122;
      border-radius: 5px;
      color: white;
      max-width: calc(1174px - 42px);
      width: 100%;
      gap: 20px;
      height: 40px;
      align-items: center;
      justify-content: space-between;
      display: flex;
      padding-left: 10px;
      padding-right: 10px;
      @media(max-width: 728px)
      {
        border-radius: 0;
      }

      @media(max-width: 888px)
      {
        min-height: 80px;
        max-height: 120px;
        height: fit-content;
      }

      .column-info{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;
        overflow: hidden;
        .i{
          padding-top: 5px;
          padding-right: 5px;
        }
        p{
          max-width: 100%;
          overflow: hidden;
          line-clamp: 1;
          white-space: nowrap;
        }
      }

      p{
        width: 100%;
      }

      .contact{
        max-width: 147px;
      }
      .address{
        max-width: 540px;
      }

      .name{
        max-width: 320px;
      }
    }

    .checkbox{
          background-color: #202122;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          min-width: 40px;
          min-height: 40px;
          border-radius: 5px;
         
          cursor: auto;

          @media(max-width: 720px)
          {
            width: auto;
          }

          @media(max-width: 888px)
          {
            height: 100%;
          }
          @media(max-width: 720px)
          {
            border-radius: 0;
          }
          input{
            cursor: pointer;
            accent-color: #2686d4;
            width: 22px;
            height: 22px;

            @media(max-width: 720px)
            {
              margin-right: 5px;
            }
        }
      }

    &:last-child
    {
      margin-bottom: 40px;
    }

    p{
      width: 100%;
    }

    p:nth-child(1)
    {
     
      color: ${(props) => props.expires_today == 'true' ? 'red' : 'white'};
      font-weight: ${(props) => props.expires_today == 'true' ? 'bold' : 'normal'};
    }

    

    .actions{
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 84px;
      position: relative;

      .edit-icon,.delete-icon{
        color: #ddd815;
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
    }
`;