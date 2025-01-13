import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Biblioteka do obsługi parametrów w URL'ach
import axios from 'axios';
import DOMPurify from 'dompurify'; // Biblioteka do ochrony przed XSS (Cross-Site Scripting) 

import Loading from '../components/Loading';

const Coin = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true); // Flaga do śledzenia stanu ładowania

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinid}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCoin(res.data); // Zapisujemy dane kryptowaluty do stanu 
        setLoading(false); // Po załadowaniu danych, ustawiamy loading na false
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // W przypadku błędu także ustawiamy loading na false
      });
  }, [url]); // Podajemy URL jako zależności, aby useEffect uruchomił się przy zmianie parametru URL

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg m-4 p-6">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-center p-4 text-center sm:text-left">
              {coin.image ? (
                <img
                  src={coin.image.large}
                  className="rounded-full w-32 h-32 mb-4 sm:mb-0 sm:mr-4"
                  alt={coin.name}
                />
              ) : null}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-900">
                {coin.name}
              </h2>
            </div>

            <div className="mt-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
                Statystyka zmiany wartości
              </h2>
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 border rounded-lg">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">Ranking</th>
                      <th scope="col" className="px-6 py-3">1 godzina</th>
                      <th scope="col" className="px-6 py-3">24 godziny</th>
                      <th scope="col" className="px-6 py-3">7 dni</th>
                      <th scope="col" className="px-6 py-3">30 dni</th>
                      <th scope="col" className="px-6 py-3">1 rok</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">#{coin.market_cap_rank}</td>
                      <td className="px-6 py-4">
                        {coin.market_data?.price_change_percentage_1h_in_currency
                          ? coin.market_data.price_change_percentage_1h_in_currency.pln
                          : 'N/A'}%
                      </td>
                      <td className="px-6 py-4">
                        {coin.market_data?.price_change_percentage_24h_in_currency
                          ? coin.market_data.price_change_percentage_24h_in_currency.pln
                          : 'N/A'}%
                      </td>
                      <td className="px-6 py-4">
                        {coin.market_data?.price_change_percentage_7d_in_currency
                          ? coin.market_data.price_change_percentage_7d_in_currency.pln
                          : 'N/A'}%
                      </td>
                      <td className="px-6 py-4">
                        {coin.market_data?.price_change_percentage_30d_in_currency
                          ? coin.market_data.price_change_percentage_30d_in_currency.pln
                          : 'N/A'}%
                      </td>
                      <td className="px-6 py-4">
                        {coin.market_data?.price_change_percentage_1y_in_currency
                          ? coin.market_data.price_change_percentage_1y_in_currency.pln
                          : 'N/A'}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="sm:hidden grid grid-cols-1 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ranking</h3>
                  <p className="text-gray-700">{coin.market_cap_rank}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1 godzina</h3>
                  <p className="text-gray-700">
                    {coin.market_data?.price_change_percentage_1h_in_currency
                      ? coin.market_data.price_change_percentage_1h_in_currency.pln
                      : 'N/A'}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">24 godziny</h3>
                  <p className="text-gray-700">
                    {coin.market_data?.price_change_percentage_24h_in_currency
                      ? coin.market_data.price_change_percentage_24h_in_currency.pln
                      : 'N/A'}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">7 dni</h3>
                  <p className="text-gray-700">
                    {coin.market_data?.price_change_percentage_7d_in_currency
                      ? coin.market_data.price_change_percentage_7d_in_currency.pln
                      : 'N/A'}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">30 dni</h3>
                  <p className="text-gray-700">
                    {coin.market_data?.price_change_percentage_30d_in_currency
                      ? coin.market_data.price_change_percentage_30d_in_currency.pln
                      : 'N/A'}
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1 rok</h3>
                  <p className="text-gray-700">
                    {coin.market_data?.price_change_percentage_1y_in_currency
                      ? coin.market_data.price_change_percentage_1y_in_currency.pln
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
                Szczegóły kryptowaluty
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li className="px-4 py-2 bg-gray-50 rounded-lg">
                  {coin.market_data ? (
                    <h1>
                      Najwyższa cena 24h: {coin.market_data.high_24h.pln.toLocaleString()}
                      <span className="text-xs text-rose-500"> PLN</span>
                    </h1>
                  ) : null}
                </li>
                <li className="px-4 py-2 bg-gray-50 rounded-lg">
                  {coin.market_data ? (
                    <h1>
                      Najniższa cena 24h: {coin.market_data.low_24h.pln.toLocaleString()}
                      <span className="text-xs text-rose-500"> PLN</span>
                    </h1>
                  ) : null}
                </li>
                <li className="px-4 py-2 bg-gray-50 rounded-lg">
                  {coin.market_data ? (
                    <h1>
                      Aktualna cena: {coin.market_data.current_price.pln.toLocaleString()}
                      <span className="text-xs text-rose-500"> PLN</span>
                    </h1>
                  ) : null}
                </li>
                <li className="px-4 py-2 bg-gray-50 rounded-lg">
                  {coin.market_data ? (
                    <h1>Total Volume: {coin.market_data.total_volume.pln}</h1>
                  ) : null}
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4">
                Opis
              </h2>
              <p
                className="mt-1 text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    coin.description ? coin.description.en : 'No description available'
                  ),
                }}
              ></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coin;
