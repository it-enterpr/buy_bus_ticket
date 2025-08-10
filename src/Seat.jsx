// src/components/Seat.jsx

import React from 'react';

const Seat = ({ seat, isSelected, onSelect }) => {
    const getSeatClass = () => {
        if (seat.state === 'sold') return 'bg-gray-400 cursor-not-allowed';
        if (seat.state === 'reserved') return 'bg-yellow-400 cursor-not-allowed';
        if (isSelected) return 'bg-green-500 text-white';
        return 'bg-blue-200 hover:bg-blue-400 cursor-pointer';
    };

    const handleClick = () => {
        if (seat.state === 'available') {
            onSelect(seat.id);
        }
    };

    return (
        <div
            className={`w-12 h-12 flex items-center justify-center rounded-md font-bold text-sm transition-colors ${getSeatClass()}`}
            onClick={handleClick}
            style={{
                gridColumnStart: seat.pos_x + 1,
                gridRowStart: seat.pos_y + 1,
            }}
        >
            {seat.number}
        </div>
    );
};

export default Seat;