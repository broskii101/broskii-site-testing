import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import UpcomingTripCard from '../components/UpcomingTripCard';
import { Helmet } from 'react-helmet-async';

import { 
  Calendar, 
  MapPin, 
  Mountain, 
  CheckCircle,
  X,
  Users, // Added for waitlist icon
  Mail, // Added for waitlist icon
  Phone, // Added for waitlist icon
  Send // Added for waitlist icon
} from 'lucide-react';
import { useForm } from 'react-hook-form'; // Import useForm for the waitlist modal
import { supabase } from '../lib/supabaseClient'; // Import supabase client
import toast from 'react-hot-toast'; // Import toast for notifications

// Define interface for waitlist form data
interface WaitlistFormInputs {
  fullName: string;
  email: string;
  phone: string;
}

const UpcomingTripDetailsPage = () => {
  const [fullScreenImage, setFullScreenImage] = React.useState<string | null>(null);
  const [showWaitlistModal, setShowWaitlistModal] = React.useState(false); // State to control modal visibility

  // Hardcoded trip capacity and booked count for testing
  const tripCapacity = 52; // Set the total capacity to 52
  const bookedCount = 52; // Set to 0 as no one has booked yet
  const isSoldOut = bookedCount >= tripCapacity; // Derived state for sold out logic

  const { register, handleSubmit, reset, formState: { errors } } = useForm<WaitlistFormInputs>(); // Initialize react-hook-form for waitlist

  const openFullScreenImage = (imageUrl: string) => {
    setFullScreenImage(imageUrl);
  };

  const closeFullScreenImage = () => {
    setFullScreenImage(null);
  };

  const premiumReveal = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  };

  const upcomingTrip = {
    id: '550e8400-e29b-41d4-a716-446655440000', // Valid UUID that matches the trips table
    title: 'SKI 3 VALLEYS',
    image: '/1000088456.jpg',
    dates: '10th - 17th January 2026',
    location: 'Val Thorens, French Alps',
    inclusions: [
      'Return flights with BA from LHR to GVA',
      'Full 3 Valleys Ski pass (Worth £370)',
      "4★ Luxury Hotel (L'Oxalys)",
      'Private Coach Transfer',
      'Ski in/out access',
      'Spa Facilities',
    ]
  };

  // Function to handle waitlist form submission
  const onWaitlistSubmit = async (data: WaitlistFormInputs) => {
    console.log('Submitting waitlist data:', data);
    console.log('Trip ID:', upcomingTrip.id);
    
    try {
      const insertData = {
        trip_id: upcomingTrip.id,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
      };
      
      console.log('Insert data:', insertData);
      
      const { data: result, error } = await supabase.from('waitlist').insert([
        insertData
      ]);

      console.log('Supabase response:', { result, error });
      
      if (error) {
        console.error('Supabase waitlist insert error:', error);
        toast.error(`Failed to join waitlist: ${error.message}`);
      } else {
        console.log('Successfully inserted waitlist entry');
        toast.success('Successfully joined the waitlist! We will notify you if a spot opens up.');
        reset(); // Reset form fields
        setShowWaitlistModal(false); // Close the modal
      }
    } catch (err) {
      console.error('Unexpected error during waitlist submission:', err);
      toast.error(`An unexpected error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }

  
    

  };

  return (
    <div className="min-h-screen bg-gray-50">


<Helmet>
        <title>
          Muslim Brothers Ski Trip to Tignes | April 2026 – Broskii
        </title>

        <meta
          name="description"
          content="Join Broskii on a Muslim brothers ski trip to Tignes in the French Alps this April, staying ski-in ski-out at one of Europe’s highest resorts, known for snow-sure conditions and incredible terrain."
        />

        <link
          rel="canonical"
          href="https://broskii.com/upcoming-trip"
        />
      </Helmet>

      {/* Header Section */}
      <section className="relative overflow-hidden min-h-[30vh] sm:min-h-[38vh] flex items-center">

  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/IMG-20250125-WA0048.webp"
      alt="Skiing in the Alps"
      className="absolute inset-0 w-full h-full object-cover"
    />
    {/* Cinematic overlay (lighter than before) */}
    <div className="absolute inset-0 bg-black/35"></div>

    {/* Subtle vignette for premium depth */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
  </div>

  <div className="max-w-7xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-white relative z-10 text-center"
    >
      <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2">
        Upcoming Trips
      </h1>

      <p className="text-lg text-primary-100 mb-3">
        Limited spaces
      </p>

      <p className="text-sm text-primary-100/90">
        Secure your place with a £300 deposit
      </p>
    </motion.div>
  </div>
</section>


      {/* Trip Details Section */}
<section className="py-12">
  <div className="max-w-7xl mx-auto px-6">
    {/* APRIL 2026 — TIGNES */}
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.05 }}
      className="text-center mb-8"
    >
      <p className="text-sm tracking-widest uppercase text-primary-600 font-semibold mb-2">
  April 2026
</p>

      <h2 className="text-3xl font-serif font-bold text-gray-900">
        Tignes, French Alps
      </h2>
    </motion.div>

    {/* Date + Location row ABOVE poster */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex flex-wrap items-center justify-center gap-3 mb-6"
    >
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-sm ring-1 ring-black/5">
        <Calendar className="h-4 w-4 text-primary-600" />
        <span className="text-sm font-medium text-gray-900">
          11–18 April 2026
        </span>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-sm ring-1 ring-black/5">
        <MapPin className="h-4 w-4 text-primary-600" />
        <span className="text-sm font-medium text-gray-900">
          Tignes, French Alps
        </span>
      </div>
    </motion.div>

    {/* April poster (clickable) */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="max-w-xl mx-auto"
    >
      <div className="relative">
        <img
          src="https://res.cloudinary.com/dtx0og5tm/image/upload/v1766105151/April_26_Tignes_Poster_erkrcb.jpg"
          alt="April 2026 Tignes Ski Trip Poster"
          onClick={() =>
            openFullScreenImage(
              "https://res.cloudinary.com/dtx0og5tm/image/upload/v1766105151/April_26_Tignes_Poster_erkrcb.jpg"
            )
          }
          className="w-full rounded-2xl shadow-xl cursor-pointer transition-transform duration-300 hover:scale-[1.01] ring-1 ring-black/5"
        />

        {/* Subtle “New” tag (premium + small) */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-gray-900 shadow-sm ring-1 ring-black/5">
          NEW
        </div>
      </div>
    </motion.div>

    {/* April details */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-10 max-w-2xl mx-auto"
    >
      {/* Why Tignes (short, premium) */}
      <motion.section {...premiumReveal} className="mb-8">

        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
          Why Tignes?
        </h3>
        <div className="space-y-2 text-gray-700">
          <p>
            High-altitude terrain and reliable late-season conditions make Tignes a strong choice for April skiing.
          </p>
          <p>
            Expect big, varied slopes with a great mix for different ability levels — plus a lively alpine resort feel.
          </p>
          </div>
          </motion.section>

    

      {/* What’s included (lightweight list — not a bulky card) */}
      <motion.section {...premiumReveal} className="mb-10">

        <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">
          What’s included?
        </h3>

        <div className="space-y-3">
          {[
            "BA Return flights from London Heathrow",
            "Ski-in / ski-out accommodation",
            "4★ Accommodation with Spa facilities",
            "Full area Ski Pass included",
            "Private Coach Transfers",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800 font-medium">{item}</span>
            </div>
          ))}
        </div>
        </motion.section>


      {/* April CTA */}
      <div className="text-center">
        <Link
          to="/booking"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-primary-600 text-white font-bold text-lg shadow-lg transition-transform duration-300 hover:bg-primary-700 hover:scale-105"
        >
          Book Now
        </Link>

        <p className="text-sm text-gray-600 mt-3">
          £300 deposit option available at checkout.
        </p>
      </div>
    </motion.div>

    {/* Divider */}
    <div className="mt-20 mb-10">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </div>

    {/* JAN 2026 — SOLD OUT (poster only) */}
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-xs tracking-widest uppercase text-gray-500 font-semibold mb-2">
          January 2026
        </p>
        <h3 className="text-2xl font-serif font-bold text-gray-900">
          Sold Out
        </h3>
      </div>

      <div className="relative">
        <img
          src="/1000088456.jpg"
          alt="January 2026 Val Thorens Ski Trip Poster – Sold Out"
          onClick={() => openFullScreenImage("/1000088456.jpg")}
          className="w-full rounded-2xl shadow-lg cursor-pointer ring-1 ring-black/5 opacity-95"
        />

        {/* Sold out banner/badge */}
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          SOLD OUT
        </div>
      </div>
    </div>

    {/* Got questions (footer-style support block) */}
    <div className="mt-20 text-center">
      <p className="text-gray-800 mb-6 text-lg">
        Got questions?
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/faq"
          className="px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-medium transition hover:bg-gray-200"
        >
          FAQs
        </Link>

        <Link
          to="/contact"
          className="px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-medium transition hover:bg-gray-200"
        >
          Contact Us
        </Link>
      </div>
    </div>
  </div>
</section>


      {/* Full Screen Image Modal */}
      {fullScreenImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeFullScreenImage}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fullScreenImage}
              alt="Full screen view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={closeFullScreenImage}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowWaitlistModal(false)} // Close modal on backdrop click
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
          >
            <button
              onClick={() => setShowWaitlistModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 text-center">
              Join the Waitlist
            </h2>
            <p className="text-gray-700 text-center mb-6">
              This trip is currently full. Enter your details below, and we'll notify you if a spot opens up!
            </p>

            <form onSubmit={handleSubmit(onWaitlistSubmit)} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline h-4 w-4 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  {...register('fullName', { required: 'Full name is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your phone number (optional)"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-lg transition-transform duration-300 transform hover:scale-105"
              >
                <Send className="h-5 w-5" />
                <span>Submit</span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default UpcomingTripDetailsPage;