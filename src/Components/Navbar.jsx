import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export default function Navbar()
{
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Header>
            {location.pathname == '/' ? <h1 className='title'>Cadastrar cliente</h1> : <h1 className='title'>Clientes</h1>}
            <Actions>
                <button onClick={()=> navigate('/clients')}>Clientes</button>
                <button onClick={()=> navigate('/')}>Cadastrar cliente</button>
            </Actions>
        </Header>
    );
}

const Header = styled.div`

  position: fixed;
  top: 0px;
  
  background-color: white;
  width: 100%;
  height: 100px;
  
  border-bottom: 1px solid #10461b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;

  h1{
    font-size: 40px;
    color: #10461b;
  }

`;

const Actions = styled.div`
display:  flex;
gap: 10px;

button{
    border: 0;
    background-color: white;
    border-radius: 20px;
    height: 40px;
    border: 1px solid #10461b;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    transition: all 200ms;

    &:hover{
        color: white;
        background-color: #10461b;
    }
}
`;