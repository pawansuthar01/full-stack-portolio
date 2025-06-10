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
    console.log(res);
    setSubscribeData(res?.payload?.data?.subscribers);
    setLoading(false);
  };

  useEffect(() => {
    handelLoadUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#242424] p-5">
      {loading ? (
        <div className="text-cyan-400 w-24 h-24 rounded-full border-2 border-b-0 border-l-0 bg-[#242424] animate-spin"></div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            📩 Subscribed Users
          </h2>

          <div className="w-full max-w-md bg-[#333] text-white border border-gray-700 rounded-lg shadow-lg p-4">
            {SubscribeData.length > 0 ? (
              <ul className="space-y-3">
                {SubscribeData.map((user) => (
                  <li key={user._id} className="border-b border-gray-700 py-2">
                    <a
                      href={`mailto:${user.email}`}
                      className="hover:underline"
                    >
                      {user.email}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No subscribers found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SubscribersList;
