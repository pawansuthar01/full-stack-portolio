import React, { useState } from "react";
import {
  PlusCircle,
  Edit2,
  Save,
  Delete,
  DeleteIcon,
  Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddSkillInCart,
  DeleteCart,
  DeleteSkillInCart,
  editSkillCartTitle,
  SkillAddCart,
  UpdateSkillInCart,
} from "../../src/Redux/Slice/Admin";
import toast from "react-hot-toast";
import LoadingButton from "../../constants/LoadingButton";

function SkillsChart() {
  const { skillsData } = useSelector((state) => state?.DataStore);
  const [skillData, setSkillsData] = useState(skillsData);
  const [loading, setLoading] = useState({});
  const [newCartAddLoading, setNewCartAddLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const [editCartTitle, setEditCartTitle] = useState({
    id: null,
    title: "",
  });

  const [editSkillCart, setEditSkillCart] = useState({
    cartId: null,
    skillId: null,
    skills: [
      {
        name: "",
        level: null,
      },
    ],
  });
  const [newSkillCartData, setNewSkillCartData] = useState({
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
    setEditSkillCart((prev) => {
      let updatedSkills = [...prev.skills];

      updatedSkills[0] = {
        ...updatedSkills[0],
        [name]:
          name === "level" ? Math.min(100, Math.max(0, Number(value))) : value,
      };

      return { ...prev, skills: updatedSkills };
    });
  };

  const handelNewCartAdd = (e) => {
    const { name, value } = e.target;

    setNewSkillCartData((prev) => {
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

    setEditCartTitle({ ...editCartTitle, [name]: value });
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

  const handelAddNewCart = async () => {
    setNewCartAddLoading(true);

    if (
      !newSkillCartData.title ||
      !newSkillCartData.skills[0].name ||
      newSkillCartData.skills[0].level == null
    ) {
      setNewCartAddLoading(false);
      toast.error("All filed is required to Skill Cart...");
      return;
    }

    const res = await dispatch(SkillAddCart(newSkillCartData));

    if (!res?.payload?.success) {
      toast.error(res?.payload?.message);
    } else {
      toast.success(res?.payload?.message);
      setSkillsData((prev) => [...prev, res?.payload?.data]);
    }

    setNewCartAddLoading(false);
    setNewSkillCartData({
      title: "",
      skills: [
        {
          name: "",
          level: null,
        },
      ],
    });
  };

  const handleAddSkill = async () => {
    if (newSkillData.id == null) {
      toast.error("select Skill Cart Name");
      return;
    }

    setLoading((prev) => ({ ...prev, [newSkillData.id]: true }));

    if (!newSkillData.skills[0].name || newSkillData.skills[0].level == null) {
      toast.error("All filed is required to Skill Cart...");
      setLoading((prev) => ({ ...prev, [newSkillData.id]: false }));
      return;
    }
    setLoading((prev) => ({ ...prev, [newSkillData.id]: true }));

    const res = await dispatch(AddSkillInCart(newSkillData));

    if (!res?.payload?.success) {
      toast.error(res?.payload?.message);
    } else {
      toast.success(res?.payload?.message);

      setSkillsData((prev) =>
        prev.map((cart) =>
          cart._id === res.payload.data._id ? res.payload.data : cart
        )
      );
    }
    setLoading((prev) => ({ ...prev, [newSkillData.id]: false }));
    setSelectedCategory("");

    setNewSkillData({
      id: null,
      skills: [
        {
          name: "",
          level: null,
        },
      ],
    });
  };
  //
  const handelUpdateSkill = async () => {
    const res = await dispatch(UpdateSkillInCart(editSkillCart));
    if (!res?.payload?.success) {
      toast.error(res?.payload?.message);
    } else {
      toast.success(res?.payload?.message);

      setSkillsData((prev) =>
        prev.map((cart) =>
          cart._id === res.payload.data._id ? res.payload.data : cart
        )
      );
    }
  };
  //
  const handelEditSkillCartTitle = async () => {
    if (editCartTitle.id == null || !editCartTitle.title) {
      toast.error("give New title..");
    }
    const res = await dispatch(editSkillCartTitle(editCartTitle));
    if (!res?.payload?.success) {
      toast.error(res?.payload?.message);
    } else {
      toast.success(res?.payload?.message);

      setSkillsData((prev) =>
        prev.map((cart) =>
          cart._id === res.payload.data._id ? res.payload.data : cart
        )
      );
    }
  };
  const handelDeleteCart = async (cartId, title) => {
    const isConfirm = window.confirm(`Delete This cart ${title}?`);
    if (!isConfirm) return;
    if (!cartId) {
      toast.error("Something wont wrong...");
    }
    setSkillsData((prev) => prev.filter((cart) => cart._id !== cartId));

    const res = await dispatch(DeleteCart(cartId));
    if (!res?.payload?.success) {
      toast.error(res?.payload?.message);
      setSkillsData(skillData);
    } else {
      toast.success(res?.payload?.message);

      setSkillsData((prev) =>
        prev.map((cart) =>
          cart._id === res.payload.data._id ? res.payload.data : cart
        )
      );
    }
  };
  const handelDeleteSkillInCart = async (cartId, skillId, name) => {
    const isConfirm = window.confirm(`Delete This skill in ${name}?`);
    if (!isConfirm) return;
    if (!cartId || !skillId) {
      toast.error("Something wont wrong...");
    }
    setSkillsData((prev) =>
      prev.map((cart) =>
        cart._id === cartId
          ? {
              ...cart,
              skills: cart.skills.filter((skill) => skill._id !== skillId),
            }
          : cart
      )
    );
    const res = await dispatch(DeleteSkillInCart({ cartId, skillId }));
    if (!res?.payload?.success) {
      toast.error(res?.payload?.message);
      setSkillsData(skillData);
    } else {
      toast.success(res?.payload?.message);

      setSkillsData((prev) =>
        prev.map((cart) =>
          cart._id === res.payload.data._id ? res.payload.data : cart
        )
      );
    }
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
            value={newSkillCartData.title}
            onChange={handelNewCartAdd}
            placeholder="Category Name"
            className="w-full bg-[#333] max-[530px]:text-sm border border-gray-600 rounded px-3 py-2 text-white mb-2"
          />

          {/* Skill Name Input */}
          <input
            type="text"
            name="name"
            value={newSkillCartData.skills[0]?.name}
            onChange={handelNewCartAdd}
            placeholder="Skill Name"
            className="w-full bg-[#333] max-[530px]:text-sm border border-gray-600 rounded px-3 py-2 text-white mb-2"
          />

          {/* Skill Level Input */}
          <input
            type="number"
            name="level"
            value={newSkillCartData.skills[0]?.level || ""}
            onChange={handelNewCartAdd}
            placeholder="Level"
            className="w-full bg-[#333] border max-[530px]:text-sm border-gray-600 rounded px-3 py-2 text-white mb-2"
          />
          <LoadingButton
            loading={newCartAddLoading}
            onClick={handelAddNewCart}
            name={"Add Category"}
            textSize={"px-4 py-2 rounded-lg"}
            width={"w-auto"}
            message={"Loading..."}
            color={"bg-cyan-600"}
          />
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
            <option>Select Category</option>
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
          <LoadingButton
            loading={loading[newSkillData.id]}
            onClick={handleAddSkill}
            name={"Add Skill"}
            textSize={"px-4 py-2 rounded-lg"}
            width={"w-auto"}
            message={"Loading..."}
            color={"bg-cyan-600"}
          />
        </div>

        {/* Skills List */}
        {skillData.map((category, catIndex) => (
          <div key={category._id} className="bg-[#2a2a2a] p-6 rounded-lg mb-6">
            <button
              onClick={() => handelDeleteCart(category._id, category.title)}
              className="bg-red-400 px-2 py-2 rounded-lg m-1"
            >
              <Trash2 className="h-4 w-4 max-[530px]:w-3" />
            </button>
            {/* ✅ Editable Category Title */}
            <div className="flex justify-between items-center mb-4">
              {category.edit ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editCartTitle.title}
                    onChange={handelEductionTitleEdit}
                    className="w-full max-[530px]:text-sm bg-[#333] border border-gray-600 rounded px-3 py-2 text-white"
                  />
                  <button
                    onClick={() => (
                      toggleEditCategory(catIndex), handelEditSkillCartTitle()
                    )}
                    className="bg-green-600 px-4 ml-2 py-2 rounded-lg"
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
                      setEditCartTitle({
                        ...editCartTitle,
                        id: category._id,
                        title: category.title,
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
                key={skill._id || skillIndex}
                className="flex justify-between items-center mb-2"
              >
                {skill.edit ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={editSkillCart.skills[0]?.name}
                      onChange={handelSkillEdit}
                      className="w-1/3 bg-[#333 ] max-[530px]:text-sm border border-gray-600 rounded px-3 py-2 text-white"
                    />
                    <input
                      type="number"
                      name="level"
                      value={editSkillCart.skills[0]?.level || ""}
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
                  <div className="flex  justify-between w-full">
                    <span className="max-[530px]:text-sm">{skill.name}</span>
                    <span className="max-[530px]:text-sm text-center max-[530px]:pr-1">
                      {skill.level}%
                    </span>
                    <div className="flex  gap-2">
                      {" "}
                      <button
                        onClick={() => {
                          toggleEditSkill(catIndex, skillIndex);
                          setEditSkillCart({
                            cartId: category._id,
                            skillId: skill._id,
                            skills: [
                              {
                                name: skill.name,
                                level: skill.level,
                              },
                            ],
                          });
                        }}
                        className="bg-cyan-600 px-4 py-2 rounded-lg "
                      >
                        <Edit2 className="h-4 w-4 max-[530px]:w-3" />
                      </button>
                      <button
                        onClick={() =>
                          handelDeleteSkillInCart(
                            category._id,
                            skill._id,
                            skill?.name
                          )
                        }
                        className="bg-red-400 px-2 py-2 rounded-lg "
                      >
                        <Trash2 className="h-4 w-4 max-[530px]:w-3" />
                      </button>
                    </div>
                  </div>
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
