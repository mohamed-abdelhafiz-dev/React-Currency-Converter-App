import { useState } from "react";
import Dropdown from "./Dropdown";

function Card() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EGP");
  const [result, setResult] = useState("1 USD = 50.81 EGP");
  function handleAmountInputChange(e: { target: { value: string } }) {
    if (isNaN(+e.target.value)) {
      return;
    }
    setAmount(e.target.value);
  }

  return (
    <div
      className="bg-white w-full max-w-[500px] px-[30px] py-[35px]
                    rounded-[7px] shadow-md shadow-indigo-100"
    >
      <div className="flex flex-col">
        <h1 className="text-center text-2xl font-bold">Currency Converter</h1>
        <div className="flex flex-col gap-2 mt-10">
          <label htmlFor="amount" className="text-md font-semibold">
            Enter Amount
          </label>
          <input
            value={amount}
            onChange={handleAmountInputChange}
            type="text"
            id="amount"
            className="border border-gray-400 outline-none px-2 py-1.5 text-lg rounded-sm caret-indigo-600"
          />
        </div>
        <div className="flex gap-2 sm:gap-0 justify-between items-center my-10 px-2">
          <div className="flex flex-col gap-2">
            <span className="text-md font-semibold">From</span>
            <Dropdown
              label="From"
              currency={{ fromCurrency, setFromCurrency }}
            />
          </div>
          <button
            className="cursor-pointer self-end mb-3"
            onClick={() => {
              setFromCurrency(toCurrency);
              setToCurrency(fromCurrency);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="black"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
          </button>
          <div className="flex flex-col gap-3">
            <span className="text-md font-semibold">To</span>
            <Dropdown label="To" currency={{ toCurrency, setToCurrency }} />
          </div>
        </div>
        <p className="result text-md font-semibold">{result}</p>
        <button
          onClick={() => {
            setResult("Getting Exchange Rate...");
            fetch(
              `https://v6.exchangerate-api.com/v6/4690a7163cee1807c5fbd021/latest/${fromCurrency}`
            )
              .then((res) => res.json())
              .then((data) => {
                setResult(
                  `${+amount} ${fromCurrency} = ${(
                    +amount * data.conversion_rates[toCurrency]
                  ).toFixed(2)} ${toCurrency}`
                );
              });
          }}
          className="w-full bg-main-bg text-white py-2 px-3 mt-7 rounded-md 
        cursor-pointer hover:opacity-95 text-md font-[500]"
        >
          Get Exchange Rate
        </button>
      </div>
    </div>
  );
}

export default Card;
