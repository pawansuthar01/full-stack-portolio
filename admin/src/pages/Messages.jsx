import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMessages,
  toggleMessageRead,
  deleteMessage,
  clearError
} from '../features/messages/messagesSlice';
import {
  Mail,
  MailOpen,
  Trash2,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const Messages = () => {
  const dispatch = useDispatch();
  const { messages, isLoading, error } = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleToggleRead = async (id) => {
    try {
      const result = await dispatch(toggleMessageRead(id));
      if (result.type === 'messages/toggleMessageRead/fulfilled') {
        const message = messages.find(msg => msg._id === id);
        toast.success(`Message marked as ${message?.isRead ? 'unread' : 'read'}`);
      }
    } catch (err) {
      toast.error('Failed to update message status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const result = await dispatch(deleteMessage(id));
        if (result.type === 'messages/deleteMessage/fulfilled') {
          toast.success('Message deleted successfully!');
        }
      } catch (err) {
        toast.error('Failed to delete message');
      }
    }
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="mt-1 text-sm text-gray-600">
            Contact messages from your portfolio visitors
          </p>
        </div>
        {unreadCount > 0 && (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {messages.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`p-6 transition-colors ${
                  !message.isRead ? 'bg-blue-50' : 'bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        !message.isRead ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        {!message.isRead ? (
                          <Mail className="w-5 h-5 text-white" />
                        ) : (
                          <MailOpen className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-lg font-medium ${
                          !message.isRead ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {message.subject}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          !message.isRead 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {!message.isRead ? 'Unread' : 'Read'}
                        </span>
                      </div>
                      
                      <p className={`text-sm mt-1 ${
                        !message.isRead ? 'text-blue-600 font-medium' : 'text-gray-600'
                      }`}>
                        From: {message.email}
                      </p>
                      
                      <div className="mt-3">
                        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                      </div>
                      
                      <div className="mt-3 flex items-center text-xs text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(message.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleToggleRead(message._id)}
                      className={`p-2 rounded-full ${
                        !message.isRead
                          ? 'text-blue-600 hover:bg-blue-100'
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                      title={!message.isRead ? 'Mark as read' : 'Mark as unread'}
                    >
                      {!message.isRead ? (
                        <MailOpen className="w-4 h-4" />
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleDelete(message._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Mail className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No messages yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Messages from your contact form will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;