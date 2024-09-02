import { useEffect, useState } from "react";

function App() {
  const [radioChecked, setRadioChecked] = useState(null);
  const [calculatedVal, setCalculatedVal] = useState(null);
  const [error, setError] = useState([]);
  const [amount, setAmount] = useState(null);
  const [term, setTerm] = useState(null);
  const [interestRate, setInterestRate] = useState(null);

  function calculateRepaymentMortgage(principal, annualInterestRate, termInYears) {
    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const numberOfPayments = termInYears * 12;

    const monthlyPayment = principal * (monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfPayments)) / (Math.pow((1 + monthlyInterestRate), numberOfPayments) - 1);

    return monthlyPayment.toFixed(2);
}

const handleClear = () => {
  setRadioChecked(null)
  setAmount(null)
  setCalculatedVal(null)
  setTerm(null)
  setInterestRate(null)
  document.querySelectorAll('input').forEach(i => {
    i.value = ''
  })
}

function calculateTotalRepayment(principal, annualInterestRate, termInYears) {
  const monthlyPayment = calculateRepaymentMortgage(principal, annualInterestRate, termInYears);
  const totalRepayment = monthlyPayment * termInYears * 12;
  return totalRepayment.toFixed(2);
}

function calculateInterestOnlyMortgage(principal, annualInterestRate) {
  const monthlyInterestRate = (annualInterestRate / 100) / 12;

  const monthlyInterestPayment = principal * monthlyInterestRate;

  return monthlyInterestPayment.toFixed(2);
}

function calculateTotalInterestOnly(principal, annualInterestRate, termInYears) {
  const monthlyInterestPayment = calculateInterestOnlyMortgage(principal, annualInterestRate);
  const totalInterestPaid = monthlyInterestPayment * termInYears * 12;
  return totalInterestPaid.toFixed(2);
}

  useEffect(() => {
    console.log(error)
  }, [error])

  const handleSubmit = (e) => {
    setError([]);
    let errort = false
    e.preventDefault();
    [{vari: radioChecked, label: "radio"}, {vari: amount, label: "amount"}, {vari: term, label: "term"}, {vari: interestRate, label: "interest"}].forEach(d => {
      if (!d.vari) {
        setError(prev => [...prev, d.label])
        // errort = true
      }
    })
    if (errort) {
        if (radioChecked === 1) {
          setCalculatedVal({monthly: calculateInterestOnlyMortgage(amount, interestRate), total: calculateTotalInterestOnly(amount, interestRate, term)})
        } else {
          setCalculatedVal({monthly: calculateRepaymentMortgage(amount, interestRate, term), total: calculateTotalRepayment(amount, interestRate, term)})
        }
    }
    
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#e3f4fc] flex items-center justify-center">
        <div className="w-[68rem] bg-white max-md:h-full md:rounded-[30px] grid grid-cols-2 max-md:grid-cols-1">
          <form className="p-10" onSubmit={handleSubmit}>
            <div className="flex justify-between sm:items-center max-sm:flex-col">
              <h1 className="text-[1.5vw] max-md:text-[1.65rem] jakarta-bold animate-fade-right text-[#133040]">
                Mortgage Calculator
              </h1>
              <h1 className="jakarta underline text-slate-500 cursor-pointer animate-fade-left" onClick={handleClear}>
                Clear All
              </h1>
            </div>
            <div className="flex flex-col mt-10 gap-6">
              <div className="space-y-3 ">
                <label className="text-slate-600 jakarta animate-fade-right animate-delay-300">
                  Mortgage Amount
                </label>
                <div className={`w-full animate-fade-right animate-delay-300 ${error.find(e => e==="amount") ? "error-border" : ""} flex h-[3.25rem] slate-border rounded-[5px] form-area`}>
                  <div className={`jakarta-bold ${error.find(e => e==="amount") ? "error-bg" : ""} rounded-tl-[5px] input-icon rounded-bl-[5px] w-12 text-xl bg-[#e3f4fc] text-[#69859a] flex justify-center items-center`}>
                    £
                  </div>
                  <input
                  value={amount}
                    onInput={(e) => setAmount(e.target.value)}
                    type="number"
                    className="flex-1 pl-3 outline-none rounded-tr-[5px] input jakarta-bold  rounded-br-[5px]"
                  />
                </div>
                {error.find(e => e==="amount") && (
                  <p className="error-red jakarta">This field is required</p>
                )}
              </div>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
                <div className="space-y-3 w-full">
                  <label className="text-slate-600 jakarta animate-fade-right animate-delay-300">
                    Mortgage Term
                  </label>
                  <div className={`w-full animate-fade-right ${error.find(e => e==="term") ? "error-border" : ""} flex h-[3.25rem] slate-border rounded-[5px] form-area`}>
                    <input
                    value={term}
                      onInput={(e) => setTerm(e.target.value)}
                      type="number"
                      className="w-full pl-3 outline-none rounded-tl-[5px] input jakarta-bold  rounded-bl-[5px]"
                    />
                    <div className={`jakarta-bold ${error.find(e => e==="amount") ? "error-bg" : ""} rounded-tr-[5px] input-icon rounded-br-[5px] w-20 px-3 text-lg bg-[#e3f4fc] text-[#69859a] flex justify-center items-center`}>
                      years
                    </div>
                  </div>
                  {error.find(e => e==="term") && (
                    <p className="error-red jakarta">This field is required</p>
                  )}
                </div>
                <div className="space-y-3 w-full">
                  <label className="text-slate-600 jakarta animate-fade-left animate-delay-300">
                    Interest Rate
                  </label>
                  <div className={`w-full animate-fade-left ${error.find(e => e==="interest") ? "error-border" : ""} flex h-[3.25rem] slate-border rounded-[5px] form-area`}>
                    <input
                    value={interestRate}
                      onInput={(e) => setInterestRate(e.target.value)}
                      type="number"
                      className="w-full pl-3 outline-none rounded-tl-[5px] input jakarta-bold  rounded-bl-[5px]"
                    />
                    <div className={`jakarta-bold ${error.find(e => e==="interest") ? "error-bg" : ""} rounded-tr-[5px] input-icon rounded-br-[5px] w-20 text-lg bg-[#e3f4fc] text-[#69859a] flex justify-center items-center`}>
                      %
                    </div>
                  </div>
                {error.find(e => e==="interest") && (
                  <p className="error-red jakarta">This field is required</p>
                )}
                </div>
              </div>
              <div className="space-y-3 ">
                <label className="text-slate-600 jakarta animate-fade-up animate-delay-300">Mortgage Type</label>
                <div
                  onClick={() => setRadioChecked(2)}
                  className={`w-full animate-fade-up cursor-pointer flex h-[3.25rem]   ${
                    radioChecked == 2 ? "bg-lime" : "slate-border"
                  }  rounded-[5px] form-area`}
                >
                  <div
                    className={`jakarta-bold rounded-tl-[5px] rounded-bl-[5px] w-12 text-xl bg-changer text-[#69859a] flex justify-center items-center`}
                  >
                    <label class="custom-radio">
                      <input
                        type="radio"
                        checked={radioChecked === 2 ? true : false}
                        name="option"
                      />
                      <span class="radio"></span>
                    </label>
                  </div>
                  <div
                    className={`jakarta-bold w-full rounded-tr-[5px] input-icon rounded-br-[5px] text-lg bg-changer text-[#133040] flex items-center`}
                  >
                    Repayment
                  </div>
                </div>
                <div
                  onClick={() => setRadioChecked(1)}
                  className={`w-full animate-fade-up animate-delay-300 cursor-pointer flex h-[3.25rem] ${
                    radioChecked == 1 ? "bg-lime" : "slate-border"
                  } rounded-[5px] form-area`}
                >
                  <div
                    className={`jakarta-bold rounded-tl-[5px] rounded-bl-[5px] w-12 text-xl bg-changer text-[#69859a] flex justify-center items-center`}
                  >
                    <label class="custom-radio">
                      <input
                        type="radio"
                        checked={radioChecked === 1 ? true : false}
                        name="option"
                        value={1}
                        onChange={(e) => setRadioChecked(e.target.value)}
                      />
                      <span class="radio"></span>
                    </label>
                  </div>
                  <div className="jakarta-bold w-full rounded-tr-[5px] input-icon rounded-br-[5px] text-lg bg-changer text-[#133040] flex items-center">
                    Interest Only
                  </div>
                </div>
                {error.find(e => e === "radio") && (
                  <p className="error-red jakarta">This field is required</p>
                )}
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  className="bg-lime-btn animate-fade-down animate-delay-700 rounded-[100px] flex gap-3 justify-center items-center jakarta-bold text-[1.2rem] w-80 h-14"
                >
                  <img src="/assets/images/icon-calculator.svg" alt="" />
                  Calculate Repayments
                </button>
              </div>
            </div>
          </form>
          <div className="bg-[#133040] md:rounded-tr-[30px] md:rounded-br-[30px] md:rounded-bl-[70px]">
            {!calculatedVal && (
              <div className="w-full h-full max-md:py-20 flex justify-center items-center">
                <div className="flex flex-col items-center">
                  <img
                    src="/assets/images/illustration-empty.svg"
                    className="w-[192px] h-[192px] animate-fade-up"
                    alt=""
                  />
                  <h1 className=" text-[1.4rem] jakarta-bold text-slate-200 my-4 animate-fade-up animate-delay-300">
                    Results Shown here
                  </h1>
                  <p className="jakarta text-lg text-center text-[#69859a] animate-fade-up animate-delay-600">
                    Complete the form and click "calculate repayments" to <br />{" "}
                    see what your monthly repayments would be.
                  </p>
                </div>
              </div>
            )}
            {calculatedVal && (
              <div className="md:p-10 max-md:p-7">
                <h1 className="text-white jakarta-bold text-2xl">
                  Your results
                </h1>
                <p className="jakarta text-lg pt-5 pb-9 text-[#7b99b1]">
                  Your results are shown below based on the information you
                  provided. To adjust the results, edit the form and click
                  "calculate repayments" again.
                </p>
                <div className="w-full p-8 flex flex-col gap-3 bg-[#0a1a2383] rounded-tl-lg rounded-tr-lg border-t-4 border-lime">
                  <p className="jakarta text-lg text-[#7b99b1]">
                    Your monthly repayments
                  </p>
                  <h1 className="text-lime max-md:text-[12vw] pb-6 jakarta-bold text-[3.5vw] leading-none">
                    £{calculatedVal.monthly}
                  </h1>
                  <hr className="w-full pb-6 border-[#245c7a]" />
                  <p className="jakarta text-lg text-[#7b99b1]">
                    Total you'll repay over the term
                  </p>
                  <p className="jakarta-bold text-[1.5vw] max-md:text-[1.65rem] text-[#f4f4f4]">
                    £ {calculatedVal.total}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
