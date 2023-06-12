import React from 'react';
import styled from 'styled-components';
import print from 'ink-html';

export default function Client({ user: { nome, endereco, contato, formadepagamento } }) {
    return (
        <ClientDiv>
            <h1>Cliente</h1>
            <h2>{nome}</h2>
            <h3>{endereco}</h3>
            <h4>{contato}</h4>
            <h5>{formadepagamento}</h5>
            <input type="checkbox" className='check' />
            <button onClick={(e) => {print(e.target.parentElement);}}>Imprimir recibo</button>
        </ClientDiv>
    );
}


const ClientDiv = styled.div`
  background-color: #3b3b3b;
  border-radius: 5px;
  color: white;
  width: 300px;
  max-width: 300px;
  flex-shrink: 0;
  position: relative;
  .check{
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
`;