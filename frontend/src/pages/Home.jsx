import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '../components/Loading'

export const Home = () => {
    const VITE_API_PORT = import.meta.env.VITE_API_PORT
    const VITE_API_URL = import.meta.env.VITE_API_URL
    const [countriesTotal, setCountriesTotal] = useState({})
    const [loading, setLoading] = useState(true)
  
    useEffect(()=>{
      const fetchCountries = async() =>{
        try {
          setLoading(true)
          const response =  await axios.get(`${VITE_API_URL}:${VITE_API_PORT}/getAvailableCountries`) 
          setCountriesTotal(response.data)
          setLoading(false)
        } catch (error) {
          console.error(error)
          setLoading(false)
        }
      }
      fetchCountries()
    },[])
    if (loading) {
      return (
          <Loading/>
      )
  }
    return (
      <>
        {countriesTotal.length > 0 && 
        <section className="mt-4 flex flex-col mx-auto items-center ">
          <h1 className="font-semibold text-2xl">Total countries list</h1>
            <div className="container grid grid-flow-row  grid-cols-3 sm:grid-cols-6">
            {
              countriesTotal.map((country,idx) =>{
                return(
                  <Link to={`/country/${country.countryCode}`} key={idx}>
                  <p className="hover:bg-slate-100 transition-colors py-4 px-2 text-center sm:text-start" >{country.name}</p>
                  </Link>
                )
              })
            }
            </div>
          </section>}
      </>
    )
}
