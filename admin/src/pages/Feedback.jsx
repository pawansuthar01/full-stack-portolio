import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFeedback,
  deleteFeedback,
  updateFeedbackStatus,
  clearError
} from '../features/feedback/feedbackSlice';
import {
  Star,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';

const Feedback = () => {
  const dispatch = useDispatch();
  const { feedbackList, isLoading, error } = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const result = await dispatch(deleteFeedback(id));
        if (result.type === 'feedback/deleteFeedback/fulfilled') {
          toast.success('Feedback deleted successfully!');
        }
      } catch (err) {
        toast.error('Failed to delete feedback');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const result = await dispatch(updateFeedbackStatus({ id, status: newStatus }));
      if (result.type === 'feedback/updateFeedbackStatus/fulfilled') {
        toast.success(`Feedback ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
      }
    } catch (err) {
      toast.error('Failed to update feedback status');
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Feedback Management</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage feedback from your portfolio visitors
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {feedbackList.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {feedbackList.map((feedback) => (
              <div key={feedback._id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      {feedback.avatar ? (
                        <img
                          className="h-12 w-12 rounded-full"
                          src={feedback.avatar}
                          alt={feedback.fullName}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-lg font-medium text-gray-700">
                            {feedback.fullName?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {feedback.fullName}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          feedback.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {feedback.status || 'active'}
                        </span>
                      </div>
                      
                      {feedback.email && (
                        <p className="text-sm text-gray-600 mt-1">{feedback.email}</p>
                      )}
                      
                      {feedback.company && (
                        <p className="text-sm text-gray-600">{feedback.company}</p>
                      )}
                      
                      <div className="mt-2">
                        {renderStars(feedback.rating)}
                      </div>
                      
                      {feedback.experience && (
                        <div className="mt-3">
                          <p className="text-gray-700">{feedback.experience}</p>
                        </div>
                      )}
                      
                      {feedback.projectWorkedOn && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Project: {feedback.projectWorkedOn}
                          </span>
                        </div>
                      )}
                      
                      <div className="mt-3 text-xs text-gray-500">
                        Submitted on {new Date(feedback.createdAt).toLocaleDateString('en-US', {
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
                      onClick={() => handleToggleStatus(feedback._id, feedback.status)}
                      className={`p-2 rounded-full ${
                        feedback.status === 'active'
                          ? 'text-green-600 hover:bg-green-50'
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                      title={feedback.status === 'active' ? 'Hide feedback' : 'Show feedback'}
                    >
                      {feedback.status === 'active' ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleDelete(feedback._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                      title="Delete feedback"
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
            <Star className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No feedback yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Feedback from visitors will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;