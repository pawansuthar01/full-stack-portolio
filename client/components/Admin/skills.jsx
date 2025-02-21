import React, { useState } from "react";
import { PlusCircle, Edit2, Save, X } from "lucide-react";

function SkillsChart() {
  const [skillsData, setSkillsData] = useState([
    {
      category: "Personal Skills",
      skills: [
        { name: "Communication", level: 100 },
        { name: "Teamwork", level: 80 },
        { name: "Self-Motivation", level: 75 },
      ],
    },
    {
      category: "Professional Skills",
      skills: [
        { name: "HTML5 & CSS3", level: 95 },
        { name: "JavaScript", level: 100 },
        { name: "C++", level: 50 },
      ],
    },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", level: 0 });
  const [selectedCategory, setSelectedCategory] = useState(
    "Professional Skills"
  );
  const [newCategory, setNewCategory] = useState("");

  const handleAddSkill = () => {
    if (newSkill.name && newSkill.level >= 0 && newSkill.level <= 100) {
      setSkillsData((prevData) =>
        prevData.map((category) => {
          if (category.category === selectedCategory) {
            return {
              ...category,
              skills: [...category.skills, newSkill],
            };
          }
          return category;
        })
      );
      setNewSkill({ name: "", level: 0 });
    }
  };

  const handleAddCategory = () => {
    if (
      newCategory &&
      !skillsData.find((cat) => cat.category === newCategory)
    ) {
      setSkillsData((prev) => [...prev, { category: newCategory, skills: [] }]);
      setSelectedCategory(newCategory);
      setNewCategory("");
    }
  };

  const handleUpdateSkill = (categoryIndex, skillIndex, updatedSkill) => {
    const newData = [...skillsData];
    newData[categoryIndex].skills[skillIndex] = updatedSkill;
    setSkillsData(newData);
  };

  return (
    <div className="min-h-screen  text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-300">
            Skills Management
          </h1>
          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 px-4 py-2  bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            {editMode ? <Save size={20} /> : <Edit2 size={20} />}
            {editMode ? "Save Changes" : "Edit Skills"}
          </button>
        </div>

        {/* Add New Category */}
        <div className="bg-[#2a2a2a] p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-cyan-300">
            Add New Category
          </h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm mb-2">Category Name</label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-[#333] border border-gray-600 rounded px-3 py-2 text-white"
                placeholder="Enter category name"
              />
            </div>
            <button
              onClick={handleAddCategory}
              className="flex items-center bg-cyan-600 rounded-lg hover:bg-cyan-700 gap-2 px-4 py-2  transition-colors"
            >
              <PlusCircle size={20} />
              Add Category
            </button>
          </div>
        </div>

        {/* Add New Skill Form */}
        <div className="bg-[#2a2a2a] p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Skill</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm mb-2">Select Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#333] border border-gray-600 rounded px-3 py-2 text-white"
              >
                {skillsData.map((category) => (
                  <option key={category.category} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-2">Skill Name</label>
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
                className="w-full bg-[#333] border border-gray-600 rounded px-3 py-2 text-white"
                placeholder="Enter skill name"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-2">
                Proficiency Level (0-100)
              </label>
              <input
                type="number"
                value={newSkill.level}
                onChange={(e) =>
                  setNewSkill({
                    ...newSkill,
                    level: Math.min(
                      100,
                      Math.max(0, parseInt(e.target.value) || 0)
                    ),
                  })
                }
                className="w-full bg-[#333] border border-gray-600 rounded px-3 py-2 text-white"
                min="0"
                max="100"
              />
            </div>
            <button
              onClick={handleAddSkill}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              <PlusCircle size={20} />
              Add Skill
            </button>
          </div>
        </div>

        {/* Skills List */}
        {skillsData.map((category, categoryIndex) => (
          <div
            key={category.category}
            className="bg-[#2a2a2a] p-6 rounded-lg mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name} className="flex items-center gap-4">
                  <div className="flex-1">
                    {editMode ? (
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) =>
                          handleUpdateSkill(categoryIndex, skillIndex, {
                            ...skill,
                            name: e.target.value,
                          })
                        }
                        className="w-full bg-[#333] border border-gray-600 rounded px-3 py-2 text-white"
                      />
                    ) : (
                      <span>{skill.name}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    {editMode ? (
                      <input
                        type="number"
                        value={skill.level}
                        onChange={(e) =>
                          handleUpdateSkill(categoryIndex, skillIndex, {
                            ...skill,
                            level: Math.min(
                              100,
                              Math.max(0, parseInt(e.target.value) || 0)
                            ),
                          })
                        }
                        className="w-full bg-[#333] border border-gray-600 rounded px-3 py-2 text-white"
                        min="0"
                        max="100"
                      />
                    ) : (
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-white">
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                        <div className="flex h-2 mb-4">
                          <div
                            style={{ width: `${skill.level}%` }}
                            className="bg-blue-500 rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {editMode && (
                    <button
                      onClick={() => {
                        const newData = [...skillsData];
                        newData[categoryIndex].skills = newData[
                          categoryIndex
                        ].skills.filter((_, i) => i !== skillIndex);
                        setSkillsData(newData);
                      }}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsChart;
