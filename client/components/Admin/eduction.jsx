import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  DeleteEducation,
  updateEducation,
  UploadEducationCart,
} from "../../src/Redux/Slice/Admin";

const EducationManager = () => {
  const { educationData } = useSelector((state) => state?.DataStore);
  const [educations, setEducations] = useState(educationData);
  const dispatch = useDispatch();
  const [newEducation, setNewEducation] = useState({
    course: "",
    institute: "",
    year: "",
    description: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleAddEducation = async () => {
    if (
      !newEducation.course ||
      !newEducation.institute ||
      !newEducation.description
    ) {
      toast.error("Give All filed to upload Education Cart...");
      return;
    }
    const res = await dispatch(UploadEducationCart(newEducation));
    console.log(res);
    if (res?.payload?.success) {
      toast.success(res?.payload?.message);
      setEducations((prev) => [...prev, res?.payload?.data]);
    } else {
      toast.error(res?.payload?.message);
    }
    setEducations([...educations, { id: Date.now(), ...newEducation }]);
    setNewEducation({ course: "", institute: "", year: "", description: "" });
  };

  const handleEditEducation = (index, id) => {
    setEditIndex(id);
    setNewEducation(educations[index]);
  };

  const handleUpdateEducation = async () => {
    if (editIndex == (null || undefined)) {
      toast.error("someThing wont wrong...");
      return;
    }
    const res = await dispatch(
      updateEducation({ id: editIndex, data: newEducation })
    );
    if (res?.payload?.success) {
      toast.success(res?.payload?.message);
      setEducations((prev) =>
        prev.map((edu) =>
          edu._id === res?.payload?.data?._id ? res?.payload?.data : edu
        )
      );
    } else {
      toast.error(res?.payload?.message);
    }

    setNewEducation({ course: "", institute: "", year: "", description: "" });
    setEditIndex(null);
  };

  const handleDeleteEducation = async (id) => {
    if (!id) {
      toast.error("something wont wrong...");
      return;
    }
    const isConfirm = window.confirm("Delete this education...");
    if (!isConfirm) return;
    setEducations(educations.filter((edu) => edu._id !== id));
    const res = await dispatch(DeleteEducation(id));
    res?.payload?.success
      ? toast.success(res?.payload?.message)
      : toast.error(res?.payload?.message);
  };

  return (
    <section className="p-6 text-white ">
      <div className="flex justify-center mb-6 ">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 10 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-[#00f7ff] gap-1 flex text-xl justify-center items-center font-bold mb-4 w-42 text-center px-2"
        >
          Education
          <span className="bg-[#00f7ff] mt-2 w-10 h-[2px] rounded"></span>
        </motion.h1>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-6"
      >
        {educations.map((edu, index) => (
          <motion.div
            key={edu._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: index * 0.3,
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="bg-[#242424]/80 w-full p-5 rounded-xl border border-[#00f7ff]/80 shadow-lg"
          >
            <h2 className="text-lg font-semibold text-white">{edu.course}</h2>
            <p className="text-gray-300">{edu.institute}</p>
            <p className="text-gray-400 text-sm">{edu.year}</p>
            <p className="text-gray-300 text-sm mt-2">{edu.description}</p>
            <div className="mt-2 flex gap-2">
              <button
                className="px-3 py-1 bg-blue-500 rounded"
                onClick={() => handleEditEducation(index, edu._id)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 rounded"
                onClick={() => handleDeleteEducation(edu._id)}
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="flex justify-center">
        <div className=" p-4 mt-6  w-full max-w-3xl border  rounded-xl shadow-[0_0_5px_0_cyan]">
          <h3 className="text-lg font-semibold mb-2 text-cyan-300">
            {editIndex !== null ? "Edit Education" : "Add New Education"}
          </h3>
          <input
            type="text"
            placeholder="Course"
            value={newEducation.course}
            onChange={(e) =>
              setNewEducation({ ...newEducation, course: e.target.value })
            }
            className="w-full p-2 mb-2 rounded  border border-gray-600 focus:border-cyan-400"
          />
          <input
            type="text"
            placeholder="Institute"
            value={newEducation.institute}
            onChange={(e) =>
              setNewEducation({ ...newEducation, institute: e.target.value })
            }
            className="w-full p-2 mb-2 rounded  border border-gray-600 focus:border-cyan-400"
          />
          <input
            type="text"
            placeholder="Year"
            value={newEducation.year}
            onChange={(e) =>
              setNewEducation({ ...newEducation, year: e.target.value })
            }
            className="w-full p-2 mb-2 rounded  border border-gray-600 focus:border-cyan-400"
          />
          <textarea
            placeholder="Description"
            value={newEducation.description}
            onChange={(e) =>
              setNewEducation({ ...newEducation, description: e.target.value })
            }
            className="w-full p-2 mb-2 rounded  border border-gray-600 focus:border-cyan-400"
          ></textarea>
          <button
            className={`w-full p-2 ${
              editIndex !== null ? "bg-green-500" : "bg-blue-500"
            } rounded`}
            onClick={
              editIndex !== null ? handleUpdateEducation : handleAddEducation
            }
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default EducationManager;
