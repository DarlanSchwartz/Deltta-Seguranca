import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { BsPersonFillAdd } from 'react-icons/bs';
import { MdGroups2, MdPersonSearch } from 'react-icons/md';
import { useContext, useState } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import { RiPrinterFill } from 'react-icons/ri';


export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { editingClient, setEditingClient, usuarios, setUsuarios, setClientSearchValue } = useContext(ClientsContext);
    const [showSearchIcon, setShowSeachIcon] = useState(true);
    const [searchValue, setSearchValue] = useState('');


    function updateSearch(word) {
        setSearchValue(word);
        setClientSearchValue(word);
    }

    return (
        <>
            {location.pathname != '/clients-list' &&
                <Header>
                    {location.pathname === '/' ? <h1 className='title'>{editingClient ? 'Editar cliente' : 'Cadastrar cliente'}</h1> : <h1 className='title'>Clientes</h1>}
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
                        <RiPrinterFill onClick={() => { navigate('/clients-list'); setEditingClient(null); }} className="print-clients" />
                    </Actions>
                </Header>
            }
        </>
    );
}

const Header = styled.nav`

  position: fixed;
  top: 0px;
  
  background-color: white;
  width: 100%;
  height: 100px;
  
  border-bottom: 1px solid #07bc0c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  z-index: 2;

  h1{
    font-size: 40px;
    color: #07bc0c;
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
            color: #8ceb8f;
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
            border: 1px solid #07bc0c;
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
    color:  #07bc0c;
    cursor: pointer;
    &:hover{
        color: #67e26b;
    }
}

button{
    border: 0;
    background-color: white;
    border-radius: 20px;
    height: 40px;
    border: 1px solid #07bc0c;
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
        color: #07bc0c;
        transition: all 200ms;
    }

    .icon-add{
        font-size: 20px;
        color: #07bc0c;
        transition: all 200ms;
    }

    &:hover{
        color: white;
        background-color: #07bc0c;

        .icon-add,.icon-group{
            color: white;
        }
    }
}
`;