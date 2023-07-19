import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { MdGroups2, MdPersonSearch } from 'react-icons/md';
import { useContext, useState } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import { RiPrinterFill } from 'react-icons/ri';
import { BsPersonFillAdd,BsThreeDotsVertical ,BsFiletypeTxt} from 'react-icons/bs';
import {FaReceipt} from 'react-icons/fa';
import logo from '/new-logo2.png';
import Swal from "sweetalert2";
import { saveClientsTextFile } from "../utils";
import { useWindowSize } from "@uidotdev/usehooks";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { editingClient, setEditingClient, setClientSearchValue, usuarios } = useContext(ClientsContext);
    const [showSearchIcon, setShowSeachIcon] = useState(true);
    const [showDotsDropdown, setShowDotsDropdown] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const size = useWindowSize();


    function updateSearch(word) {
        setSearchValue(word);

        if (usuarios !== null && usuarios !== undefined && usuarios.length > 0) {
            setClientSearchValue(word);
        }
    }

    function printReceipts(e) {
        e.stopPropagation();
        navigate(`/clients-receipts`, { state: { ids: usuarios.map(user => user.id) } });
    }

    function printClientsList(e) {
        e.stopPropagation();

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
                    <div className="logo-container" onClick={()=>setShowDotsDropdown(false)}>
                        <img className="logo" src={logo} alt="logo" onClick={()=> navigate('/clients')} />
                        {location.pathname === '/' ? <h1 className='title'>{editingClient ? 'Editar cliente' : 'Cadastrar cliente'}</h1> : <h1 className='title'>{size.width > 390 ? 'Clientes' : ''}</h1>}
                    </div>
                    {location.pathname !== '/' &&
                        <SearchBar  onClick={()=>setShowDotsDropdown(false)}>
                            <div className="input-container" onClick={()=>setShowDotsDropdown(false)}>
                                <input value={searchValue} onChange={(e) => updateSearch(e.target.value)} type="text" placeholder="Pesquisar.." onFocus={() => {setShowSeachIcon(false); setShowDotsDropdown(false)}} onBlur={() => setShowSeachIcon(true)} />
                                <MdPersonSearch className={`search-icon ${!showSearchIcon ? 'hide' : ''}`} />
                            </div>
                        </SearchBar>}
                    <Actions>
                        <button onClick={() => { navigate('/clients'); setEditingClient(null);setShowDotsDropdown(false)}}><MdGroups2 className="icon-group" />{size.width > 715 ? 'Clientes' : ''}</button>
                        <button onClick={() => {navigate('/'); setShowDotsDropdown(false)}}><BsPersonFillAdd className="icon-add" />{size.width > 920  ? 'Cadastrar cliente' : size.width > 720 ? 'Cadastrar' : ''}</button>
                        <BsThreeDotsVertical onClick={()=>setShowDotsDropdown(!showDotsDropdown)} className="three-dots" />
                        {showDotsDropdown && 
                        <OptionsDropdown onBlur={()=>setShowDotsDropdown(false)}>
                            <button className="print" onClick={printClientsList}><RiPrinterFill/>Lista de clientes</button>
                            <button className="print" onClick={printReceipts}><FaReceipt/>Recibo dos clientes</button>
                            <button className="print" onClick={(e)=> {saveClientsTextFile(usuarios); e.stopPropagation();}}><BsFiletypeTxt/>Backup.txt</button>
                        </OptionsDropdown>}
                    </Actions>
                </Header>
            }
        </>
    );
}

const OptionsDropdown = styled.div`

    width: 200px;
    height: auto;
    position: fixed;
    top: 100px;
    right: 0;
    background-color: #202122;
    border-bottom: 1px solid #ddd815;
    border-left: 1px solid #ddd815;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    border-bottom-left-radius: 10px;

    .print{
        width: 200px;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
        justify-content: center;
        max-width: 100%;
    }
`;

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

  @media (max-width:510px) 
    {
        padding-left: 10px;
    }

  .logo-container{
    display: flex;
    height: 100%;
    align-items: center;
    gap: 20px;
    @media (max-width:510px) 
    {
        gap: 10px;
    }
  }

  .logo{
    height: 70%;
    cursor: pointer;
    @media (max-width:510px) 
    {
        height: 50%;
    }
  }

  h1{
    font-size: 40px;
    color: #ddd815;
    flex-shrink: 0;
    transition: all 200ms;

    @media (max-width:805px) 
    {
        font-size: 30px;
    }

    @media (max-width:510px) 
    {
       font-size: 18px;
    }
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
justify-content: flex-end;

@media (max-width:510px) 
{
    max-width: fit-content;
    gap: 5px;
}

.three-dots{
    font-size: 35px;
    padding-top: 5px;
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