import { useState } from "react";
import Dropdown from "./Dropdown";

function Card() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EGP");
  function handleAmountInputChange(e: { target: { value: string } }) {
    if (isNaN(+e.target.value)) {
      return;
    }
    setAmount(e.target.value);
  }
  return (
    <div
      className="bg-white w-full max-w-[600px] px-[30px] py-[35px]
                    rounded-[7px]"
    >
      <div className="flex flex-col">
        <h1 className="text-center text-3xl font-bold">Currency Converter</h1>
        <div className="flex flex-col gap-2 mt-10">
          <label htmlFor="amount" className="text-xl font-semibold">
            Enter Amount
          </label>
          <input
            value={amount}
            onChange={handleAmountInputChange}
            type="text"
            id="amount"
            className="border border-gray-400 outline-none px-2 py-1.5 text-xl rounded-sm caret-main-bg"
          />
        </div>
        <div className="flex justify-between items-center my-10 px-2">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-semibold">From</span>
            <Dropdown
              label="From"
              currency={{ fromCurrency, setFromCurrency }}
            />
          </div>
          <button className="cursor-pointer self-end mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="black"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
          </button>
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">To</span>
            <Dropdown label="To" currency={{ toCurrency, setToCurrency }} />
          </div>
        </div>
        <p className="result text-lg font-semibold"> 1 USD = 52.3 EGP</p>
        <button
          className="w-full bg-main-bg text-white py-2 px-3 mt-7 rounded-md 
        cursor-pointer hover:bg-main-bg/90 text-lg font-[500]"
        >
          Get Exchange Rate
        </button>
      </div>
    </div>
  );
}

export default Card;
