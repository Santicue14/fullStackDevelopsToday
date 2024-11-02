const axios  = require('axios')
const cors = require('cors')
const express = require('express')
require('dotenv').config()
const API_PORT = process.env.API_PORT

const app = express()

app.use(express.json())
app.use(cors())
//First task This endpoint should return a list of available countries.
app.get('/getAvailableCountries', async(req,res)=>{
    try {
        const response= await axios.get('https://date.nager.at/api/v3/AvailableCountries')
        return res.status(200).json(response.data)
    } catch (error) {
        return res.status(500).json({message: 'Internal error fetching available countries', error})
    }
})

//Second task Create an API endpoint to retrieve detailed information about a specific country.
app.get('/getCountryInfo/:countryCode', async(req,res)=>{
    try {
        const {countryCode} = req.params
        if (!countryCode) return res.status(404).json({message: 'There is no Country Code'})
        let countryInfo = {}
        const borderCountriesResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)
        countryInfo.border = borderCountriesResponse.data
        const countryNameLower = countryInfo.border.commonName.toLowerCase();

        const countryPopulationData = await axios.get('https://countriesnow.space/api/v0.1/countries/population',{
            params:{country: countryInfo.border.commonName}
        })
        const countryPopulationResponse = countryPopulationData.data.data.find(
            (country)=>country.country.toLowerCase() === countryNameLower
        )
        
        countryInfo.populationData = countryPopulationResponse
        
        const countriesFlag = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images',{
            params:{country: countryInfo.border.commonName}
        })
        const countryFlagResponse = countriesFlag.data.data.find(
            (country)=>country.name.toLowerCase() === countryNameLower
        )
        countryInfo.flag = countryFlagResponse.flag
        return res.status(200).json(countryInfo)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Its has been an error fetching country info', error})   
    }
})

app.listen(API_PORT,()=>{
    console.log(`Running server on port ${API_PORT}`);
})