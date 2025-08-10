import React, { useState, useEffect, useRef } from 'react';
// Importujeme nové soubory
import { translations } from './translations';
import LanguageSwitcher from './components/LanguageSwitcher';
import CurrencySwitcher from './components/CurrencySwitcher';
// Importujeme ostatní komponenty
import SeatSelection from './components/SeatSelection';
import CustomerForm from './components/CustomerForm';
import ConfirmationPage from './components/ConfirmationPage';
import PaymentSuccessPage from './components/PaymentSuccessPage';
import PaymentFailedPage from './components/PaymentFailedPage';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

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
const SettingsIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>;
const InfoIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>;
const PhoneForwardedIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="18 8 22 12 18 16" /><line x1="14" y1="12" x2="22" y2="12" /><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;

const API_BASE_URL = '/api/v1';
const API_KEY = 'test';

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
                const apiUrl = `${API_BASE_URL}/cities`;
                const response = await fetch(apiUrl, { method: 'GET' });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                if (data.error) throw new Error(data.error.message || 'Neznámá chyba API');
                setCities(data.cities || []);
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
            const apiUrl = `${API_BASE_URL}/trips/search`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
                body: JSON.stringify({ params: { from_city: searchParams.from, to_city: searchParams.to, departure_date: searchParams.date } }),
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error.message || 'Unknown API error');
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
            const apiUrl = `${API_BASE_URL}/order/create`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
                body: JSON.stringify({
                    trip_id: selectedTrip.id,
                    seat_ids: selectedSeats,
                    customer_info: customerInfo,
                    currency: currency
                })
            });
            const data = await response.json();
            if (!response.ok || data.error) throw new Error(data.error?.message || `HTTP error ${response.status}`);

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
