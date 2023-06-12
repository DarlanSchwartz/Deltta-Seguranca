import { useContext, useState, useEffect, useRef } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import { styled } from "styled-components";
import { formatarTelefone } from "../utils";

export default function RegisterClient() {
    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [numero, setNumero] = useState('');
    const [contato, setContato] = useState('');
    const [contato2, setContato2] = useState('');
    const [observacao, setObservacao] = useState('');
    const [valorCombinado, setValorCombinado] = useState('');
    // const test = useRef();
    // input need ref={test}
    // useEffect(()=>{
    //     if(test)
    //     {
    //       test.current.setCustomValidity('Paaaaaaaaaaaaaaaae campo.');
    //     }
    //  },[])


    const formadepagamento = useRef(null);
    const [podeCadastrar, setPodeCadastrar] = useState(false);
    const { usuarios, setUsuarios } = useContext(ClientsContext);

    

    useEffect(() => {
        if (
        nome != '' &&
         rua != '' && 
         contato != '' && 
         valorCombinado !='' && valorCombinado != 'R$ 0' && valorCombinado != 'R$ ' && valorCombinado != ' ' && 
         numero != 0  && numero != '' && 
         bairro != '' && 
         cidade != '')
        {
            setPodeCadastrar(true);
        }
        else {
            setPodeCadastrar(false);
        }
    }, [nome, rua, contato,valorCombinado,numero,bairro,cidade]);

    function cadastrarCliente() {
        if (!podeCadastrar) {
            alert('Pra que bugar o site?')
            return;
        }

        let clientIds = [];
        let id = 0;

        if (usuarios.length > 0) {
            usuarios.forEach(user => {
                clientIds.push(user.id);
            });

            do {
                id = Math.floor(Math.random() * 1001);
            } while (clientIds.includes(id));
        }

        const newObj = {
            id: id,
            nome: nome,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            contato: contato.toString(),
            contato2: contato2.toString(),
            formadepagamento: formadepagamento.current.value,
            valorCombinado:valorCombinado,
            observacao: observacao
        };

        console.log(newObj);

        setUsuarios([...usuarios, newObj]);
        limparCampos();
    }

    function formatValorCombinado()
    {
        if(valorCombinado == '')
        {
            return valorCombinado;
        }

        return 'R$ ' + valorCombinado;
    }

    function limparCampos()
    {
        setNome('');
        setRua('');
        setBairro('');
        setNumero('');
        setCidade('');
        setContato('');
        setContato2('');
        setObservacao('');
        setPodeCadastrar(false);
        setValorCombinado(0);
        formadepagamento.current.value = 'Dinheiro/Pix';
    }

    return (
        <StyledForm onSubmit={(e) => { e.preventDefault(); cadastrarCliente(); }}>
            <label  htmlFor="nome">Nome</label>
            <input  required value={nome} onChange={(e) => setNome(e.target.value)} id='nome' name='nome' type='text' placeholder='Ex: João da Silva Sauro' />
            <label htmlFor="rua">Rua</label>
            <input required value={rua} onChange={(e) => setRua(e.target.value)} type="text" id='rua' name='rua' placeholder='Ex: Avenida das dores' />
            <div className="adress-labels-elements-container">
                <label htmlFor="cidade">Cidade</label>
                <label htmlFor="bairro">Bairro</label>
                <label htmlFor="numero">Numero</label>
            </div>
            <div className="adress-elements-container">
                <input required value={cidade} onChange={(e) => setCidade(e.target.value)} type="text" id='cidade' name='cidade' placeholder='Ex: Estância Velha' />
                <input required value={bairro} onChange={(e) => setBairro(e.target.value)} type="text" id='bairro' name='bairro' placeholder='Ex: Bairro das Rosas' />
                <input required value={numero} onChange={(e) => setNumero(e.target.value)} type="number" id='numero' name='numero' placeholder='Ex: 1032' />
            </div>
            <div className="label-contatos-container">
                <label htmlFor="contato1">Contato 1</label>
                <label htmlFor="contato2">Contato 2</label>
            </div>
            <div className="contatos">
                <input required className="contato" value={contato} onChange={(e) => setContato(formatarTelefone(e.target.value))} type="text" name='contato1' id='contato1' placeholder='(51) 99999-9999' pattern='\(\d{2}\) \d{5}-\d{4}' maxLength={15} />
                <input className="contato" value={contato2} onChange={(e) => setContato2(formatarTelefone(e.target.value))} type="text" name='contato2' id='contato2' placeholder='(51) 99999-9999' pattern='\(\d{2}\) \d{5}-\d{4}' maxLength={15} />
            </div>
            <div className="payment-labels-container">
                <label htmlFor="valor">Valor</label>
                <label htmlFor='forma-de-pagamento'>Forma</label>
            </div>
            <div className="values">
                <input required className="combined-value" value={formatValorCombinado()} onChange={(e) => setValorCombinado(e.target.value.replace(/[^0-9,]/g, ''))} type="text" name='valor' id='valor' placeholder='R$ 100,00' />
                <select className="payment-style" ref={formadepagamento} name="forma-de-pagamento" id="forma-de-pagamento">
                    <option>Dinheiro/Pix</option>
                    <option>Boleto</option>
                </select>
            </div>
            <label htmlFor='observacao'>Observação</label>
            <textarea rows={5} className='obs' value={observacao} onChange={(e) => setObservacao(e.target.value)} type="text" name='observacao' id='observacao' placeholder='Ex: O cliente quer que deixe a chave embaixo do tapede do cachorro verde' />
            {podeCadastrar ? <button type='submit'>Cadastrar cliente</button> : <button disabled type='submit'>Cadastrar cliente</button>}
            
        </StyledForm>
    );
}

const StyledForm = styled.form`

  width: 600px;
  display: flex;
  padding-top: 20px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin-top: 100px;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 0.726);

  .adress-labels-elements-container{
    display: flex;
    align-items: center;
    width: 100%;
    label{
        align-self: auto;
        margin-left: 20px;
        margin-right: 20px;

        &:nth-child(2)
        {
            margin-left: 130px;
        }

        &:nth-child(3)
        {
            margin-left: 130px;
        }
    }
  }

  .adress-elements-container{
    display: flex;
    width: 100%;
    justify-content: space-between;
   
    input{
        width: auto;
        &:first-child{
            margin-left: 15px;
        }
        &:last-child{
            margin-right: 15px;
        }
    }
  }

  label{
    color: #020202;
    align-self: self-start;
    margin-left: 20px;
  }

  textarea{
    border: 1px solid rgba(143, 143, 143, 0.288);
    border-radius: 5px;
    resize: none;
    width: 95%;
    padding-left: 10px;
    padding-top: 5px;
    &:focus{
      outline: 2px solid green;
    }
  }

  input{
    border: 1px solid rgba(143, 143, 143, 0.288);
    border-radius: 5px;
    height: 40px;
    width: 95%;
    padding-left: 10px;
    &:focus{
      outline: 2px solid green;
    }
  }

  .label-contatos-container{
    display: flex;
    width: 100%;
    gap: 218px;
    label:nth-child(1){
        margin-left: 15px;
    }
    label:nth-child(2){
        margin-left: 0;
    }
  }

  .contatos{
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 1%;
}

  .contato{
    width: 47%;
}

.payment-labels-container{
    display: flex;
    width: 100%;
    gap: 230px;
}

.values{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 1%;

    .combined-value{
        width: 47%;
    }
    label{
        align-self: auto;
    }
}

.payment-style{
    width: 47%;
}

  select{
    border: 1px solid rgba(143, 143, 143, 0.288);
    border-radius: 5px;
    height: 40px;
    width: 95%;
    padding-left: 5px;
    cursor: pointer;
    &:focus
    {
        outline: 2px solid green;
    }
  }

  .obs{
    margin-bottom: 10px;
  }

  button{
    border: 0;
    background-color: green;
    color: white;
    cursor: pointer;
    height: 40px;
    width: 95%;
    border-radius: 5px;
    transition: all 200ms;
    margin-bottom: 40px;
   
    &:hover{
      &:enabled{
        color: green;
      border: 1px solid green;
      background-color: white;
      }
    }

    &:disabled{
      cursor: not-allowed;
      background-color: #40884081;
      color: #ffffff76;
    }
}


`;