import React from 'react';

const PaymentSuccessPage = ({ orderName, onNewSearch }) => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-lg mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Platba proběhla úspěšně!</h2>
            <p className="text-gray-600 mt-2">Děkujeme za váš nákup.</p>
            <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg">
                <p><strong>Číslo vaší jízdenky (objednávky):</strong> {orderName}</p>
            </div>
            <p className="text-sm text-gray-500 mt-4">
                Potvrzení a jízdenku jsme vám zaslali na e-mail.
            </p>
            <div className="mt-8">
                <button onClick={onNewSearch} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Zakoupit další jízdenku
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
