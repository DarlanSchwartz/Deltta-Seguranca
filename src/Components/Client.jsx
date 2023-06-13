import React, { useContext } from 'react';
import styled from 'styled-components';
import ClientsContext from '../Contexts/ClientsContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import trashIcon from '/trash.png';
import {FaEdit} from 'react-icons/fa';
import {RiDeleteBin6Fill} from 'react-icons/ri';


export default function Client({ user }) {
  const {setEditingClient,usuarios,setUsuarios,setViewingClient} = useContext(ClientsContext); 
  const  { nome, rua, contato , numero,bairro,cidade} = user;
  const navigate = useNavigate();

  function edit(e)
  {
    e.stopPropagation();
    setEditingClient(user);
    navigate('/');
  }

  function deleteThis(e)
  {
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
      imageUrl:trashIcon,
      imageWidth: 100,
      imageHeight: 100,
    }).then((result) => {
      if (result.isConfirmed) {
        setUsuarios(usuarios.filter(fuser => fuser.id != user.id));
      }
    });
  }

  function view(e)
  {
    e.stopPropagation();
    setViewingClient(user);
  }

  return (
        <ClientDiv onClick={view}>
            <p>{ nome}</p>
            <p>{rua + ' ' + numero + ' - ' + bairro + ' - ' + cidade }</p>
            <p>{contato}</p>
            <div className='actions'>
              <FaEdit onClick={edit} className='edit-icon'/>
              <RiDeleteBin6Fill onClick={deleteThis} className='delete-icon'/>
              <input type="checkbox" onClick={(e) => e.stopPropagation()} />
            </div>
        </ClientDiv>
    );
}


const ClientDiv = styled.div`
  
    background-color: #ffffff;
    border-radius: 5px;
    color: #5e5e5e;
    width: 100%;
    max-width: 900px;
    display: flex;
    gap: 30px;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: content-box;
    border: 2px solid rgba(0,0,0,0);
    cursor: pointer;

    &:hover{
      border: 2px solid black;
    }
    

    .actions{
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 84px;

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

      input{
        cursor: pointer;
        accent-color: #2686d4;
        width: 20px;
        height: 20px;
      }
    }
`;