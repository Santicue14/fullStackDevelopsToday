import { LineChart } from "@mui/x-charts"

export const PopulationChart = ({ populationData }) => {
    const years = populationData.map(item => item.year)
    const values = populationData.map(item => item.value)
    return (
        <>
            {populationData.length > 0 && (
                <LineChart
                    xAxis={[{ data: years, label: "Year" }]}
                    series={[{ data: values, label: "Population" }]}
                    width={500}
                    height={300}
                />
            )}
        </>
    )
}

