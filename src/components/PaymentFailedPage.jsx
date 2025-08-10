import React from 'react';

const PaymentFailedPage = ({ onNewSearch }) => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-lg mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Platba se nezdařila</h2>
            <p className="text-gray-600 mt-2">
                Vaše platba bohužel neproběhla v pořádku.
            </p>
            <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg">
                <p>Vaše místa jsou pro vás dočasně rezervována. Pro dokončení objednávky prosím kontaktujte naši podporu nebo zkuste platbu provést znovu.</p>
            </div>
            <div className="mt-8">
                <button onClick={onNewSearch} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Zkusit to znovu
                </button>
            </div>
        </div>
    );
};

export default PaymentFailedPage;
