import { useEffect, useState, useRef, FormEvent } from 'react';
import {FiTrash} from 'react-icons/fi';
import { api } from './services/api';

interface CustomerProps {
  id: string
  name: string
  email:  string
  status: boolean
  created_at: string
}

export default function App(){

  const [customer,setCustomer] = useState<CustomerProps[]>([])
  const refName = useRef<HTMLInputElement | null>(null);
  const refEmail = useRef<HTMLInputElement | null>(null);

  useEffect(() => {

    loadCustomers()

  },[])
  
  async function loadCustomers() {
    try{
      const response = await api.get("/customers")
      setCustomer(response.data)
    }catch(err){
      console.log(err)
    }
  }


  async function handleSubmit(event:FormEvent){
    event.preventDefault()

    if(!refName.current?.value || !refEmail.current?.value) return;

    try{
      const response = await api.post("/customer",{
          name:refName.current?.value,
          email:refEmail.current?.value
      })

      refName.current.value = ''
      refEmail.current.value = ''

      setCustomer((value) => [...value,response.data])

    }catch(err){
      console.log(err)
    }


  }

  async function handleDelete(id:string) {
    try{

    const response = await api.delete("/customer", {
      params:{
        id:id
      }
    })

    const allcustomer = customer.filter((element) => element.id != id)

    setCustomer(allcustomer)

    }catch(err){
      console.log(err)
    }

  }

  return(
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-white">Clientes</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome :</label>
          <input 
            type="text"
            placeholder="Digite seu nome completo..."
            className="w-full mb-5 p-2 rounded"
            ref={refName}
          />

          <label className="font-medium text-white">Email :</label>
          <input 
            type="text"
            placeholder="Digite seu email..."
            className="w-full mb-5 p-2 rounded"
            ref={refEmail}
          />

          <input 
            type="submit"
            value="Cadastrar"
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium"
          />
        </form>

        <section className="flex flex-col gap-4">
          {customer.map((element) => (
            <article key={element.id}
              className="w-full bg-white rounded p-2 relative hover:scale-110 duration-200"
            >
              <p><span className="font-medium">Nome:</span> {element.name}</p>
              <p><span className="font-medium">Email:</span> {element.email}</p>
              <p><span className="font-medium">Status:</span> {element.status ? "ativo" : "inativo"}</p>

              <button className='bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2'
                onClick={() => handleDelete(element.id)}
              >
                <FiTrash size={18} color='fff'/>
              </button>
            </article>
          ))}
          
        </section>
      </main>
    </div>
  )
}