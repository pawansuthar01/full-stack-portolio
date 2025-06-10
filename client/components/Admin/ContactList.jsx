import { Mail, MessageSquare, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetAllMessage, messageMarkAsRead } from "../../src/Redux/Slice/Admin";

const formatMongoDateToIndian = (messageSubmitDate) => {
  const date = new Date(messageSubmitDate);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // 12-hour format with AM/PM
  });
};

function ContactList() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [filterRead, setFilterRead] = useState(null);
  const [messages, setMessages] = useState({});
  const handelLoadMessage = async () => {
    const res = await dispatch(GetAllMessage());
    console.log(res);
    setMessages(res?.payload?.data);
    setFilteredMessages(res.payload.data);
  };
  useEffect(() => {
    handelLoadMessage();
  }, []);
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterRead(value);

    if (value === "all") {
      setFilteredMessages(messages);
    } else {
      setFilteredMessages(
        messages.filter((msg) => msg.read.toString() === value)
      );
    }
  };
  async function handelMarkRead(id) {
    setFilteredMessages((prev) =>
      prev.map((message) =>
        message._id === id ? { ...message, read: true } : message
      )
    );
    await dispatch(messageMarkAsRead(id));
  }
  return (
    <div className="p-8 min-h-screen max-sm:p-0 mt-20">
      <div className="max-w-4xl mx-auto">
        {/* Messages List */}
        <div className="bg-[#2a2a2a] p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="text-blue-400" />
            Messages ({messages.length})
          </h2>
          <div className="mb-6 flex items-center space-x-4">
            <label className="text-lg max-sm:text-sm text-gray-700">
              Filter by Read Status:
            </label>
            <select
              className="border bg-[#242424] border-gray-300 rounded-lg p-3 max-sm:p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filterRead || "all"}
              onChange={handleFilterChange}
            >
              <option value="all">All</option>
              <option value="true">Read</option>
              <option value="false">Unread</option>
            </select>
          </div>
          {filteredMessages.length > 0 ? (
            <div className="space-y-6">
              {filteredMessages.map((msg, index) => (
                <div
                  key={index}
                  className="bg-[#333] rounded-lg p-6 border-l-4 border-blue-500"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                      <User className="text-blue-400" size={20} />
                      <span className="font-semibold">{msg.fullName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="text-blue-400" size={20} />
                      <a
                        className="text-gray-400 max-sm:text-sm"
                        href={`mailto:${msg.email}`}
                      >
                        {msg.email}
                      </a>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">
                    {msg.subject}
                  </h3>
                  <p className="text-gray-300 mb-4 whitespace-pre-wrap">
                    {msg.message}
                  </p>
                  {msg.createdAt && (
                    <p className="text-sm text-gray-500 mt-2">
                      Sent on: {formatMongoDateToIndian(msg.createdAt)}
                    </p>
                  )}
                  <div className="flex justify-end">
                    <button
                      disabled={msg.read == true}
                      onClick={() => handelMarkRead(msg._id)}
                      className={`px-4 py-2 max-sm:py-1 max-sm:px-2 rounded-full ${
                        msg.read ? "bg-green-400" : "bg-red-400"
                      } text-white font-semibold text-sm`}
                    >
                      {msg.read ? "UnRead" : "Read"}
                    </button>
                  </div>
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
