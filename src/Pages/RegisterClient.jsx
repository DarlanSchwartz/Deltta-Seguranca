import { useContext, useState, useEffect, useRef } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import { styled } from "styled-components";
import { formatarTelefone ,formatValorCombinado,saveClients,saveClientsTextFile } from "../utils";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

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
    const [vencimento, setVencimento] = useState('');
    const [editingClientId,setEditingClientId] = useState(null);
    const formadepagamento = useRef(null);
    const [podeCadastrar, setPodeCadastrar] = useState(false);
    const { usuarios, setUsuarios ,editingClient,setEditingClient} = useContext(ClientsContext);
    const navigate = useNavigate();

    useEffect( ()=> {
        if(editingClient)
        {
            setNome(editingClient.nome);
            setRua(editingClient.rua);
            setBairro(editingClient.bairro);
            setNumero(editingClient.numero);
            setCidade(editingClient.cidade);
            setContato(editingClient.contato);
            setContato2(editingClient.contato2);
            setObservacao(editingClient.observacao);
            setPodeCadastrar(true);
            setValorCombinado(editingClient.valorCombinado);
            formadepagamento.current.value = editingClient.formadepagamento;
            setEditingClientId(editingClient.id);
            setVencimento(editingClient.vencimento);
        }
    },[]);

    function notify (type) {
        if(type == 'edit')
        {
            toast.info( 'Editado com sucesso!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
                });
        }
        else
        {
            toast.success( 'Cliente cadastrado com sucesso!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
                });
        }
       
    }

    useEffect(() => {
        if (nome != '' && vencimento !='' && vencimento !=0 && valorCombinado !=0)
        {
            setPodeCadastrar(true);
        }
        else {
            setPodeCadastrar(false);
        }
    }, [nome,vencimento,valorCombinado]);

    function cadastrarCliente() {
        if (!podeCadastrar) {
            alert('Pra que bugar o site?')
            return;
        }

        let id = 0;

       if(editingClient == null)
       {
            let clientIds = [];
            
            if (usuarios !== null && usuarios !== undefined && usuarios.length > 0) {
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
                valorCombinado:Number(valorCombinado),
                observacao: observacao,
                vencimento:vencimento
            };

            notify('register');
            const newUsers = [...usuarios, newObj];
            saveClients(newUsers);
            setUsuarios(newUsers);
            limparCampos();
       }
       else
       {    
            const newObj = {
                id: editingClientId,
                nome: nome,
                rua: rua,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                contato: contato.toString(),
                contato2: contato2.toString(),
                formadepagamento: formadepagamento.current.value,
                valorCombinado:valorCombinado,
                observacao: observacao,
                vencimento: vencimento
            };

            notify('edit');
            const filteredUsers = usuarios.filter(user => user.id != editingClientId);
            filteredUsers.push(newObj);
            saveClients(filteredUsers);
            setUsuarios([...filteredUsers]);
            setEditingClient(null);
            limparCampos();
            navigate('/clients');
       }
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
        setValorCombinado('');
        setVencimento('');
        setEditingClientId(null);
        formadepagamento.current.value = 'Dinheiro/Pix';
    }

    return (
        <PageContainer>
        
        <StyledForm onSubmit={(e) => { e.preventDefault(); cadastrarCliente(); }}>
            <label  htmlFor="nome">Nome</label>
            <input  value={nome} onChange={(e) => setNome(e.target.value)} id='nome' name='nome' type='text' placeholder='Ex: João da Silva Sauro' />
            <label htmlFor="rua">Rua</label>
            <input value={rua} onChange={(e) => setRua(e.target.value)} type="text" id='rua' name='rua' placeholder='Ex: Avenida das dores' />
            <div className="adress-labels-elements-container">
                <label htmlFor="cidade">Cidade</label>
                <label htmlFor="bairro">Bairro</label>
                <label htmlFor="numero">Numero</label>
            </div>
            <div className="adress-elements-container">
                <input value={cidade} onChange={(e) => setCidade(e.target.value)} type="text" id='cidade' name='cidade' placeholder='Ex: Estância Velha' />
                <input value={bairro} onChange={(e) => setBairro(e.target.value)} type="text" id='bairro' name='bairro' placeholder='Ex: Bairro das Rosas' />
                <input value={numero} onChange={(e) => setNumero(e.target.value)} type="number" id='numero' name='numero' placeholder='Ex: 1032' />
            </div>
            <div className="label-contatos-container">
                <label htmlFor="contato1">Contato 1</label>
                <label htmlFor="contato2">Contato 2</label>
            </div>
            <div className="contatos">
                <input className="contato" value={contato} onChange={(e) => setContato(formatarTelefone(e.target.value))} type="text" name='contato1' id='contato1' placeholder='(51) 99999-9999' pattern='\(\d{2}\) \d{5}-\d{4}' maxLength={15} />
                <input className="contato" value={contato2} onChange={(e) => setContato2(formatarTelefone(e.target.value))} type="text" name='contato2' id='contato2' placeholder='(51) 99999-9999' pattern='\(\d{2}\) \d{5}-\d{4}' maxLength={15} />
            </div>
            <div className="payment-labels-container">
                <label htmlFor="valor">Valor</label>
                <label htmlFor="vencimento">Vencimento</label>
                <label htmlFor='forma-de-pagamento'>Forma</label>
            </div>
            <div className="values">
                <input required className="combined-value" value={formatValorCombinado(valorCombinado)} onChange={(e) => setValorCombinado(e.target.value.replace(/[^0-9,]/g, '').replace(',',''))} type="text" name='valor' id='valor' placeholder='R$ 100' />
                <input required className="payment-day" value={vencimento} onChange={(e) => setVencimento(e.target.value.toString().slice(0, 2))} type="number" name='vencimento' id='vencimento' placeholder='Dia do mês'/>
                <select className="payment-style" ref={formadepagamento} name="forma-de-pagamento" id="forma-de-pagamento">
                    <option>Dinheiro/Pix</option>
                    <option>Boleto</option>
                </select>
            </div>
            <label htmlFor='observacao'>Observação</label>
            <textarea rows={5} className='obs' value={observacao} onChange={(e) => setObservacao(e.target.value)} type="text" name='observacao' id='observacao' placeholder='Ex: O cliente quer que deixe a chave embaixo do tapede do cachorro verde' />
            {podeCadastrar ? <button type='submit'>{editingClient ? 'Confirmar alterações' : 'Cadastrar cliente'}</button> : <button disabled type='submit'>{editingClient ? 'Confirmar alterações' : 'Cadastrar cliente'}</button>}
            
        </StyledForm>
        </PageContainer>
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
      outline: 2px solid #07bc0c;
    }
  }

  input{
    border: 1px solid rgba(143, 143, 143, 0.288);
    border-radius: 5px;
    height: 40px;
    width: 95%;
    padding-left: 10px;
    &:focus{
      outline: 2px solid #07bc0c;
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
    label{
        &:nth-child(2)
        {
            margin-left: 150px;
        }
        &:nth-child(3)
        {
            margin-left: 107px;
        }
    }
}

.values{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 1%;

    .combined-value{
        width: 31%;
    }
    .payment-day{
        width: 31%;
    }
    label{
        align-self: auto;
    }
    .payment-style{
        width: 31%;
    }
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
        outline: 2px solid #07bc0c;
    }
  }

  .obs{
    margin-bottom: 10px;
  }

  button{
    border: 0;
    background-color: #07bc0c;
    color: white;
    cursor: pointer;
    height: 40px;
    width: 95%;
    border-radius: 5px;
    transition: all 200ms;
    margin-bottom: 40px;
   
    &:hover{
      &:enabled{
        color: #07bc0c;
      border: 1px solid #07bc0c;
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

const PageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
flex-direction: column;
`;