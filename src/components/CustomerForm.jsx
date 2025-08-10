import React, { useState } from 'react';

// Ikony pro tlačítka
const ArrowLeftIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>);
const ArrowRightIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);

const CustomerForm = ({ isLoading, onSubmit, onBack }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone) {
            // Místo alertu můžeme v budoucnu přidat lepší validaci
            console.error('Validation failed: All fields are required.');
            return;
        }
        onSubmit({ name, email, phone });
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Jméno a příjmení
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-mail
                    </label>
                    <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Telefon
                    </label>
                    <div className="mt-1">
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            autoComplete="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="p-3 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                        title="Zpět na výběr sedadel"
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-grow bg-blue-600 text-white font-bold text-lg p-3 rounded-md hover:bg-blue-700 transition-colors flex justify-center items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        ) : (
                            <>
                                <span>Pokračovat</span>
                                <ArrowRightIcon className="h-5 w-5 ml-2" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomerForm;
