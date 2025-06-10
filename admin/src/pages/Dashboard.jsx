import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../features/projects/projectsSlice";
import { fetchFeedback } from "../features/feedback/feedbackSlice";
import { fetchMessages } from "../features/messages/messagesSlice";
import { fetchSubscriptions } from "../features/subscriptions/subscriptionsSlice";
import {
  FolderOpen,
  MessageSquare,
  Mail,
  Users,
  TrendingUp,
  Star,
} from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  const { feedbackList } = useSelector((state) => state.feedback);
  const { messages } = useSelector((state) => state.messages);
  const { subscriptions } = useSelector((state) => state.subscriptions);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchFeedback());
    dispatch(fetchMessages());
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const stats = [
    {
      name: "Total Projects",
      value: projects.Count,
      icon: FolderOpen,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "Feedback Received",
      value: feedbackList?.data?.length || 0,
      icon: MessageSquare,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      name: "Messages",
      value: messages?.data?.length || 0,
      icon: Mail,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      name: "Subscribers",
      value: subscriptions?.data?.subscribersCount || 0,
      icon: Users,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];
  console.log();
  console.log();
  const recentFeedback = feedbackList?.data?.slice(0, 5);
  const recentMessages = messages?.data?.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back! Here s what s happening with your portfolio.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats?.map((stat) => {
          const Icon = stat?.icon;
          return (
            <div
              key={stat?.name}
              className="bg-white overflow-hidden shadow-sm rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Feedback */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Recent Feedback
            </h3>
          </div>
          <div className="px-6 py-4">
            {recentFeedback?.length > 0 ? (
              <div className="space-y-4">
                {recentFeedback?.map((feedback) => (
                  <div
                    key={feedback?._id}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0">
                      {feedback?.avatar ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={feedback?.avatar}
                          alt={feedback?.fullName}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {feedback?.fullName?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {feedback.fullName}
                      </p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < feedback.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">
                          {feedback.rating}/5
                        </span>
                      </div>
                      {feedback.experience && (
                        <p className="mt-1 text-sm text-gray-600 truncate">
                          {feedback.experience}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No feedback yet</p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-500" />
              Recent Messages
            </h3>
          </div>
          <div className="px-6 py-4">
            {recentMessages?.length > 0 ? (
              <div className="space-y-4">
                {recentMessages?.map((message) => (
                  <div
                    key={message._id}
                    className="border-l-4 border-blue-500 pl-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {message.email}
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          message.isRead
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {message.isRead ? "Read" : "Unread"}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mt-1">
                      {message.subject}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {message.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No messages yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
