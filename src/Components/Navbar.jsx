import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { BsPersonFillAdd } from 'react-icons/bs';
import { MdGroups2, MdPersonSearch } from 'react-icons/md';
import { useContext, useState } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import { RiPrinterFill } from 'react-icons/ri';
import logo from '/new-logo2.png';
import Swal from "sweetalert2";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { editingClient, setEditingClient, setClientSearchValue, usuarios } = useContext(ClientsContext);
    const [showSearchIcon, setShowSeachIcon] = useState(true);
    const [searchValue, setSearchValue] = useState('');


    function updateSearch(word) {
        setSearchValue(word);

        if (usuarios !== null && usuarios !== undefined && usuarios.length > 0) {
            setClientSearchValue(word);
        }
    }

    function printClientsList() {
        if (usuarios !== null && usuarios !== undefined && usuarios.length > 0) {
            navigate('/clients-list');
            setEditingClient(null);
        }
        else {
            Swal.fire({
                title: `<span style="font-family: 'Mulish', sans-serif;font-size: 14px; color:white">Ainda não há nenhum cliente!</span>`,
                showCancelButton: false,
                confirmButtonColor: '#1f1f1f',
                confirmButtonText: 'Ok',
                cancelButtonText: 'Cancelar',
                width: 280,
                heightAuto: false,
                imageWidth: 100,
                imageHeight: 100,
                background: '#313338'
            });
        }
    }

    return (
        <>
            {location.pathname != '/clients-list' && location.pathname != '/clients-receipts' &&
                <Header>
                    <div className="logo-container">
                        <img className="logo" src={logo} alt="logo" onClick={()=> navigate('/clients')} />
                        {location.pathname === '/' ? <h1 className='title'>{editingClient ? 'Editar cliente' : 'Cadastrar cliente'}</h1> : <h1 className='title'>Clientes</h1>}
                    </div>
                    {location.pathname !== '/' &&
                        <SearchBar>
                            <div className="input-container">
                                <input value={searchValue} onChange={(e) => updateSearch(e.target.value)} type="text" placeholder="Pesquisar.." onFocus={() => setShowSeachIcon(false)} onBlur={() => setShowSeachIcon(true)} />
                                <MdPersonSearch className={`search-icon ${!showSearchIcon ? 'hide' : ''}`} />
                            </div>
                        </SearchBar>}
                    <Actions>
                        <button onClick={() => { navigate('/clients'); setEditingClient(null); }}><MdGroups2 className="icon-group" />Clientes</button>
                        <button onClick={() => navigate('/')}><BsPersonFillAdd className="icon-add" /> Cadastrar cliente</button>
                        <RiPrinterFill onClick={printClientsList} className="print-clients" />
                    </Actions>
                </Header>
            }
        </>
    );
}

const Header = styled.nav`

  position: fixed;
  top: 0px;
  
  background-color: #202122;
  width: 100%;
  height: 100px;
  
  border-bottom: 1px solid #ddd815;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  z-index: 2;

  .logo-container{
    display: flex;
    height: 100%;
    align-items: center;
    gap: 20px;
  }

  .logo{
    height: 70%;
    cursor: pointer;
  }

  h1{
    font-size: 40px;
    color: #ddd815;
    flex-shrink: 0;
  }

`;

const SearchBar = styled.div`
    z-index: 3;
    display: flex;
    width: 100%;

    justify-content: center;
    align-items: center;
    

    .input-container{
        position: relative;
        max-width: 400px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .search-icon{
            color: #ddd815;
            font-size: 20px;
            position: absolute;
            right: 20px;
            top: 10px;
            transition: all 200ms;
        }

        .hide{
           opacity: 0;
        }

        input{
            height: 40px;
            width: 100%;
            border-radius: 20px;
            border: 1px solid #ddd815;
            padding-left: 20px;
            min-width: 120px;
            margin-right: 10px;
            margin-left: 10px;

            &:focus{
                outline: none;
            }
        }
    }

`;

const Actions = styled.div`
display:  flex;
gap: 10px;
max-width: 340px;
width: 100%;

.print-clients{
    font-size: 40px;
    color:  #ddd815;
    cursor: pointer;
    &:hover{
        color: #979313;
    }
}

button{
    border: 0;
    color: white;
    background-color: #313338;
    border-radius: 20px;
    height: 40px;
    border: 1px solid #ddd815;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    transition: all 200ms;
    max-width: 158px;
    display:flex;
    align-items: center;
    gap: 10px;

    .icon-group{
        font-size: 25px;
        color: #ddd815;
        transition: all 200ms;
    }

    .icon-add{
        font-size: 20px;
        color: #ddd815;
        transition: all 200ms;
    }

    &:hover{
        color: #313338;
        background-color: #ddd815;

        .icon-add,.icon-group{
            color: #313338;
        }
    }
}
`;