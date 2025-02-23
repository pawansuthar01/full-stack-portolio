import { Mail, MessageSquare, User } from "lucide-react";
import { useState } from "react";

function ContactList() {
  const [messages, setMessages] = useState([
    {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      subject: "Project Collaboration Opportunity",
      message:
        "Hi there! I came across your portfolio and I'm really impressed with your skills. I have an exciting project that I think would be perfect for your expertise. Would you be interested in discussing a potential collaboration?",
      timestamp: "2024-03-15 10:30:00",
    },
    {
      name: "Michael Chen",
      email: "m.chen@techcorp.com",
      subject: "Frontend Developer Position",
      message:
        "We are looking for a talented frontend developer to join our team. Your portfolio showcases exactly the kind of skills we're looking for. Would you be available for an interview next week?",
      timestamp: "2024-03-14 15:45:00",
    },
    {
      name: "Emily Davis",
      email: "emily.d@designstudio.com",
      subject: "UI/UX Consultation Request",
      message:
        "Hello! I'm working on a new project and would love to get your input on some UI/UX challenges we're facing. Your portfolio shows great attention to user experience. Can we schedule a consultation?",
      timestamp: "2024-03-13 09:15:00",
    },
  ]);
  return (
    <div className="p-8 max-sm:p-0 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Messages List */}
        <div className="bg-[#2a2a2a] p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="text-blue-400" />
            Messages ({messages.length})
          </h2>
          {messages.length > 0 ? (
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-[#333] rounded-lg p-6 border-l-4 border-blue-500"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                      <User className="text-blue-400" size={20} />
                      <span className="font-semibold">{msg.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="text-blue-400" size={20} />
                      <span className="text-gray-400 max-sm:text-sm">
                        {msg.email}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">
                    {msg.subject}
                  </h3>
                  <p className="text-gray-300 mb-4 whitespace-pre-wrap">
                    {msg.message}
                  </p>
                  {msg.timestamp && (
                    <p className="text-sm text-gray-500 mt-2">
                      Sent on: {msg.timestamp}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <MessageSquare size={40} className="mx-auto mb-4 opacity-50" />
              <p>No messages yet. Be the first to send a message!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ContactList;
