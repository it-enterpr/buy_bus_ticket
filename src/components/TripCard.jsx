import React from 'react';

// Ikony
const BusIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 6v6" /><path d="M16 6v6" /><path d="M2 12h19.6" /><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>);
const UserDriverIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>);
const PhoneIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
const SeatIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 12V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v5" /><path d="M20 17.5a2.5 2.5 0 0 1-5 0" /><path d="M4 17.5a2.5 2.5 0 0 0 5 0" /><path d="M2 12h20" /></svg>);
const BookmarkIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>;
const ShoppingCartIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>;
const MessageSquareIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;

// Pomocné funkce
const formatDateTime = (dateTimeString, locale) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString(locale, { hour: '2-digit', minute: '2-digit' }).replace(',', '');
};
const formatDate = (dateString, locale) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const TripCard = ({ trip, onSelect, onImageClick, t, currency, language }) => {
    const locale = language === 'uk' ? 'uk-UA' : language === 'en' ? 'en-US' : 'cs-CZ';
    const price = trip.price ? trip.price[currency.toLowerCase()] : 'N/A';
    const currencySymbols = { CZK: 'Kč', UAH: '₴', EUR: '€' };

    const handleActionClick = (e, action) => {
        e.stopPropagation(); // Zabrání prokliknutí na celou kartu
        console.log(`Akce: ${action} pro spoj ${trip.id}`);
        if (action === 'buy' || action === 'seats') {
            onSelect(trip);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-500 flex flex-col">
            <div className="p-4 flex-grow cursor-pointer" onClick={() => onSelect(trip)}>
                <div className="flex justify-between items-start border-b pb-3 mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{trip.name}</h3>
                        <p className="text-sm text-gray-500">{formatDate(trip.departure_time, locale)}</p>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 whitespace-nowrap pl-4">
                        {price !== 'N/A' ? `${price} ${currencySymbols[currency]}` : 'N/A'}
                    </div>
                </div>
                <div className="flex items-center justify-between text-gray-700 mb-4">
                    <div className="font-bold text-lg">{formatDateTime(trip.departure_time, locale)}</div>
                    <div className="text-center px-2">
                        <BusIcon className="h-5 w-5 mx-auto text-gray-400" />
                    </div>
                    <div className="font-bold text-lg">{formatDateTime(trip.arrival_time, locale)}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3">
                        {trip.vehicle?.photo_url ? (
                            <img src={trip.vehicle.photo_url} alt={trip.vehicle.name} className="h-10 w-10 rounded-full object-cover cursor-pointer" onClick={(e) => { e.stopPropagation(); onImageClick(trip.vehicle.photo_url); }} />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center"><BusIcon className="h-5 w-5 text-gray-500" /></div>
                        )}
                        <div>
                            <p className="font-semibold text-gray-800">{trip.vehicle?.name || 'N/A'}</p>
                            <p className="text-gray-500">{trip.vehicle?.license_plate || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {trip.driver?.photo_url ? (
                            <img src={trip.driver.photo_url} alt={trip.driver.name} className="h-10 w-10 rounded-full object-cover cursor-pointer" onClick={(e) => { e.stopPropagation(); onImageClick(trip.driver.photo_url); }} />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center"><UserDriverIcon className="h-5 w-5 text-gray-500" /></div>
                        )}
                        <div>
                            <p className="font-semibold text-gray-800">{trip.driver?.name || 'N/A'}</p>
                            {trip.driver?.phone && <p className="text-gray-500 flex items-center gap-1"><PhoneIcon className="h-3 w-3" /> {trip.driver.phone}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 p-2 border-t flex justify-around items-center text-xs">
                <button onClick={(e) => handleActionClick(e, 'reserve')} className="flex flex-col items-center text-gray-600 hover:text-blue-600 p-1 transition-colors">
                    <BookmarkIcon className="h-5 w-5 mb-1" />
                    <span>{t('tripCard.reserve')}</span>
                </button>
                <button
                    onClick={(e) => handleActionClick(e, 'seats')}
                    className="flex flex-col items-center text-blue-600 hover:text-blue-800 font-bold p-1 transition-colors"
                >
                    <SeatIcon className="h-5 w-5 mb-1" />
                    <span>{t('tripCard.seats')} ({trip.available_seats})</span>
                </button>
                <button
                    onClick={(e) => handleActionClick(e, 'buy')}
                    className="flex flex-col items-center text-gray-600 hover:text-blue-600 p-1 transition-colors"
                >
                    <ShoppingCartIcon className="h-5 w-5 mb-1" />
                    <span>{t('tripCard.buy')}</span>
                </button>
                <button onClick={(e) => handleActionClick(e, 'contact')} className="flex flex-col items-center text-gray-600 hover:text-blue-600 p-1 transition-colors">
                    <MessageSquareIcon className="h-5 w-5 mb-1" />
                    <span>{t('tripCard.contact')}</span>
                </button>
            </div>
        </div>
    );
};

export default TripCard;
