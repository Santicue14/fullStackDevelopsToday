import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PopulationChart } from "../components/PopulationChart";
import { Loading } from "../components/Loading";
export const CountryDetails = () => {
    const VITE_API_PORT = import.meta.env.VITE_API_PORT;
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    const [countryInfo, setCountryInfo] = useState({});
    const { countryCode } = useParams();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchCountry = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${VITE_API_URL}:${VITE_API_PORT}/getCountryInfo/${countryCode}`);
                setCountryInfo(response.data);
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        };
        fetchCountry();
    }, [countryCode]);

    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <>
            {countryInfo.border && <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 h-screen sm:mx-28">
                <section className="country-selected-info sm:col-span-2 justify-center sm:grid-rows-2">
                    <div className="main-content flex flex-col items-center">
                        <h2 className=" text-2xl font-bold text-center sm:text-start">{countryInfo.border.commonName} Info</h2>
                        <img src={countryInfo.flag} alt={`${countryInfo.border.commonName} flag`} className="max-w-36" />
                        {countryInfo.border.region && <article className="text-slate-600">This country is in {countryInfo.border.region} continent.</article>}
                        {countryInfo.border.officialName && <p className="text-slate-800 ">The official name of the country is {countryInfo.border.officialName}</p>}
                    </div>
                </section>
                <section className="population h-fit border border-red-500 w-fit">
                    <PopulationChart populationData={countryInfo.populationData.populationCounts} />
                </section>
                <section className="sm:w-full">
                    <h4 className="text-lg font-bold text-center">Borders countries</h4>
                    <table >
                        <thead>
                            <tr>
                                <th className="sm:px-4 px-1 sm:py-2">Name</th>
                                <th className="sm:px-4 px-1 sm:py-2">Official Name</th>
                                <th className="sm:px-4 px-1 sm:py-2">Region</th>
                                <th className="sm:px-4 px-1 sm:py-2">Link</th>
                            </tr>
                        </thead>
                        <tbody >
                            {countryInfo.border.borders && countryInfo.border.borders.map(borderCountry => {
                                return (
                                    <tr className="hover:bg-slate-100 transition-colors cursor-pointer" key={borderCountry.countryCode}>
                                        <td className="sm:px-4 px-1 sm:py-2">{borderCountry.commonName}</td>
                                        <td className="sm:px-4 px-1 sm:py-2">{borderCountry.officialName}</td>
                                        <td className="sm:px-4 px-1 sm:py-2">{borderCountry.region}</td>
                                        <td className="sm:px-4 px-1 sm:py-2">
                                            <Link to={`/country/${borderCountry.countryCode}`} className="text-blue-600 hover:underline">Visit it</Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                </section>
            </div>}
        </>

    );
};
