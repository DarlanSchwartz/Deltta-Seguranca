import { styled } from "styled-components";
import Client from "../Components/Client";
import { useContext } from "react";
import ClientsContext from "../Contexts/ClientsContext";

export default function Clients() {
    const { usuarios } = useContext(ClientsContext);

    return (
        <PageContainer>
            <ClientsContainer>
                {usuarios.length > 0 && usuarios.map((user) => {
                    return (
                        <Client user={user} key={user.id} />
                    );
                })}
            </ClientsContainer>
        </PageContainer>
    );
}

const ClientsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 100%;
  margin-top: 40px;
  margin-left: 20px;
`;

const PageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
flex-direction: column;
`;