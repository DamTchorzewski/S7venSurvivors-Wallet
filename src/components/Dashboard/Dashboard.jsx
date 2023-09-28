import styles from "./Dashboard.module.css"

import { useEffect, useState } from "react"
import { getDayDashboard, getMonthDashboard, getYearDashboard } from "../../services/DateFunctions"

const dbURL = "mongodb+srv://damiantchorzewski0:Leszek11@cluster1.dho7a63.mongodb.net/?month=&year=/retryWrites=true&w=majority"

export const Dashboard = () => {
 const [data, setData] = useState();

const dataFetch = async () => {
    const results = await (await fetch(dbURL)).json();
    const data = results.data
    setData(data);
    console.log('dane wczytane')
};
useEffect(() => {
    dataFetch();
}, []);


const deleteLine = async (id) => {
    const data = id
    console.log(`Usunieto wpis o ID${data}`)
    await fetch(`mongodb+srv://damiantchorzewski0:Leszek11@cluster1.dho7a63.mongodb.net/?${data}/retryWrites=true&w=majority`, {method: 'DELETE',})
    dataFetch();
    console.log('dane przeladowane')
}

return (
    <>
    {data ? 
        <table className={styles.dashboardClass}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Comment</th>
                    <th>Sum</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className={styles.dashboardClassBody}>
            {data.map(({ _id, date, type, category, comment, sum })=>{

                return(
                    <tr key={_id}>
                        <td>
                            {getDayDashboard(date)}.
                            {getMonthDashboard(date)}.
                            {getYearDashboard(date)}
                        </td>
                        <td>{type}</td>
                        <td>{category}</td>
                        <td>{comment}</td>
                        {type=='+'?<td className={styles.green}>{sum}</td>:<td className={styles.red}>{sum}</td>}
                        <td>
                            <span className={styles.buttonContainer}>
                                <EditPen id={_id} type={type} getConnect={dataFetch}/>
                                <DeleteButton onClick={()=>deleteLine(_id)} name="Delete"/>
                            </span>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>:<></>
    }
    </>
)};
