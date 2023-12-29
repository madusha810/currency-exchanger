import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function MainPage() {

  const [date, setDate] = useState(null); 
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTaretCcurrency] = useState("");
  const [amountInSoureceCurrency, setAmountInSoureceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.get(
        "http://localhost:5000/convert", {
          params: {
            date,
            sourceCurrency,
            targetCurrency,
            amountInSoureceCurrency,
          },
        }
      );

      setAmountInTargetCurrency(response.data);
      setLoading(false);
    }catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    const getCurrencyName = async() => {
      try{
        const response = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setCurrencyNames(response.data);
      }catch(err){
        console.error(err);
      }
    }
    getCurrencyName();
  }, [])

  return (
    <div>
        <h1 className='lg:mx-32 text-5xl font-bold text-green-500'>Convert Your Currency Today</h1>
        <p className='lg:mx-32 opacity-40 py-6'>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
    
        <div className='mt-5 flex items-center justify-center flex-col'>
          <section className='w-full lg:w-1/2'>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label htmlFor={date} className="block mb-2 text-sm font-medium text-white-900">Date</label>
                  <input onChange={(e) => setDate(e.target.value)} type="date" id={date} name={date} className="bg-gray-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
              </div>  
              <div className="mb-4">
                  <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-white-900">Source Currency</label>
                  <select onChange={(e) => setSourceCurrency(e.target.value)} className='bg-gray-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' id={sourceCurrency} name={sourceCurrency} value={sourceCurrency}>
                    <option value=''>Select source currency</option>
                    {Object.keys(currencyNames).map((currency) => (
                      <option className='p-1' key={currency} value={currency}>{currencyNames[currency]}</option>
                    ))}
                  </select>
              </div>  
              <div className="mb-4">
                  <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-white-900">Target Currency</label>
                  <select onChange={(e) => setTaretCcurrency(e.target.value)} className='bg-gray-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500' name={targetCurrency} id={targetCurrency} value={targetCurrency}>
                    <option>Select target currency</option>
                    {Object.keys(currencyNames).map((currency) => (
                      <option className='p-1' key={currency} value={currency}>{currencyNames[currency]}</option>
                    ))}
                  </select>
              </div>  
              <div className="mb-4">
                  <label htmlFor={amountInSoureceCurrency} className="block mb-2 text-sm font-medium text-white-900">Amount in source currency</label>
                  <input onChange={(e) => setAmountInSoureceCurrency(e.target.value)} type="number" id={amountInSoureceCurrency} name={amountInSoureceCurrency} className="bg-gray-500 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 placeholder-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder='Amount in source currency' required />
              </div> 
              <button className='bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md'>Get the target currency</button>
            </form>
          </section>
        </div>

        {!loading ? (<section className='lg:mx-60 text-xl mt-5'>
           {amountInSoureceCurrency} {currencyNames[sourceCurrency]} is equal to <span className='text-green-500 font-bold'>{amountInTargetCurrency}</span> in {currencyNames[targetCurrency]}
        </section>) : null}
        
    </div>
  )
}
