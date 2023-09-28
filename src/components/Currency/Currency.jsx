import React, { useState, useEffect } from 'react';
import styles from './Currency.module.css';
import Loader from '../Loader/Loader';

const Currency = () => {
  const [usdData, setUsdData] = useState(null);
  const [eurData, setEurData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currQuerry = querry =>
    `http://api.nbp.pl/api/exchangerates/rates/c/${querry}/last/`;

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };
    fetchData(currQuerry('usd'), setUsdData);
    fetchData(currQuerry('eur'), setEurData);
    setIsLoading(false);
  }, []);

  return (
    <div className={styles.currency}>
      {isLoading ? (
        <Loader />
      ) : (
        <table className={styles.currencyTbl}>
          <thead className={styles.currencyThead}>
            <tr>
              <th className={styles.currencyTblTitle}>Currency</th>
              <th className={styles.currencyTblTitle}>Purchase</th>
              <th className={styles.currencyTblTitle}>Sale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.currencyTblItem}>USD</td>
              <td className={styles.currencyTblItem}>
                {usdData && usdData.rates.length > 0
                  ? usdData.rates[0].bid.toFixed(2)
                  : '-'}
              </td>
              <td className={styles.currencyTblItem}>
                {usdData && usdData.rates.length > 0
                  ? usdData.rates[0].ask.toFixed(2)
                  : '-'}
              </td>
            </tr>
            <tr>
              <td className={styles.currencyTblItem}>EUR</td>
              <td className={styles.currencyTblItem}>
                {eurData && eurData.rates.length > 0
                  ? eurData.rates[0].bid.toFixed(2)
                  : '-'}
              </td>
              <td className={styles.currencyTblItem}>
                {eurData && eurData.rates.length > 0
                  ? eurData.rates[0].ask.toFixed(2)
                  : '-'}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Currency;
