import React from 'react';

function CoinItem(props) {
  return (
    <div className="grid grid-cols-6 sm:grid-cols-7 gap-4 items-center bg-white shadow-lg rounded-lg m-2 p-2 text-black transition ease-in-out delay-50 hover:scale-102">
      {/* Ranking */}
      <p>{props.coins.market_cap_rank}</p>

      {/* Logo */}
      <img src={props.coins.image} alt={props.coins.name} className="h-10 w-10 sm:w-auto sm:h-10 mr-2" />

      {/* Symbol / Coin Name */}
      <p className="text-xl font-semibold text-slate-950/50 sm:col-span-1">{props.coins.symbol.toUpperCase()}</p>

      {/* Cena */}
      <div className="sm:col-span-2 w-full flex justify-between items-center space-x-1 sm:space-x-2">
        <span className="text-xl font-semibold">{props.coins.current_price.toLocaleString()}</span>
      </div>

      {/* Zmiana 24h */}
      <p className="hidden sm:block">{props.coins.price_change_percentage_24h.toFixed(2)}%</p>

      {/* Total Supply */}
      <p className="hidden sm:block">{props.coins.total_supply.toLocaleString()}</p>
    </div>
  );
}

export default CoinItem;
