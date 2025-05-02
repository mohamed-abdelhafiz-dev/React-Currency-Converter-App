import Currencies from "../data/currencies";
import { useEffect, useMemo, useRef, useState } from "react";
// Handler hook for when Outside click dropdown close
const useClickOutside = (handler: () => void) => {
  const domNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maybeHandler = (event: { target: EventTarget | null }) => {
      if (
        domNode.current &&
        event.target instanceof Node &&
        !domNode.current.contains(event.target)
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};
// Handler hook for when Outside click dropdown close End Code====>>
interface dropdownProps {
  label: string;
  currency: {
    toCurrency?: string;
    fromCurrency?: string;
    setFromCurrency?: (c: string) => void;
    setToCurrency: (c: string) => void;
  };
}
const Dropdown = ({ label, currency }: dropdownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedCurrency = useMemo(() => {
    return label === "From" ? currency.fromCurrency : currency.toCurrency;
  }, [currency, label]);
  console.log(selectedCurrency);
  const domNode = useClickOutside(() => {
    setDropdownOpen(false);
  });

  useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/4690a7163cee1807c5fbd021/latest/${selectedCurrency}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.conversion_rates);
      });
  }, []);
  return (
    <>
      {/* <!-- ====== Dropdowns Section Start --> */}
      <section className="dark:bg-dark">
        <div className="container">
          <div className="flex flex-wrap">
            {/* one */}
            <div ref={domNode} className="text-center">
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center rounded-[5px] px-5 py-[13px] text-lg font-semibold text-black border border-gray-400`}
                >
                  {/* {label} */}
                  <div className="flex gap-2">
                    <img
                      src={`https://flagcdn.com/20x15/${Currencies.find(
                        (currency) => currency.code === selectedCurrency
                      )?.country.toLowerCase()}.png`}
                      alt=""
                    />
                    <span>{selectedCurrency}</span>
                  </div>
                  <span className="pl-4">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4063 5.65625 17.6875 5.9375C17.9687 6.21875 17.9687 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1563 10.1875 14.25 10 14.25Z" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`max-h-90 overflow-auto overflow-x-hidden border border-gray-300 w-full shadow-1 dark:shadow-box-dark absolute left-0 z-40 my-2  rounded-md  transition-all ${
                    dropdownOpen
                      ? "top-full opacity-100 visible"
                      : "top-[110%] invisible opacity-0"
                  }`}
                >
                  {Currencies.map((currency) => (
                    <DropdownItem key={currency.code} currency={currency} />
                  ))}
                </div>
              </div>
            </div>
            {/* End */}
          </div>
        </div>
      </section>
      {/* <!-- ====== Dropdowns Section End -->    */}
    </>
  );
};

export default Dropdown;

const DropdownItem = ({
  currency,
}: {
  currency: { code: string; country: string };
}) => {
  return (
    <div className="flex gap-2 bg-white border-b-[0.5px] border-b-gray-300 cursor-pointer py-3 px-3 text-lg font-semibold text-black/60 hover:text-black">
      <img
        src={`https://flagcdn.com/16x12/${currency.country.toLowerCase()}.png`}
        alt=""
      />
      <span> {currency.code}</span>
    </div>
  );
};
