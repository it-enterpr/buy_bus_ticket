import React, { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';

const Header = ({ onNavigate, view, selectedTrip, selectedSeats, orderResult, onProfileClick, user, t, language, setLanguage, currency, setCurrency }) => {
    const [defaultHeaderText, setDefaultHeaderText] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const host = window.location.hostname;
            if (host === 'localhost' || host === '127.0.0.1') {
                setDefaultHeaderText(t('header.default'));
            } else {
                const parts = host.split('.');
                const domain = parts.slice(-2).join('.');
                setDefaultHeaderText(domain);
            }
        }
    }, [t]);

    const getContextualText = () => {
        switch (view) {
            case 'seats':
                return t('header.seats', { tripName: selectedTrip?.name || '' });
            case 'customerInfo':
                return t('header.customerInfo', { seatCount: selectedSeats.length });
            case 'confirmation':
                return t('header.confirmation', { orderName: orderResult?.name || '' });
            case 'paymentSuccess':
                return t('header.paymentSuccess', { orderName: orderResult?.name || '' });
            case 'paymentFailed':
                return t('header.paymentFailed');
            default:
                return t('header.search');
        }
    };

    const headerText = getContextualText() || defaultHeaderText;

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img src="/logo.svg" alt="BUS-Tickets.info Logo" className="h-10 cursor-pointer" onClick={() => onNavigate('search')} />
                    <LanguageSwitcher setLanguage={setLanguage} currentLang={language} />
                </div>
                {headerText && (
                    <div className="hidden md:block text-center text-gray-500 text-sm font-semibold truncate px-4">
                        {headerText}
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <CurrencySwitcher setCurrency={setCurrency} currentCurrency={currency} />
                    <div className="relative">
                        <button onClick={onProfileClick} className="h-10 w-10 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition">
                            <img src={user.avatarUrl} alt="Profilová fotka" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
