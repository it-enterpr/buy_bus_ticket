import React from 'react';
import TripCard from './TripCard';

const SearchResults = ({ trips, onSelectTrip, isLoading, error, lastSearchParams, onImageClick, t, currency, language }) => {
    if (isLoading) return <div className="text-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div><p className="mt-4">{t('results.loading')}</p></div>;
    if (error && !isLoading) return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert"><p className="font-bold">{t('results.error')}</p><p>{error}</p></div>;
    if (trips.length === 0 && !lastSearchParams) return null;

    const locale = language === 'uk' ? 'uk-UA' : language === 'en' ? 'en-US' : 'cs-CZ';

    const formatDate = (dateString, locale) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    return (
        <div className="space-y-4">
            {trips.length > 0 ? (
                trips.map(trip => <TripCard key={trip.id} trip={trip} onSelect={onSelectTrip} onImageClick={onImageClick} t={t} currency={currency} language={language} />)
            ) : (
                lastSearchParams && !isLoading && <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
                    <p className="font-bold mb-2">{t('results.noResults')}</p>
                    {lastSearchParams && (
                        <p className="text-sm text-gray-600 mb-4">
                            {t('results.searchedFor', { from: lastSearchParams.from, to: lastSearchParams.to, date: formatDate(lastSearchParams.date, locale) })}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
