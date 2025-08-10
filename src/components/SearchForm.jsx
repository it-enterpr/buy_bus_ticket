import React, { useState, useEffect, useRef } from 'react';

const CalendarIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>);

const SearchForm = ({ onSearch, isLoading, cities, t }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const dateInputRef = useRef(null);
    useEffect(() => {
        if (cities.length > 0) {
            setFrom(cities[0] || '');
            setTo(cities[1] || '');
        }
    }, [cities]);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ from, to, date });
    };
    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg -mt-20 relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('search.title')}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                    <label htmlFor="from" className="block text-sm font-medium text-gray-600 mb-1">{t('search.from')}</label>
                    <select id="from" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full py-2.5 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        <option value="" disabled>{t('search.selectCity')}</option>
                        {cities.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="to" className="block text-sm font-medium text-gray-600 mb-1">{t('search.to')}</label>
                    <select id="to" value={to} onChange={(e) => setTo(e.target.value)} className="w-full py-2.5 px-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        <option value="" disabled>{t('search.selectCity')}</option>
                        {cities.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                </div>
                <div className="cursor-pointer" onClick={() => dateInputRef.current.showPicker()}>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-600 mb-1">{t('search.date')}</label>
                    <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        <input ref={dateInputRef} type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                </div>
                <div className="self-end"><button type="submit" disabled={isLoading || !from || !to} className="w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:bg-blue-300">{isLoading ? t('search.button.loading') : t('search.button')}</button></div>
            </form>
        </div>
    );
};

export default SearchForm;
