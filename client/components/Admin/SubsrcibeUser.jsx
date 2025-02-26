import { useDispatch } from "react-redux";
import { subscribers } from "../../src/Redux/Slice/Admin";
import { useEffect, useState } from "react";

const SubscribersList = () => {
  const [SubscribeData, setSubscribeData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handelLoadUser = async () => {
    setLoading(true);
    const res = await dispatch(subscribers());
    setSubscribeData(res?.payload?.data);
    setLoading(false);
  };
  useEffect(() => {
    handelLoadUser();
  }, []);
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#242424] p-5">
        <div className="text-cyan-400 border-2 border-b-0 border-l-0 bg-[#242424] animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#242424] p-5">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        📩 Subscribed Users
      </h2>

      <div className="w-full max-w-md bg-cyan-400 text-white border border-gray-700 rounded-lg shadow-lg p-4">
        {SubscribeData.length > 0 ? (
          <ul className="space-y-3">
            {SubscribeData.map((email, index) => (
              <li key={index} className="border-b border-gray-700 py-2">
                <a href={`mailto:${email}`} className="hover:underline">
                  {email}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No subscribers found.</p>
        )}
      </div>
    </div>
  );
};

export default SubscribersList;
