import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import debounce from "lodash.debounce";

import Coins from "./components/Coins";
import Navbar from "./components/Navbar";
import Coin from "./routes/Coin";
import ErrorModal from "./components/ErrorModal";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

function App() {
  const location = useLocation(); // Pobranie aktualnego położenia z przeglądarki - wykorzystywane do pokazywania i ukrycia buttonów  
  const [coins, setCoins] = useState([]); // Tablica przechowująca dane kryptowalut
  const [perPage, setPerPage] = useState(10); // Ilość kryptowalut wyświetlanych na stronie
  const [searchQuery, setSearchQuery] = useState(""); // Zmienna przechowująca wyszukiwane słowo
  const [error, setError] = useState(null); // Zmienna przechowująca błąd
  const [isModalOpen, setIsModalOpen] = useState(false); // Flaga do otwarcia modalu z błędem
  const [loading, setLoading] = useState(true); // Flaga do śledzenia stanu ładowania

  // Jeśli wyszukiwarka jest pusta wyświetl listę wszystkich kryptowalut
  const fetchCoins = (query = "") => {
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=pln&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false`;

    // Jeśli wyszukiwane słowo jest podane, pobierz dane dla wszystkich kryptowalut o podanych id
    if (query) {
      url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=pln&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&ids=${query}`;
    }

    axios
      .get(url)
      .then((res) => {
        setCoins(res.data);
        setError(null);
        setLoading(false); // Zakończono ładowanie danych
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data.status &&
          err.response.data.status.error_code === 429
        ) {
          setError(err.response.data.status.error_message); // Wyświetl wiadomość o błędzie 429
        } else {
          console.log(err);
          setError("Wystąpił błąd podczas ładowania danych"); // Ogólny błąd
        }
        setIsModalOpen(true); // Otwórz modal z błędem
        setLoading(false); // Zakończono ładowanie danych
      });
  };

  // Pobieranie danych kryptowalut z API i aktualizacja stanu listy przy każdym klikwaniu przycisku "Load More" i resetowaniu przycisku "Reset" oraz zmianie w wyszukiwaniu
  useEffect(() => {
    fetchCoins(searchQuery);
  }, [perPage, searchQuery]);

  // Funkcja obsługująca przycisk "Load More" i zwiększa ilość wyświetlanych kryptowalut o 10
  const loadMore = () => {
    setPerPage((prev) => prev + 10);
  };

  // Funkcja obsługująca przycisk "Reset" i resetująca ilość wyświetlanych kryptowalut na 10
  const resetLoad = () => {
    setPerPage(10);
    setSearchQuery("");
  };

  // Funkcja obsługująca wyszukiwarkę z opóźnieniem debouncingu 1s 
  const handleSearch = debounce((query) => {
    setSearchQuery(query.toLowerCase());
  }, 1000);

  // Funkcja zamykająca modal z błędem po kliknięciu OK
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar onSearch={handleSearch} />
          <Routes>
            <Route path="/crypto-api" element={<Coins coins={coins} />} /> // Wyświetlanie listy kryptowalut
            <Route path="/coin/:coinid" element={<Coin />} /> // Przekierowanie do wyświetlania szczegółów kryptowaluty
          </Routes>
        </>
      )}

      {/* Jeśli lokalizacja jest inna niż homePage to nie wyświetlaj przycisku "Load More" i "Reset" */}
      {location.pathname === "/" && !loading && (
        <div className="flex justify-center items-center mt-4">
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={loadMore}
          >
            Więcej
          </button>

          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={resetLoad}
          >
            Powrót
          </button>
        </div>
      )}

      {isModalOpen && <ErrorModal message={error} onClose={closeModal} />}
      <Footer />
    </>
  );
}

export default App;
