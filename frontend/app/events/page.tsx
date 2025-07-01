'use client';
import { useEffect, useState } from 'react';

/**
 * Type definition for an Event
 */
type Event = {
  id: string;
  name: string;
  capacity: number;
  booked: number;
};

export default function EventsPage() {
  /**
   * State to hold all events from the backend
   */
  const [events, setEvents] = useState<Event[]>([]);

  /**
   * Error message for failed actions
   */
  const [error, setError] = useState('');

  /**
   * Used to ensure hydration only occurs on client side
   */
  const [mounted, setMounted] = useState(false);

  /**
   * useEffect to:
   * - Set the page as mounted (to avoid hydration mismatch)
   * - Fetch events from the backend
   */
  useEffect(() => {
    setMounted(true);
    fetchEvents();
  }, []);

  /**
   * Fetch all events from the backend API
   */
  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:3001/events');
      const data = await res.json();

      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        setEvents([]);
        setError('Unexpected response format from API');
      }
    } catch (err) {
      console.error('Failed to fetch events:', err);
      setError('Could not fetch events');
    }
  };

  /**
   * Book a seat for the given event ID.
   * If booking fails (e.g., event is full), show an error message.
   */
  const bookSeat = async (id: string) => {
    setError('');
    const res = await fetch(`http://localhost:3001/events/${id}/book`, {
      method: 'POST',
    });
    if (!res.ok) {
      const { message } = await res.json();
      setError(message);
    }
    fetchEvents(); // Refresh event list
  };

  // Prevent hydration issues by rendering only on client
  if (!mounted) return null;

  /**
   * Main UI rendering
   */
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6 text-center"> Events</h1>

        {/* Error message display */}
        {error && (
          <p className="mb-4 text-red-400 bg-red-900/30 px-4 py-2 rounded">{error}</p>
        )}

        {/* List of events */}
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="bg-gray-800 rounded-md p-4 flex justify-between items-center shadow-md"
            >
              <div>
                <h2 className="text-lg font-semibold">{event.name}</h2>
                <p className="text-sm text-gray-400">
                  {event.booked}/{event.capacity} seats booked
                </p>
              </div>

              {/* Book seat button (disabled if full) */}
              <button
                onClick={() => bookSeat(event.id)}
                disabled={event.booked >= event.capacity}
                className={`px-4 py-2 rounded text-sm font-medium ${
                  event.booked >= event.capacity
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {event.booked >= event.capacity ? 'Full' : 'Book Seat'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
