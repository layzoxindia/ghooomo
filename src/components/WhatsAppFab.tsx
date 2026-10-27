import { ChatIcon } from "./Icons";
import { waLink } from "@/lib/site";

export default function WhatsAppFab() {
  return (
    <a
      href={waLink("Hi Ghooomo! I'd like to plan a holiday.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="btn fixed bottom-5 right-5 z-40 min-h-[58px] w-[58px] bg-wa px-0 text-white sm:w-auto sm:px-5 shadow-[0_14px_30px_rgba(20,131,74,0.4)] hover:bg-wa-deep"
    >
      <ChatIcon size={22} />
      <span className="hidden sm:inline">Chat</span>
    </a>
  );
}
