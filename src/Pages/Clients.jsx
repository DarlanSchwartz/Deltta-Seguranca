import { styled } from "styled-components";
import Client from "../Components/Client";
import { useContext } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import ViewClient from "../Components/ViewClient";

export default function Clients() {
    const { usuarios } = useContext(ClientsContext);

    return (
        <PageContainer>
            
            <ClientsContainer className="clients-container">
                {usuarios.length > 0 && usuarios.map((user) => {
                    return (
                        <Client user={user} key={user.id} />
                    );
                })}
            </ClientsContainer>

            <ViewClient/>
        </PageContainer>
    );
}

const ClientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  margin-top: 130px;
  justify-content: center;
  align-items: center;
`;

const PageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

