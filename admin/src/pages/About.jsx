import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchAbout,
  updateAbout,
  addJourneyItem,
  updateJourneyItem,
  deleteJourneyItem,
  addFunFact,
  updateFunFact,
  deleteFunFact,
  clearError,
} from "../features/about/aboutSlice";
import { Save, Plus, Edit, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "../components/ImageUI";
import DynamicIcon from "../components/DynamicIcon";

const About = () => {
  const [showJourneyModal, setShowJourneyModal] = useState(false);
  const [showFunFactModal, setShowFunFactModal] = useState(false);
  const [editingJourney, setEditingJourney] = useState(null);
  const [editingFunFact, setEditingFunFact] = useState(null);
  const [AboutPageImage, setAboutPageImage] = useState("");
  const [BannerAboutImage, setBannerAboutImage] = useState("");
  const dispatch = useDispatch();
  const { aboutData, isLoading, error } = useSelector((state) => state.about);

  const {
    register: registerAbout,
    handleSubmit: handleSubmitAbout,
    setValue: setValueAbout,
    formState: { errors: errorsAbout },
  } = useForm();

  const {
    register: registerJourney,
    handleSubmit: handleSubmitJourney,
    reset: resetJourney,
    setValue: setValueJourney,
    formState: { errors: errorsJourney },
  } = useForm();

  const {
    register: registerFunFact,
    handleSubmit: handleSubmitFunFact,
    reset: resetFunFact,
    setValue: setValueFunFact,
    formState: { errors: errorsFunFact },
  } = useForm();

  useEffect(() => {
    async function fetchAboutData() {
      await dispatch(fetchAbout());
    }
    fetchAboutData();
  }, [dispatch]);

  useEffect(() => {
    if (aboutData) {
      setValueAbout("title", aboutData?.title);
      setValueAbout("description", aboutData?.description);
      setValueAbout("BannerAboutImage", aboutData?.BannerAboutImage);
      setValueAbout("AboutPageImage", aboutData?.AboutPageImage);
      setBannerAboutImage(aboutData?.BannerAboutImage);
      setAboutPageImage(aboutData?.AboutPageImage);
    }
  }, [aboutData, setValueAbout]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmitAbout = async (data) => {
    try {
      const fromData = new FormData();
      fromData.append("title", data.title);
      fromData.append("description", data.description);
      if (AboutPageImage instanceof File) {
        fromData.append("AboutPageImage", AboutPageImage);
      }
      if (BannerAboutImage instanceof File) {
        fromData.append("BannerAboutImage", BannerAboutImage);
      }

      const result = await dispatch(updateAbout(fromData));

      if (result.type === "about/updateAbout/fulfilled") {
        toast.success("About section updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to update about section");
    }
  };

  const openJourneyModal = (journey = null) => {
    setEditingJourney(journey);
    if (journey) {
      setValueJourney("title", journey?.title);
      setValueJourney("description", journey?.description);
      setValueJourney("year", journey?.year);
    } else {
      resetJourney();
    }
    setShowJourneyModal(true);
  };

  const closeJourneyModal = () => {
    setShowJourneyModal(false);
    setEditingJourney(null);
    resetJourney();
  };

  const onSubmitJourney = async (data) => {
    try {
      if (editingJourney) {
        const result = await dispatch(
          updateJourneyItem({
            id: editingJourney?._id,
            journeyItem: data,
          })
        );
        if (result.type === "about/updateJourneyItem/fulfilled") {
          toast.success("Journey item updated successfully!");
          closeJourneyModal();
        }
      } else {
        const result = await dispatch(addJourneyItem(data));
        if (result.type === "about/addJourneyItem/fulfilled") {
          toast.success("Journey item added successfully!");
          closeJourneyModal();
        }
      }
    } catch (err) {
      toast.error("Failed to save journey item");
    }
  };

  const handleDeleteJourney = async (id) => {
    if (window.confirm("Are you sure you want to delete this journey item?")) {
      try {
        const result = await dispatch(deleteJourneyItem(id));
        console.log(result);
        if (result.type === "about/deleteJourneyItem/fulfilled") {
          toast.success("Journey item deleted successfully!");
        }
      } catch (err) {
        toast.error("Failed to delete journey item");
      }
    }
  };

  const openFunFactModal = (funFact = null) => {
    setEditingFunFact(funFact);
    if (funFact) {
      setValueFunFact("title", funFact.title);
      setValueFunFact("description", funFact.description);
    } else {
      resetFunFact();
    }
    setShowFunFactModal(true);
  };

  const closeFunFactModal = () => {
    setShowFunFactModal(false);
    setEditingFunFact(null);
    resetFunFact();
  };

  const onSubmitFunFact = async (data) => {
    try {
      if (editingFunFact) {
        const result = await dispatch(
          updateFunFact({
            id: editingFunFact._id,
            funFact: data,
          })
        );

        if (result.type === "about/updateFunFact/fulfilled") {
          toast.success("Fun fact updated successfully!");
          closeFunFactModal();
        }
      } else {
        const result = await dispatch(addFunFact(data));
        if (result.type === "about/addFunFact/fulfilled") {
          toast.success("Fun fact added successfully!");
          closeFunFactModal();
        }
      }
    } catch (err) {
      toast.error("Failed to save fun fact");
    }
  };

  const handleDeleteFunFact = async (id) => {
    if (window.confirm("Are you sure you want to delete this fun fact?")) {
      try {
        const result = await dispatch(deleteFunFact(id));
        if (result.type === "about/deleteFunFact/fulfilled") {
          toast.success("Fun fact deleted successfully!");
        }
      } catch (err) {
        toast.error("Failed to delete fun fact");
      }
    }
  };
  const HandelBannerImageChange = (file) => {
    setBannerAboutImage(file);
  };
  const HandelAboutImageChange = (file) => {
    setAboutPageImage(file);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">About Section</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your about page content and journey
        </p>
      </div>

      {/* Main About Form */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Basic Information
          </h3>
        </div>
        <form
          onSubmit={handleSubmitAbout(onSubmitAbout)}
          className="p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              {...registerAbout("title", { required: "Title is required" })}
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
            {errorsAbout.title && (
              <p className="mt-1 text-sm text-red-600">
                {errorsAbout.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...registerAbout("description", {
                required: "Description is required",
              })}
              rows={4}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
            {errorsAbout.description && (
              <p className="mt-1 text-sm text-red-600">
                {errorsAbout.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Banner About Image URL
            </label>

            <ImageUpload
              value={BannerAboutImage}
              onChange={HandelBannerImageChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              About Page Image URL
            </label>
            <ImageUpload
              value={AboutPageImage}
              onChange={HandelAboutImageChange}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* My Journey Section */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">My Journey</h3>
          <button
            onClick={() => openJourneyModal()}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Journey Item
          </button>
        </div>
        <div className="p-6">
          {aboutData?.myJourney && aboutData?.myJourney.length > 0 ? (
            <div className="space-y-4">
              {aboutData?.myJourney?.map((journey, index) => (
                <div
                  key={journey?._id || index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="text-lg font-medium text-gray-900">
                          {journey?.educationTitle}
                        </h4>
                        {journey?.date && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {journey?.date}
                          </span>
                        )}
                      </div>
                      {journey?.educationDescription && (
                        <p className="mt-2 text-gray-600">
                          {journey?.educationDescription}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => openJourneyModal(journey)}
                        className="p-1 text-blue-500 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJourney(journey._id)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No journey items yet
            </p>
          )}
        </div>
      </div>

      {/* Fun Facts Section */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Fun Facts</h3>
          <button
            onClick={() => openFunFactModal()}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Fun Fact
          </button>
        </div>
        <div className="p-6">
          {aboutData?.funFact && aboutData?.funFact?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aboutData?.funFact?.map((fact) => (
                <div
                  key={fact._id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <span className="flex">
                        <DynamicIcon
                          iconName={fact?.icon}
                          size={20}
                          className="text-lg font-medium text-gray-900"
                        />

                        {fact.factCount && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {fact.factCount}
                          </span>
                        )}
                      </span>

                      {fact.factDescription && (
                        <p className="mt-2 text-gray-600">
                          {fact.factDescription}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => openFunFactModal(fact)}
                        className="p-1 text-blue-500 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFunFact(fact._id)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No fun facts yet</p>
          )}
        </div>
      </div>

      {/* Journey Modal */}
      {showJourneyModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {editingJourney ? "Edit Journey Item" : "Add Journey Item"}
                  </h3>
                  <button
                    onClick={closeJourneyModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmitJourney(onSubmitJourney)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      {...registerJourney("title", {
                        required: "Title is required",
                      })}
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                    {errorsJourney.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errorsJourney.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <input
                      {...registerJourney("year")}
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      {...registerJourney("description")}
                      rows={3}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeJourneyModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingJourney ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fun Fact Modal */}
      {showFunFactModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {editingFunFact ? "Edit Fun Fact" : "Add Fun Fact"}
                  </h3>
                  <button
                    onClick={closeFunFactModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmitFunFact(onSubmitFunFact)}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Icon ( Name of Icon)
                    </label>

                    <input
                      {...registerFunFact("icon", {
                        required: "Icon name is required",
                        pattern: {
                          value: /^[A-Z][a-zA-Z0-9]+$/,
                          message: "Enter a valid icon name like FaBeer",
                        },
                      })}
                      type="text"
                      placeholder="FaBeer"
                      className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                    {errorsFunFact.icon && (
                      <p className="text-red-500 text-sm mt-1">
                        {errorsFunFact.icon.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      {...registerFunFact("title", {
                        required: "Title is required",
                      })}
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                    {errorsFunFact.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errorsFunFact.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      {...registerFunFact("description")}
                      rows={3}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeFunFactModal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingFunFact ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
