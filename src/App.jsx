import React, { useState, useEffect, useRef } from 'react';

// ====================================================================
// OPRAVA: Vložené komponenty a data, aby se vyřešily chyby importu
// ====================================================================

// Mock pro překlady, dříve v './translations'
const translations = {
    cs: {
        'payment.redirecting': 'Přesměrovávám na platební bránu...',
        'profileMenu.tickets': 'Moje jízdenky',
        'profileMenu.profile': 'Můj profil',
        'profileMenu.documents': 'Moje dokumenty',
        'profileMenu.settings': 'Nastavení',
        'profileMenu.contacts': 'Kontakty',
        'profileMenu.about': 'O nás',
        'order.errorTitle': 'Chyba při objednávce',
        'search.from': 'Odkud',
        'search.to': 'Kam',
        'search.date': 'Datum',
        'search.button': 'Hledat spoje',
        'search.results.title': 'Nalezené spoje',
        'search.results.empty': 'Pro zadané parametry nebyly nalezeny žádné spoje.',
        'customer.form.title': 'Informace o cestujícím',
        'customer.form.submit': 'Pokračovat k platbě',
        'customer.form.back': 'Zpět na výběr sedadel',
        'seats.select': 'Vybrat sedadla',
        'seats.back': 'Zpět na výsledky',
        'confirmation.title': 'Potvrzení objednávky',
        'confirmation.newSearch': 'Nové vyhledávání',
        'payment.success.title': 'Platba úspěšná',
        'payment.failed.title': 'Platba se nezdařila',
    },
    en: {
        'payment.redirecting': 'Redirecting to payment gateway...',
        'profileMenu.tickets': 'My Tickets',
        'profileMenu.profile': 'My Profile',
        'profileMenu.documents': 'My Documents',
        'profileMenu.settings': 'Settings',
        'profileMenu.contacts': 'Contacts',
        'profileMenu.about': 'About Us',
        'order.errorTitle': 'Order Error',
        'search.from': 'From',
        'search.to': 'To',
        'search.date': 'Date',
        'search.button': 'Search for connections',
        'search.results.title': 'Found Connections',
        'search.results.empty': 'No connections were found for the given parameters.',
        'customer.form.title': 'Passenger Information',
        'customer.form.submit': 'Proceed to Payment',
        'customer.form.back': 'Back to Seat Selection',
        'seats.select': 'Select Seats',
        'seats.back': 'Back to Results',
        'confirmation.title': 'Order Confirmation',
        'confirmation.newSearch': 'New Search',
        'payment.success.title': 'Payment Successful',
        'payment.failed.title': 'Payment Failed',
    }
};

// Mock komponent, dříve v './components/*'
const LanguageSwitcher = ({ language, setLanguage }) => (
    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-transparent text-white font-semibold">
        <option value="cs" className="text-black">CZ</option>
        <option value="en" className="text-black">EN</option>
    </select>
);

const CurrencySwitcher = ({ currency, setCurrency }) => (
    <div className="flex space-x-1 bg-blue-800 p-1 rounded-md">
        {['CZK', 'EUR'].map(c => (
            <button key={c} onClick={() => setCurrency(c)} className={`px-2 py-1 text-sm rounded-md ${currency === c ? 'bg-white text-blue-700' : 'text-white hover:bg-blue-600'}`}>
                {c}
            </button>
        ))}
    </div>
);

const SeatSelection = ({ trip, onProceed, onBack, t, currency }) => {
    const [localSelected, setLocalSelected] = useState([]);
    const toggleSeat = (id) => {
        setLocalSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    };
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{t('seats.select')} pro spoj {trip.name}</h2>
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(id => (
                    <button key={id} onClick={() => toggleSeat(id)} className={`p-4 rounded ${localSelected.includes(id) ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                        {id}
                    </button>
                ))}
            </div>
            <div className="mt-4 flex justify-center space-x-4">
                <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">{t('seats.back')}</button>
                <button onClick={() => onProceed(localSelected)} className="px-4 py-2 bg-blue-600 text-white rounded" disabled={localSelected.length === 0}>Pokračovat</button>
            </div>
        </div>
    );
};

const CustomerForm = ({ isLoading, onSubmit, onBack, t }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const customerInfo = Object.fromEntries(formData.entries());
        onSubmit(customerInfo);
    };
    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">{t('customer.form.title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Jméno a příjmení" className="w-full p-2 border rounded" required />
                <input name="email" type="email" placeholder="E-mail" className="w-full p-2 border rounded" required />
                <input name="phone" type="tel" placeholder="Telefon" className="w-full p-2 border rounded" required />
                <div className="flex justify-between">
                    <button type="button" onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">{t('customer.form.back')}</button>
                    <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400">
                        {isLoading ? 'Zpracovávám...' : t('customer.form.submit')}
                    </button>
                </div>
            </form>
        </div>
    );
};

const ConfirmationPage = ({ orderResult, onNewSearch, t }) => (
    <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-4">{t('confirmation.title')}</h2>
        <p>Číslo vaší objednávky je: <strong>{orderResult.name}</strong></p>
        <button onClick={onNewSearch} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">{t('confirmation.newSearch')}</button>
    </div>
);

const PaymentSuccessPage = ({ orderName, onNewSearch, t }) => (
    <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-4">{t('payment.success.title')}</h2>
        <p>Objednávka <strong>{orderName}</strong> byla úspěšně zaplacena.</p>
        <button onClick={onNewSearch} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">{t('confirmation.newSearch')}</button>
    </div>
);

const PaymentFailedPage = ({ onNewSearch, t }) => (
    <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{t('payment.failed.title')}</h2>
        <p>Platba se bohužel nezdařila. Zkuste to prosím znovu.</p>
        <button onClick={onNewSearch} className="mt-6 px-6 py-2 bg-blue-600 text-white rounded">{t('confirmation.newSearch')}</button>
    </div>
);

const Header = ({ onNavigate, user, onProfileClick, t, language, setLanguage, currency, setCurrency }) => (
    <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="text-2xl font-bold cursor-pointer" onClick={onNavigate}>
                BUS-TICKET
            </div>
            <div className="flex items-center space-x-4">
                <LanguageSwitcher language={language} setLanguage={setLanguage} />
                <CurrencySwitcher currency={currency} setCurrency={setCurrency} />
                <img src={user.avatarUrl} alt="User Avatar" className="h-10 w-10 rounded-full cursor-pointer" onClick={onProfileClick} />
            </div>
        </div>
    </header>
);

const SearchForm = ({ onSearch, isLoading, cities, t }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        onSearch({ from: formData.get('from'), to: formData.get('to'), date: formData.get('date') });
    };
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">{t('search.from')}</label>
                <select name="from" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                    {cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
                </select>
            </div>
            <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">{t('search.to')}</label>
                <select name="to" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
                    {cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
                </select>
            </div>
            <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">{t('search.date')}</label>
                <input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full md:col-span-3 px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                {isLoading ? 'Hledám...' : t('search.button')}
            </button>
        </form>
    );
};

const SearchResults = ({ trips, onSelectTrip, isLoading, error, t }) => {
    if (isLoading) return <div className="text-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div></div>;
    if (error && !trips.length) return null; // Chyba se zobrazuje nad formulářem
    if (!trips.length) return <div className="text-center p-8 bg-white rounded-lg shadow-md"><p>{t('search.results.empty')}</p></div>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">{t('search.results.title')}</h2>
            {trips.map(trip => (
                <div key={trip.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                    <div>
                        <p className="font-bold text-lg">{trip.name}</p>
                        <p className="text-sm text-gray-600">{trip.departure_time} - {trip.arrival_time}</p>
                    </div>
                    <button onClick={() => onSelectTrip(trip)} className="px-4 py-2 bg-blue-600 text-white rounded">Vybrat</button>
                </div>
            ))}
        </div>
    );
};

// ====================================================================
// KONFIGURACE API
// ====================================================================
// Zde nastavte správnou adresu vašeho Odoo serveru
const API_BASE_URL = 'https://test.bus-ticket.info';

// Zde vložte API klíč, který jste nastavil v Odoo
// POZNÁMKA: V produkční aplikaci by měl být klíč uložen bezpečněji, 
// například pomocí environmentálních proměnných.
const API_KEY = 'test';
// ====================================================================


// Komponenta pro Stripe formulář
const StripePaymentForm = ({ processingValues, t }) => {
    const formRef = useRef(null);
    useEffect(() => {
        if (formRef.current) {
            formRef.current.submit();
        }
    }, []);
    return (
        <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4">{t('payment.redirecting')}</p>
            <form
                ref={formRef}
                action={processingValues.redirect_form_html.match(/action="([^"]+)"/)[1]}
                method="post"
                className="hidden"
            >
                {Object.entries(JSON.parse(processingValues.redirect_form_html.match(/<input type="hidden" name="data-set" value='([^']*)'/)[1])).map(([key, value]) => (
                    <input key={key} type="hidden" name={key} value={String(value)} />
                ))}
            </form>
        </div>
    );
};

// --- IKONY ---
const TicketIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 9a3 3 0 0 1 0 6v1a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-1a3 3 0 0 1 0-6V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></svg>;
const UserCircleIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>;
const FileTextIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>;
const SettingsIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>;
const InfoIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>;
const PhoneForwardedIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="18 8 22 12 18 16" /><line x1="14" y1="12" x2="22" y2="12" /><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;


const ProfileMenu = ({ user, onNavigate, onClose, t }) => {
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);
    const menuItems = [
        { label: t('profileMenu.tickets'), icon: TicketIcon, action: () => console.log('Jízdenky') },
        { label: t('profileMenu.profile'), icon: UserCircleIcon, action: () => console.log('Profil') },
        { label: t('profileMenu.documents'), icon: FileTextIcon, action: () => console.log('Dokumenty') },
        { label: t('profileMenu.settings'), icon: SettingsIcon, action: () => console.log('Nastavení') },
        { label: t('profileMenu.contacts'), icon: PhoneForwardedIcon, action: () => console.log('Kontakty') },
        { label: t('profileMenu.about'), icon: InfoIcon, action: () => console.log('O nás') },
    ];
    return (
        <div ref={menuRef} className="absolute top-16 right-4 w-64 bg-white rounded-lg shadow-xl z-50 border">
            <div className="p-4 border-b">
                <p className="font-bold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <nav className="py-2">
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        onClick={(e) => { e.preventDefault(); item.action(); onClose(); }}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        <item.icon className="h-5 w-5 mr-3 text-gray-500" />
                        <span>{item.label}</span>
                    </a>
                ))}
            </nav>
        </div>
    );
};

const ImageModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
                <img src={imageUrl} alt="Detail" className="max-w-[90vw] max-h-[90vh] rounded-lg" />
                <button onClick={onClose} className="absolute -top-4 -right-4 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center font-bold text-xl">&times;</button>
            </div>
        </div>
    );
};

// --- Hlavní komponenta aplikace ---
export default function App() {
    // --- STAVY ---
    const [language, setLanguage] = useState('cs');
    const [currency, setCurrency] = useState('CZK');
    const [view, setView] = useState('search');
    const [paymentProcessingValues, setPaymentProcessingValues] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [orderResult, setOrderResult] = useState(null);
    const [lastCustomerInfo, setLastCustomerInfo] = useState(null);
    const [trips, setTrips] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastSearchParams, setLastSearchParams] = useState(null);
    const [modalImage, setModalImage] = useState(null);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({ name: 'David Hasdo', email: 'david@hasdo.info', avatarUrl: 'https://placehold.co/40x40/E2E8F0/4A5568?text=DH' });

    // --- PŘEKLADOVÁ FUNKCE ---
    const t = (key, replacements = {}) => {
        let translation = translations[language]?.[key] || key;
        Object.keys(replacements).forEach(placeholder => {
            translation = translation.replace(`{${placeholder}}`, replacements[placeholder]);
        });
        return translation;
    };

    // --- CENTRÁLNÍ FUNKCE PRO API VOLÁNÍ ---
    const apiFetch = async (endpoint, options = {}) => {
        const url = `${API_BASE_URL}${endpoint}`;

        const headers = {
            'Content-Type': 'application/json',
            'api-key': API_KEY, // Správný název hlavičky podle controlleru
            ...options.headers,
        };

        const config = {
            ...options,
            headers,
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.error?.message || errorData.message || errorMessage;
            } catch (e) {
                // Nelze parsovat JSON, zůstane původní HTTP chyba
            }
            throw new Error(errorMessage);
        }

        // Pro případy jako 204 No Content, kde není tělo odpovědi
        if (response.status === 204) {
            return null;
        }

        return response.json();
    };


    // --- EFEKTY ---
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const txId = urlParams.get('tx_id');
        const orderName = urlParams.get('reference');

        if (txId && orderName) {
            setOrderResult({ name: orderName });
            setView('paymentSuccess');
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            setError(null);
            try {
                // Použití nové centrální funkce
                const data = await apiFetch('/api/stops', { method: 'GET' });
                // Očekáváme, že API vrátí přímo pole, pokud ne, upravte podle skutečné struktury
                setCities(data || []);
            } catch (e) {
                console.error("Chyba při načítání měst:", e);
                setError(`Nepodařilo se načíst seznam měst: ${e.message}`);
            }
        };
        fetchCities();
    }, []);

    // --- FUNKCE PRO OVLÁDÁNÍ APLIKACE ---
    const handleSearch = async (searchParams) => {
        setLoading(true);
        setError(null);
        setTrips([]);
        setLastSearchParams(searchParams);
        try {
            // Použití nové centrální funkce
            const data = await apiFetch('/api/v1/trips/search', {
                method: 'POST',
                body: JSON.stringify({ params: { from_city: searchParams.from, to_city: searchParams.to, departure_date: searchParams.date } }),
            });
            setTrips(data.result.trips || []);
        } catch (e) {
            console.error("Chyba při vyhledávání:", e);
            setError(e.message);
            setTrips([]);
        } finally {
            setLoading(false);
            setView('search');
        }
    };

    const handleSelectTrip = (trip) => {
        setSelectedTrip(trip);
        setView('seats');
    };

    const handleProceedToCustomerInfo = (seatIds) => {
        setSelectedSeats(seatIds);
        setView('customerInfo');
    };

    const handleConfirmOrder = async (customerInfo) => {
        setLoading(true);
        setError(null);
        setLastCustomerInfo(customerInfo);
        try {
            // Použití nové centrální funkce
            const data = await apiFetch('/api/v1/order/create', {
                method: 'POST',
                body: JSON.stringify({
                    trip_id: selectedTrip.id,
                    seat_ids: selectedSeats,
                    customer_info: customerInfo,
                    currency: currency
                })
            });

            if (data.processing_values) {
                setPaymentProcessingValues(data.processing_values);
                setView('payment');
            } else {
                setOrderResult(data.order);
                setView('confirmation');
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNewSearch = () => {
        setView('search');
        setSelectedTrip(null);
        setSelectedSeats([]);
        setOrderResult(null);
        setLastCustomerInfo(null);
        setTrips([]);
        setLastSearchParams(null);
        setError(null);
        setPaymentProcessingValues(null);
    };

    // --- RENDER ---
    const renderContent = () => {
        switch (view) {
            case 'seats':
                return selectedTrip && <SeatSelection trip={selectedTrip} onProceed={handleProceedToCustomerInfo} onBack={() => setView('search')} t={t} currency={currency} />;
            case 'customerInfo':
                return (
                    <div className="container mx-auto px-4 py-8">
                        <CustomerForm isLoading={loading} onSubmit={handleConfirmOrder} onBack={() => setView('seats')} t={t} />
                        {error && !loading && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4 max-w-lg mx-auto" role="alert">
                                <p className="font-bold">{t('order.errorTitle')}</p>
                                <p>{error}</p>
                            </div>
                        )}
                    </div>
                );
            case 'payment':
                return <StripePaymentForm processingValues={paymentProcessingValues} t={t} />;
            case 'paymentSuccess':
                return (
                    <div className="container mx-auto px-4 py-8">
                        <PaymentSuccessPage orderName={orderResult?.name} onNewSearch={handleNewSearch} t={t} />
                    </div>
                );
            case 'paymentFailed':
                return (
                    <div className="container mx-auto px-4 py-8">
                        <PaymentFailedPage onNewSearch={handleNewSearch} t={t} />
                    </div>
                );
            case 'confirmation':
                return orderResult && (
                    <div className="container mx-auto px-4 py-8">
                        <ConfirmationPage
                            orderResult={orderResult}
                            trip={selectedTrip}
                            customer={lastCustomerInfo}
                            onNewSearch={handleNewSearch}
                            t={t}
                        />
                    </div>
                );
            case 'search':
            default:
                return (
                    <>
                        <div className="relative bg-blue-700">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a_d5957?q=80&w=2069&auto=format&fit=crop')", opacity: 0.2 }}></div>
                            <div className="relative container mx-auto px-4 pt-16 pb-24">
                                <SearchForm onSearch={handleSearch} isLoading={loading} cities={cities} t={t} />
                                {error && (
                                    <div className="mt-4 max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <strong className="font-bold">Chyba! </strong>
                                        <span className="block sm:inline">{error}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="container mx-auto px-4 py-8 -mt-8">
                            <SearchResults trips={trips} onSelectTrip={handleSelectTrip} isLoading={loading} error={error} lastSearchParams={lastSearchParams} onImageClick={setModalImage} t={t} currency={currency} language={language} />
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <ImageModal imageUrl={modalImage} onClose={() => setModalImage(null)} />
            <Header
                onNavigate={handleNewSearch}
                view={view}
                selectedTrip={selectedTrip}
                selectedSeats={selectedSeats}
                orderResult={orderResult}
                user={currentUser}
                onProfileClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                t={t}
                language={language}
                setLanguage={setLanguage}
                currency={currency}
                setCurrency={setCurrency}
            />
            {isProfileMenuOpen && <ProfileMenu user={currentUser} onNavigate={handleNewSearch} onClose={() => setIsProfileMenuOpen(false)} t={t} />}
            <main>
                {renderContent()}
            </main>
        </div>
    );
}
