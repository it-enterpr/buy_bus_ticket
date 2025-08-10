import React from 'react';

// Ikony
const UserDriverIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>);
const PhoneIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
const MailIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>);


const ConfirmationPage = ({ orderResult, trip, customer, onNewSearch }) => {

    // Získání čísel sedadel z objednávky (předpokládáme, že API je může vrátit v order_line)
    // Pokud ne, bude potřeba upravit API, aby vracelo i detaily o sedadlech
    const seatNumbers = orderResult?.order_line?.map(line => line.name.split('Seat ')[1]).join(', ') || 'N/A';

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-lg mx-auto text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">Rezervace úspěšně vytvořena!</h2>

            <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg border">
                <p className="text-sm">
                    Rezervace č. <strong className="text-blue-600">{orderResult?.name}</strong> na spoj <strong className="text-blue-600">{trip?.name}</strong>,
                    místo č. <strong className="text-blue-600">{seatNumbers}</strong> na jméno <strong className="text-blue-600">{customer?.name}</strong> je vytvořena.
                </p>
                <div className="mt-4 pt-4 border-t">
                    <p className="font-semibold mb-2">Pro další informace kontaktujte řidiče:</p>
                    <div className="flex items-center gap-4">
                        {trip?.driver?.photo_url ? (
                            <img src={trip.driver.photo_url} alt={trip.driver.name} className="h-12 w-12 rounded-full object-cover" />
                        ) : (
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <UserDriverIcon className="h-6 w-6 text-gray-500" />
                            </div>
                        )}
                        <div>
                            <p className="font-bold text-gray-800">{trip?.driver?.name || 'N/A'}</p>
                            {trip?.driver?.phone && <p className="text-sm text-gray-600 flex items-center gap-2"><PhoneIcon className="h-4 w-4" /> {trip.driver.phone}</p>}
                            {trip?.driver?.email && <p className="text-sm text-gray-600 flex items-center gap-2"><MailIcon className="h-4 w-4" /> {trip.driver.email}</p>}
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
                Potvrzení rezervace bylo odesláno na Váš e-mail.
            </p>

            <div className="mt-8">
                <button onClick={onNewSearch} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Hledat nový spoj
                </button>
            </div>
        </div>
    );
};

export default ConfirmationPage;
