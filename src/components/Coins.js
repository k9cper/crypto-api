import React from 'react';
import { Link } from 'react-router-dom';

import CoinItem from './CoinItem';
// import Coin from "../routes/Coin";


const Coins = (props) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div>
        {/* Nagłówki tabeli */}
        <div className="grid grid-cols-6 sm:grid-cols-7 gap-4 bg-white shadow-lg rounded-lg m-2 p-2 font-bold text-gray-800">
          <p>#</p>
          <p className="hidden sm:block">Logo</p>
          <p className="col-span-2 sm:col-span-1">Coin</p>
          <p className="sm:col-span-2">
            Cena<span className="text-xs text-rose-500 sm:ml-1 whitespace-nowrap"> PLN</span>
          </p>
          <p className="hidden sm:block">24h</p>
          <p className="hidden sm:block">Supply</p>
        </div>

        {/* Lista monet - renderuje listę linków, a każdy link prowadzi do szczegółowej strony dotyczącej konkretnej monety*/}
        {props.coins.map(coins => {
          return (
            <Link to={`/coin/${coins.id}`} key={coins.id}>
              <CoinItem coins={coins} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Coins;
