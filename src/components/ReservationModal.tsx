import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';
import { ReservationData } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('2026-09-15');
  const [time, setTime] = useState('07:30 PM');
  const [seating, setSeating] = useState<'counter' | 'booth' | 'terrace'>('counter');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes: ReservationData = {
      id: `RES-${Math.floor(100 + Math.random() * 900)}`,
      name,
      phone,
      guests,
      date,
      time,
      seating,
      specialRequests,
      createdAt: new Date().toISOString(),
    };
    setConfirmedReservation(newRes);
  };

  const resetForm = () => {
    setConfirmedReservation(null);
    onClose();
  };

  const timeSlots = [
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '06:30 PM',
    '07:30 PM',
    '08:30 PM',
    '09:15 PM',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fff8f6] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#efdfda] animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#efdfda]">
          <div>
            <span className="text-[11px] font-bold text-[#9a0c06] uppercase tracking-wider">
              Omotenashi Table Booking
            </span>
            <h3 className="font-display text-xl text-[#221a17] font-bold">
              Reserve at Vega City Outpost
            </h3>
          </div>
          <button
            onClick={resetForm}
            className="w-8 h-8 rounded-full bg-[#fbebe5] flex items-center justify-center text-[#5a403c] hover:text-[#221a17]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmedReservation ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#c7e6dc] text-[#48645c] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#48645c] uppercase tracking-widest block mb-1">
                Booking Confirmed
              </span>
              <h4 className="font-display text-2xl font-bold text-[#221a17]">
                We Look Forward to Welcoming You!
              </h4>
              <p className="text-xs text-[#5a403c] mt-1">
                Reservation #{confirmedReservation.id} for {confirmedReservation.name} ({confirmedReservation.guests} Guests).
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#efdfda] text-xs text-left space-y-1.5 text-[#5a403c]">
              <div className="flex justify-between">
                <span>Date &amp; Time:</span>
                <strong className="text-[#221a17]">
                  {confirmedReservation.date} at {confirmedReservation.time}
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Seating:</span>
                <strong className="text-[#221a17] capitalize">
                  {confirmedReservation.seating} Seating
                </strong>
              </div>
              <div className="flex justify-between">
                <span>Contact Phone:</span>
                <strong className="text-[#221a17]">{confirmedReservation.phone}</strong>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <strong className="text-[#221a17]">3rd Floor, Nexus Vega City Mall</strong>
              </div>
            </div>

            <p className="text-[11px] text-[#8f706b]">
              A confirmation SMS has been queued to {confirmedReservation.phone}. Tables are held for 15 minutes past reservation time.
            </p>

            <button
              onClick={resetForm}
              className="w-full py-3 rounded-xl bg-[#bd2a1d] text-white text-xs sm:text-sm font-bold hover:bg-[#9a0c06] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-4 space-y-4 text-xs">
            {/* Guest Count */}
            <div>
              <label className="block text-xs font-bold text-[#221a17] mb-1.5">
                Number of Guests
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 6, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuests(num)}
                    className={`flex-1 py-2 rounded-lg font-bold border transition-all cursor-pointer ${
                      guests === num
                        ? 'border-[#bd2a1d] bg-[#fff1ec] text-[#9a0c06]'
                        : 'border-[#efdfda] bg-white text-[#5a403c]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#221a17] mb-1">
                  Reservation Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#efdfda] text-[#221a17] focus:outline-hidden focus:ring-1 focus:ring-[#bd2a1d]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#221a17] mb-1">
                  Preferred Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#efdfda] text-[#221a17] focus:outline-hidden focus:ring-1 focus:ring-[#bd2a1d]"
                >
                  {timeSlots.map((ts) => (
                    <option key={ts} value={ts}>
                      {ts}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seating preference */}
            <div>
              <label className="block text-xs font-bold text-[#221a17] mb-1.5">
                Seating Atmosphere
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'counter', title: 'Counter Bar', desc: 'Izakaya View' },
                  { id: 'booth', title: 'Booth Table', desc: 'Cozy Dining' },
                  { id: 'terrace', title: 'Food Terrace', desc: 'Airy & Lively' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSeating(s.id as any)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      seating === s.id
                        ? 'border-[#bd2a1d] bg-[#fff1ec] text-[#9a0c06] font-bold'
                        : 'border-[#efdfda] bg-white text-[#5a403c]'
                    }`}
                  >
                    <div className="font-bold text-xs">{s.title}</div>
                    <div className="text-[10px] opacity-75">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#221a17] mb-1">
                  Guest Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#efdfda] text-[#221a17] focus:outline-hidden focus:ring-1 focus:ring-[#bd2a1d]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#221a17] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#efdfda] text-[#221a17] focus:outline-hidden focus:ring-1 focus:ring-[#bd2a1d]"
                />
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs font-bold text-[#221a17] mb-1">
                Special Requests / Dietary Notes (Optional)
              </label>
              <input
                type="text"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Anniversary celebration, purely vegetarian guest..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#efdfda] text-[#221a17] focus:outline-hidden focus:ring-1 focus:ring-[#bd2a1d]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#bd2a1d] text-white text-xs sm:text-sm font-bold hover:bg-[#9a0c06] transition-all shadow-md mt-2 cursor-pointer"
            >
              Confirm Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
