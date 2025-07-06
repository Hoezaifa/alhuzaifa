import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    const message =
      "Hi! I'm interested in your printing services. Could you please provide more information?";
    window.open(
      `https://wa.me/+923332054452?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
      <div className="absolute -top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us!
      </div>
    </button>
  );
}
