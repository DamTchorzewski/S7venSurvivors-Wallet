
// import React, { useState } from 'react';
// import styles from './Currency.module.css';
// import { getCurrency } from './getCurrency';

// import { Loader } from 'components/Loader/Loader';
// import { useSelector } from 'react-redux';
// import { selectToken } from 'redux/auth/auth-selectors';


// function Currency() {
//   const [currencyData, setCurrencyData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const token = useSelector(selectToken);


//   async function fetchData() {
//     const data = await getCurrency(token);
//     setCurrencyData(data);
//     setIsLoading(true);
//   }

//   if (!isLoading) {
//     fetchData();
//     setInterval(fetchData, 6000000);
//     return (
//       <div className={styles.currency}>
//         <Loader />
//       </div>
//     );
//   }

//   const eurBuy = currencyData.eur.buy;
//   const eurSale = currencyData.eur.sale;
//   const USDSale = currencyData.usd.sale;
//   const USDBuy = currencyData.usd.buy;

//   return (
//     <div className={styles.currency}>
//       <table className={styles.currency__tbl}>
//         <thead className={styles.currency__thead}>
//           <tr>
//             <th className={styles.currency__tbl_title}>Currency</th>
//             <th className={styles.currency__tbl_title}>Purchase</th>
//             <th className={styles.currency__tbl_title}>Sale</th>
//           </tr>
//         </thead>
//         <tbody className={styles.currency__tbody}>
//           <tr>
//             <td className={styles.currency__tbl_item}>USD</td>
//             <td className={styles.currency__tbl_item}>{USDBuy}</td>
//             <td className={styles.currency__tbl_item}>{USDSale}</td>
//           </tr>
//           <tr>
//             <td className={styles.currency__tbl_item}>EUR</td>
//             <td className={styles.currency__tbl_item}>{eurBuy}</td>
//             <td className={styles.currency__tbl_item}>{eurSale}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Currency;