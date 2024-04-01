// import { useQuery } from "react-query"
// import carService from "../../../../../services/cars"
// import { useMemo } from "react"
import Card from "../Card"



const Bussness = ({ setInputValue, data = [] }: { data: any, setInputValue: any }) => {
    // const { data } = useQuery(['GET_BUSSNESS'], () => {
    //     return carService.getList(3)
    // })

    // const standart = useMemo(() => {
    //     return data?.data ?? []
    // }, [data])

    return (
        <div className="p-2 bg-[var(--lineGray)]">
            {data?.map((element: any) => (
                <div className="mb-2">
                    <Card element={element} setInputValue={setInputValue} />
                </div>
            ))}
        </div>
    )

}

export default Bussness
