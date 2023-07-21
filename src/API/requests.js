import axios from "axios";
import { OrdenarPor } from "../utils";

export function GetAllClients(token,callback)
{
    axios.get(`${import.meta.env.VITE_API_URL}/clients`,{headers:{Authorization: token ? token : localStorage.getItem('token')}})
    .then((res) => {
        callback(OrdenarPor('nome',res.data));
    })
    .catch((error)=>{
        callback(undefined);
        console.log(error);
    });
}

export function GetOneClient(token,callback,id)
{
    axios.get(`${import.meta.env.VITE_API_URL}/client/${id}`,{headers:{Authorization: token ? token : localStorage.getItem('token')}})
    .then((res) => {
        callback(res.data);
    })
    .catch((error)=>{
        callback(undefined);
        console.log(error);
    });
}

export function RegisterClient(token,callback,client)
{
    axios.post(`${import.meta.env.VITE_API_URL}/clients`,client,{headers:{Authorization: token ? token : localStorage.getItem('token')}})
    .then((res) => {
        callback(res.data);
    })
    .catch((error)=>{
        console.log(error);
        callback(res.data);
    });
}


export function EditClient(token,callback,client,id)
{
    axios.put(`${import.meta.env.VITE_API_URL}/client/${id}`,client,{headers:{Authorization: token ? token : localStorage.getItem('token')}})
    .then((res) => {
        callback(res.data);
    })
    .catch((error)=>{
        console.log(error);
        callback(res.data);
    });
}

export function RemoveClient(token,callback,id)
{
    axios.delete(`${import.meta.env.VITE_API_URL}/client/${id}`,{headers:{Authorization: token ? token : localStorage.getItem('token')}})
    .then((res) => {
        callback(res.data);
    })
    .catch((error)=>{
        console.log(error);
        callback(res.data);
    });
}

export function RemoveManyClients(token,callback,ids)
{
    axios.post(`${import.meta.env.VITE_API_URL}/delete-clients`,{ids:ids},{headers:{Authorization: token ? token : localStorage.getItem('token')}})
    .then((res) => {
        callback(res.data);
    })
    .catch((error)=>{
        console.log(error);
        callback(res.data);
    });
}