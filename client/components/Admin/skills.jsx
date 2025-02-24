import React, { useState } from "react";
import { PlusCircle, Edit2, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { SkillAddCart } from "../../src/Redux/Slice/Admin";

function SkillsChart() {
  const { skillsData } = useSelector((state) => state?.DataStore);
  const [skillData, setSkillsData] = useState(skillsData);
  const [selectedCategory, setSelectedCategory] = useState();
  const dispatch = useDispatch();
  const [editEductionTitle, setEditEductionTitle] = useState({
    id: null,
    title: "",
  });
  const [editEductionSkill, setEditEductionSkill] = useState({
    educationId: null,
    skillId: null,
    skills: [
      {
        name: "",
        level: null,
      },
    ],
  });
  const [newEducationData, setNewEducationData] = useState({
    title: "",
    skills: [
      {
        name: "",
        level: null,
      },
    ],
  });
  const [newSkillData, setNewSkillData] = useState({
    id: null,
    skills: [
      {
        name: "",
        level: null,
      },
    ],
  });

  const handelSkillEdit = (e) => {
    const { name, value } = e.target;
    setEditEductionSkill((prev) => {
      let updatedSkills = [...prev.skills];

      updatedSkills[0] = {
        ...updatedSkills[0],
        [name]:
          name === "level" ? Math.min(100, Math.max(0, Number(value))) : value,
      };

      return { ...prev, skills: updatedSkills };
    });
  };

  const handelNewEducationAdd = (e) => {
    const { name, value } = e.target;

    setNewEducationData((prev) => {
      if (name === "title") {
        return { ...prev, title: value };
      } else {
        let updatedSkills = [...prev.skills];
        updatedSkills[0] = {
          ...updatedSkills[0],
          [name]:
            name === "level"
              ? Math.min(100, Math.max(0, Number(value)))
              : value,
        };

        return { ...prev, skills: updatedSkills };
      }
    });
  };

  const handelEductionTitleEdit = (e) => {
    const { name, value } = e.target;

    setEditEductionTitle({ ...editEductionTitle, [name]: value });
  };
  const AddSkill = (e) => {
    const { name, value } = e.target;
    setNewSkillData((prev) => {
      let updatedSkills = [...prev.skills];

      updatedSkills[0] = {
        ...updatedSkills[0],
        [name]:
          name === "level" ? Math.min(100, Math.max(0, Number(value))) : value,
      };

      return { ...prev, skills: updatedSkills };
    });
  };

  const handelAddNewEducation = async () => {
    console.log("handelAddNewEducation", newEducationData);
    const res = await dispatch(SkillAddCart(newEducationData));
    console.log(res);
  };

  const handleAddSkill = () => {
    console.log("handleAddSkill", newSkillData);
  };

  const handelUpdateSkill = () => {
    console.log("handelUpdateSkill", editEductionSkill);
  };
  const handelEditEducationTitle = () => {
    console.log("handelEditEducationTitle", editEductionTitle);
  };
  const toggleEditSkill = (categoryIndex, skillIndex) => {
    setSkillsData((prev) =>
      prev.map((category, catIdx) =>
        catIdx === categoryIndex
          ? {
              ...category,
              skills: category.skills.map((skill, skillIdx) =>
                skillIdx === skillIndex
                  ? { ...skill, edit: !skill.edit }
                  : { ...skill, edit: false }
              ),
            }
          : category
      )
    );
  };
  const toggleEditCategory = (index) => {
    setSkillsData((prev) =>
      prev.map((category, catIdx) =>
        catIdx === index ? { ...category, edit: !category.edit } : category
      )
    );
  };

  return (
    <div className="min-h-screen mt-20 max-[530px]:p-1 text-white p-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold max-[530px]:text-xl text-cyan-300 mb-6">
          Skills Management
        </h1>

        {/* Add New Category */}
        <div className="bg-[#2a2a2a] p-6 rounded-lg mb-8">
          <h2 className="text-xl max-[530px]:text-sm font-semibold mb-4 text-cyan-300">
            Add New Category
          </h2>

          {/* Category Title Input */}
          <input
            type="text"
            name="title"
            value={newEducationData.title}
            onChange={handelNewEducationAdd}
            placeholder="Category Name"
            className="w-full bg-[#333] max-[530px]:text-sm border border-gray-600 rounded px-3 py-2 text-white mb-2"
          />

          {/* Skill Name Input */}
          <input
            type="text"
            name="name"
            value={newEducationData.skills[0]?.name}
            onChange={handelNewEducationAdd}
            placeholder="Skill Name"
            className="w-full bg-[#333] max-[530px]:text-sm border border-gray-600 rounded px-3 py-2 text-white mb-2"
          />

          {/* Skill Level Input */}
          <input
            type="number"
            name="level"
            value={newEducationData.skills[0]?.level || ""}
            onChange={handelNewEducationAdd}
            placeholder="Level"
            className="w-full bg-[#333] border max-[530px]:text-sm border-gray-600 rounded px-3 py-2 text-white mb-2"
          />

          <button
            onClick={handelAddNewEducation}
            className="bg-cyan-600 px-4 py-2 rounded-lg"
          >
            Add Category
          </button>
        </div>

        {/* Add New Skill */}
        <div className="bg-[#2a2a2a] p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Skill</h2>
          <select
            value={selectedCategory}
            onChange={(e) => {
              const selectedTitle = e.target.value;
              const selectedCategory = skillData.find(
                (cat) => cat.title === selectedTitle
              );

              setSelectedCategory(selectedTitle);
              setNewSkillData({
                ...newSkillData,
                id: selectedCategory?._id || null,
              });
            }}
            className="w-full bg-[#333] max-[530px]:text-sm border border-gray-600 rounded px-3 py-2 text-white mb-2"
          >
            <option value="" disabled>
              Select Category
            </option>
            {skillData.map((cat) => (
              <option key={cat._id} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="name"
            value={newSkillData.skills[0]?.name || ""}
            onChange={AddSkill}
            placeholder="Skill Name"
            className="w-full bg-[#333] max-[530px]:text-sm border border-gray-600 rounded px-3 py-2 text-white mb-2"
          />
          <input
            type="number"
            name="level"
            value={newSkillData.skills[0]?.level || ""}
            onChange={AddSkill}
            placeholder="Level"
            className="w-full bg-[#333] border max-[530px]:text-sm border-gray-600 rounded px-3 py-2 text-white mb-2"
          />
          <button
            onClick={handleAddSkill}
            className="bg-cyan-600 px-4 py-2 rounded-lg"
          >
            Add Skill
          </button>
        </div>

        {/* Skills List */}
        {skillData.map((category, catIndex) => (
          <div key={category._id} className="bg-[#2a2a2a] p-6 rounded-lg mb-6">
            {/* ✅ Editable Category Title */}
            <div className="flex justify-between items-center mb-4">
              {category.edit ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editEductionTitle.title || category.title}
                    onChange={handelEductionTitleEdit}
                    className="w-full max-[530px]:text-sm bg-[#333] border border-gray-600 rounded px-3 py-2 text-white"
                  />
                  <button
                    onClick={() => (
                      toggleEditCategory(catIndex), handelEditEducationTitle()
                    )}
                    className="bg-green-600 px-4 py-2 rounded-lg"
                  >
                    <Save className="h-4 w-4 max-[530px]:w-3" />
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold max-[530px]:text-sm">
                    {category.title}
                  </h2>
                  <button
                    onClick={() => (
                      toggleEditCategory(catIndex),
                      setEditEductionTitle({
                        ...editEductionTitle,
                        id: category._id,
                      })
                    )}
                    className="bg-cyan-600 px-4 py-2 rounded-lg"
                  >
                    <Edit2 className="h-4 w-4 max-[530px]:w-3" />
                  </button>
                </>
              )}
            </div>

            {category.skills.map((skill, skillIndex) => (
              <div
                key={skill._id}
                className="flex justify-between items-center mb-2"
              >
                {skill.edit ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={editEductionSkill.skills[0]?.name || skill?.name}
                      onChange={handelSkillEdit}
                      className="w-1/3 bg-[#333 ] max-[530px]:text-sm border border-gray-600 rounded px-3 py-2 text-white"
                    />
                    <input
                      type="number"
                      name="level"
                      value={
                        editEductionSkill.skills[0]?.level || skill?.level || ""
                      }
                      onChange={handelSkillEdit}
                      className="w-1/3 bg-[#333] max-[530px]:text-sm border border-gray-600 rounded px-3 py-2 text-white"
                    />
                    <button
                      onClick={() => (
                        toggleEditSkill(catIndex, skillIndex),
                        handelUpdateSkill()
                      )}
                      className="bg-green-600 px-4 py-2 rounded-lg"
                    >
                      <Save className="h-4 w-4 max-[530px]:w-3" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="max-[530px]:text-sm">{skill.name}</span>
                    <span className="max-[530px]:text-sm max-[530px]:pr-1">
                      {skill.level}%
                    </span>
                    <button
                      onClick={() => (
                        toggleEditSkill(catIndex, skillIndex),
                        setEditEductionSkill({
                          ...editEductionSkill,
                          educationId: category._id,
                          skillId: skill._id,
                        })
                      )}
                      className="bg-cyan-600 px-4 py-2 rounded-lg "
                    >
                      <Edit2 className="h-4 w-4 max-[530px]:w-3" />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsChart;
