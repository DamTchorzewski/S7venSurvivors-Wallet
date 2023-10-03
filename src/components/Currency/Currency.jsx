import React, { useState, useEffect } from 'react';
import styles from './Currency.module.css';
import loader from './CurrencyLoader.module.css';

const Currency = () => {
  const [usdData, setUsdData] = useState(null);
  const [eurData, setEurData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currQuerry = query =>
    `https://api.nbp.pl/api/exchangerates/rates/c/${query}/last/?format=json`;

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(currQuerry('usd'), setUsdData);
    fetchData(currQuerry('eur'), setEurData);
  }, []);

  return (
    <div className={styles.currency}>
      <div
        className={`${loader.body} ${isLoading ? '' : loader.bodyIsHidden}`}
      ></div>
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
    </div>
  );
};

export default Currency;
