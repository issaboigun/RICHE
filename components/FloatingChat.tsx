'use client';

import { MessageCircle } from 'lucide-react';

export default function FloatingChat() {
  return (
    <a
      href="https://www.instagram.com/riche0.1/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-30 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center sm:gap-2 sm:px-6 h-14 w-14 sm:h-auto sm:w-auto sm:py-4 font-bold uppercase tracking-wider group pointer-events-auto"
      aria-label="Chat with us on Instagram"
    >
      <MessageCircle size={20} className="group-hover:scale-110 transition-transform flex-shrink-0" />
      <span className="hidden sm:inline text-sm">Chat With Us</span>
    </a>
  );
}
