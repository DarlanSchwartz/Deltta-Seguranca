import { useContext, useState, useEffect, useRef } from "react";
import ClientsContext from "../Contexts/ClientsContext";
import { styled } from "styled-components";
import { formatarTelefone, formatValorCombinado } from "../utils";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {EditClient, RegisterClient} from '../API/requests';

export default function RegisterClientPage() {
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
    const [editingClientId, setEditingClientId] = useState(null);
    const formadepagamento = useRef(null);
    const [podeCadastrar, setPodeCadastrar] = useState(false);
    const {editingClient, setEditingClient } = useContext(ClientsContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (editingClient) {
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
    }, []);

    function notify(type) {
        if (type == 'edit') {
            toast.info('Editado com sucesso!', {
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
        else {
            toast.success('Cliente cadastrado com sucesso!', {
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
        if (nome != '' && vencimento != '' && vencimento != 0 && valorCombinado != 0) {
            setPodeCadastrar(true);
        }
        else {
            setPodeCadastrar(false);
        }
    }, [nome, vencimento, valorCombinado]);

    function cadastrarCliente() {
        if (!podeCadastrar) return alert('Pra que bugar o site?');

        const newObj = {
            nome: nome,
            rua: rua,
            numero: Number(numero),
            bairro: bairro,
            cidade: cidade,
            contato: contato.toString(),
            contato2: contato2.toString(),
            formadepagamento: formadepagamento.current.value,
            valorCombinado: Number(valorCombinado),
            observacao: observacao,
            vencimento: Number(vencimento)
        };

        const AfterRegister = (res) =>{
            notify('register');
            clearFields();
        }

        const AfterEdit = (res) =>{
            notify('edit');
            clearFields();
            setEditingClient(null);
            navigate('/clients');
        }

        if (editingClient == null) {
            RegisterClient(null,AfterRegister,newObj);
        }
        else {
            EditClient(null,AfterEdit,newObj,editingClientId);
        }
    }



    function clearFields() {
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
                <div className="input-container">
                    <label htmlFor="nome">Nome</label>
                    <input value={nome} onChange={(e) => setNome(e.target.value)} id='nome' name='nome' type='text' placeholder='Ex: João da Silva Sauro' />
                </div>
                <div className="input-container">
                    <label htmlFor="rua">Rua</label>
                    <input value={rua} onChange={(e) => setRua(e.target.value)} type="text" id='rua' name='rua' placeholder='Ex: Avenida das dores' />
                </div>
                <div className="adress-container">
                    <div className="input-container-np">
                        <label htmlFor="cidade">Cidade</label>
                        <input value={cidade} onChange={(e) => setCidade(e.target.value)} type="text" id='cidade' name='cidade' placeholder='Ex: Estância Velha' />
                    </div>
                    <div className="input-container-np">
                        <label htmlFor="bairro">Bairro</label>
                        <input value={bairro} onChange={(e) => setBairro(e.target.value)} type="text" id='bairro' name='bairro' placeholder='Ex: Bairro das Rosas' />
                    </div>
                    <div className="input-container-np">
                        <label htmlFor="numero">Numero</label>
                        <input value={numero} onChange={(e) => setNumero(e.target.value)} type="number" id='numero' name='numero' placeholder='Ex: 1032' />
                    </div>
                </div>
                <div className="contatos-container">
                    <div className="input-container-np">
                        <label htmlFor="contato1">Contato 1</label>
                        <input className="contato" value={contato} onChange={(e) => setContato(formatarTelefone(e.target.value))} type="text" name='contato1' id='contato1' placeholder='(51) 99999-9999' pattern='\(\d{2}\) \d{5}-\d{4}' maxLength={15} />
                    </div>
                    <div className="input-container-np">
                        <label htmlFor="contato2">Contato 2</label>
                        <input className="contato" value={contato2} onChange={(e) => setContato2(formatarTelefone(e.target.value))} type="text" name='contato2' id='contato2' placeholder='(51) 99999-9999' pattern='\(\d{2}\) \d{5}-\d{4}' maxLength={15} />
                    </div>
                </div>
                <div className="payment-container">
                    <div className="input-container-np">
                        <label htmlFor="valor">Valor</label>
                        <input required className="combined-value" value={formatValorCombinado(valorCombinado)} onChange={(e) => setValorCombinado(e.target.value.replace(/[^0-9,]/g, '').replace(',', ''))} type="text" name='valor' id='valor' placeholder='R$ 100' />
                    </div>
                    <div className="input-container-np">
                        <label htmlFor="vencimento">Vencimento</label>
                        <input required className="payment-day" value={vencimento} onChange={(e) => setVencimento(e.target.value.toString().slice(0, 2))} type="number" name='vencimento' id='vencimento' placeholder='Dia do mês' />
                    </div>
                    <div className="input-container-np">
                        <label htmlFor='forma-de-pagamento'>Forma</label>
                        <select className="payment-style" ref={formadepagamento} name="forma-de-pagamento" id="forma-de-pagamento">
                            <option>Dinheiro/Pix</option>
                            <option>Boleto</option>
                        </select>
                    </div>
                </div>

                <div className="textarea-container">
                    <label htmlFor='observacao'>Observação</label>
                    <textarea rows={5} className='obs' value={observacao} onChange={(e) => setObservacao(e.target.value)} type="text" name='observacao' id='observacao' placeholder='Ex: O cliente quer que deixe a chave embaixo do tapede do cachorro verde' />
                </div>
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
    color: white;
    background-color: rgba(48, 45, 45, 0.726);

    .input-container,.textarea-container{
        width: 100%;
        padding-left:15px;
        padding-right:15px;
    }

    .input-container-np{
        width: 100%;
    }

    @media (max-width:805px) 
    {
        width: 100%;
    }

    @media (max-height:720px) 
    {
        margin-top: 140px;
    }

    .contatos-container,.payment-container,.adress-container{
        display: flex;
        width: 100%;
        padding-left:15px;
        padding-right:15px;
        gap: 10px;
    }

  textarea{
    border: 1px solid rgba(143, 143, 143, 0.288);
    border-radius: 5px;
    resize: none;
    width: 100%;
    padding-left: 10px;
    padding-top: 5px;
    margin-top: 7px;
    &:focus{
      outline: 2px solid #ddd815;
    }
  }

  input,select{
    border: 1px solid rgba(143, 143, 143, 0.288);
    border-radius: 5px;
    height: 40px;
    width: 100%;
    margin-top: 7px;
    &:focus{
      outline: 2px solid #ddd815;
    }
  }

  input{
    padding-left: 10px;
  }
  select{
    padding-left: 5px;
    cursor: pointer;
  }



  button{
    border: 0;
    background-color: #ddd815;
    color: black;
    cursor: pointer;
    height: 40px;
    width: calc(100% - 30px);
    box-sizing: content-box;
    border-radius: 5px;
    transition: all 200ms;
    margin-top: 10px;
    margin-bottom: 40px;
   
    &:hover{
      &:enabled{
        color: white;
        border: 1px solid #ddd815;
        background-color: #313338;
      }
    }

    &:disabled{
      cursor: not-allowed;
      background-color: #ddd815;
      color: #44404076;
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