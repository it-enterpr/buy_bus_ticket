import React from 'react';

const CurrencySwitcher = ({ setCurrency, currentCurrency }) => {
    const currencies = ['CZK', 'UAH', 'EUR'];

    return (
        <div className="flex items-center bg-gray-200 rounded-full p-1">
            {currencies.map(currency => (
                <button
                    key={currency}
                    onClick={() => setCurrency(currency)}
                    className={`px-3 py-1 text-sm font-bold rounded-full transition-colors ${currentCurrency === currency ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                >
                    {currency}
                </button>
            ))}
        </div>
    );
};

// ZDE JE KLÍČOVÁ OPRAVA - PŘIDANÝ EXPORT
export default CurrencySwitcher;
