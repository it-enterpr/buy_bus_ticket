import React, { useState, useEffect, useMemo } from 'react';

// --- API Konfigurace ---
const API_BASE_URL = '/api/v1';
const API_KEY = 'test';

// --- IKONY ---
const ArrowLeftIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>);
const ArrowRightIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
const UserIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>);

// --- Komponenta pro jedno sedadlo (s opravenou logikou barev) ---
const Seat = ({ seat, isSelected, onSelect }) => {
    // Třídy pro různé stavy sedadla
    const getSeatClass = () => {
        switch (seat.state) {
            case 'sold':
                return 'bg-gray-400 text-gray-600 cursor-not-allowed';
            case 'reserved':
                return 'bg-yellow-400 text-yellow-800 cursor-not-allowed';
            case 'available':
                if (isSelected) {
                    return 'bg-blue-600 text-white shadow-lg ring-2 ring-offset-2 ring-blue-500';
                }
                return 'bg-gray-200 text-gray-800 hover:bg-blue-200';
            default:
                return 'bg-gray-200';
        }
    };

    return (
        <button
            disabled={seat.state !== 'available'}
            onClick={() => onSelect(seat.id)}
            className={`h-10 w-10 flex items-center justify-center rounded-md font-bold text-sm transition-all duration-200 ${getSeatClass()}`}
            style={{
                gridColumn: seat.pos_x + 1,
                gridRow: seat.pos_y + 1,
            }}
            title={`Sedadlo ${seat.number} (${seat.state})`}
        >
            {seat.state !== 'available' ? <UserIcon /> : seat.number}
        </button>
    );
};

// --- Hlavní komponenta pro výběr sedadel ---
const SeatSelection = ({ trip, onProceed, onBack }) => {
    const [seats, setSeats] = useState([]);
    const [layout, setLayout] = useState({ max_x: 4, max_y: 10 });
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSeats = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/trip/${trip.id}/seats`, {
                    method: 'GET',
                    headers: { 'X-API-Key': API_KEY }
                });
                if (!response.ok) throw new Error(`Chyba sítě: ${response.statusText}`);
                const data = await response.json();
                if (data.error) throw new Error(data.error.message || 'Neznámá chyba API');
                setSeats(data.seats || []);
                setLayout(data.layout || { max_x: 4, max_y: 10 });
            } catch (err) {
                setError(err.message);
                console.error("Chyba při načítání sedadel:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSeats();
    }, [trip.id]);

    const handleSeatSelect = (seatId) => {
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
        );
    };

    const selectedSeatDetails = useMemo(() => seats.filter(s => selectedSeats.includes(s.id)), [seats, selectedSeats]);
    const totalPrice = useMemo(() => selectedSeatDetails.length * (trip.price?.czk || 0), [selectedSeatDetails, trip.price]);

    if (loading) return <div className="flex items-center justify-center h-[calc(100vh-80px)]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    if (error) return <div className="p-4 m-4 bg-red-100 border-l-4 border-red-500 text-red-700"><p className="font-bold">Chyba!</p><p>{error}</p></div>;

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-100 max-w-3xl mx-auto">
            <main className="flex-grow overflow-y-auto p-4 flex justify-center">
                <div
                    className="p-4 bg-white rounded-lg shadow-inner inline-grid gap-2 self-start"
                    style={{
                        gridTemplateColumns: `repeat(${layout.max_x + 1}, 2.5rem)`,
                        gridTemplateRows: `repeat(${layout.max_y + 1}, auto)`,
                    }}
                >
                    {seats.map(seat => (
                        <Seat
                            key={seat.id}
                            seat={seat}
                            isSelected={selectedSeats.includes(seat.id)}
                            onSelect={handleSeatSelect}
                        />
                    ))}
                </div>
            </main>
            <footer className="flex-shrink-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] border-t">
                <div className="mb-4 h-5">
                    {selectedSeats.length > 0 ? (
                        <div className="flex items-baseline justify-between text-sm">
                            <span className="font-bold text-gray-800">{selectedSeats.length} &times; Místo:</span>
                            <span className="font-mono text-gray-600 ml-2 truncate">{selectedSeatDetails.map(s => s.number).join(', ')}</span>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 text-sm">Pro pokračování vyberte alespoň jedno místo</p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="p-3 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors" title="Zpět na výběr spojů">
                        <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                    <button onClick={() => onProceed(selectedSeats)} disabled={selectedSeats.length === 0} className="flex-grow bg-blue-600 text-white font-bold text-lg p-3 rounded-md hover:bg-blue-700 transition-colors flex justify-between items-center disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <span>NAKOUPIT</span>
                        <div className="flex items-center">
                            <span>{totalPrice.toFixed(2)} Kč</span>
                            <ArrowRightIcon className="h-5 w-5 ml-2" />
                        </div>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default SeatSelection;
