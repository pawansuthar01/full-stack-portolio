import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  fetchSkills,
  createSkillModule,
  updateSkillModule,
  deleteSkillModule,
  clearError
} from '../features/skills/skillsSlice';
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Code
} from 'lucide-react';
import toast from 'react-hot-toast';

const Skills = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [skillFields, setSkillFields] = useState([{ name: '', level: 1 }]);

  const dispatch = useDispatch();
  const { skillModules, isLoading, error } = useSelector((state) => state.skills);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const openModal = (module = null) => {
    setEditingModule(module);
    if (module) {
      setValue('title', module.title);
      setValue('color', module.color);
      setValue('icon', module.icon);
      setSkillFields(module.skills || [{ name: '', level: 1 }]);
    } else {
      reset();
      setSkillFields([{ name: '', level: 1 }]);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingModule(null);
    reset();
    setSkillFields([{ name: '', level: 1 }]);
  };

  const addSkillField = () => {
    setSkillFields([...skillFields, { name: '', level: 1 }]);
  };

  const removeSkillField = (index) => {
    if (skillFields.length > 1) {
      setSkillFields(skillFields.filter((_, i) => i !== index));
    }
  };

  const updateSkillField = (index, field, value) => {
    const updatedFields = [...skillFields];
    updatedFields[index][field] = value;
    setSkillFields(updatedFields);
  };

  const onSubmit = async (data) => {
    try {
      const moduleData = {
        ...data,
        skills: skillFields.filter(skill => skill.name.trim() !== ''),
      };

      if (editingModule) {
        const result = await dispatch(updateSkillModule({
          id: editingModule._id,
          moduleData
        }));
        if (result.type === 'skills/updateSkillModule/fulfilled') {
          toast.success('Skill module updated successfully!');
          closeModal();
        }
      } else {
        const result = await dispatch(createSkillModule(moduleData));
        if (result.type === 'skills/createSkillModule/fulfilled') {
          toast.success('Skill module created successfully!');
          closeModal();
        }
      }
    } catch (err) {
      toast.error('Failed to save skill module');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill module?')) {
      try {
        const result = await dispatch(deleteSkillModule(id));
        if (result.type === 'skills/deleteSkillModule/fulfilled') {
          toast.success('Skill module deleted successfully!');
        }
      } catch (err) {
        toast.error('Failed to delete skill module');
      }
    }
  };

  const getSkillLevelText = (level) => {
    const levels = {
      1: 'Beginner',
      2: 'Intermediate',
      3: 'Advanced',
      4: 'Expert',
      5: 'Master'
    };
    return levels[level] || 'Beginner';
  };

  const getSkillLevelColor = (level) => {
    const colors = {
      1: 'bg-red-200 text-red-800',
      2: 'bg-yellow-200 text-yellow-800',
      3: 'bg-blue-200 text-blue-800',
      4: 'bg-green-200 text-green-800',
      5: 'bg-purple-200 text-purple-800'
    };
    return colors[level] || 'bg-gray-200 text-gray-800';
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Skills Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your skill modules and individual skills
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill Module
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillModules.map((module) => (
          <div key={module._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {module.icon && (
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: module.color || '#3B82F6' }}
                    >
                      <span className="text-white text-sm">{module.icon}</span>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openModal(module)}
                    className="p-1 text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(module._id)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {module.skills && module.skills.length > 0 ? (
                <div className="space-y-3">
                  {module.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSkillLevelColor(skill.level)}`}>
                        {getSkillLevelText(skill.level)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No skills added yet</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {skillModules.length === 0 && (
        <div className="text-center py-12">
          <Code className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No skill modules yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create your first skill module to get started.
          </p>
        </div>
      )}

      {/* Skill Module Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {editingModule ? 'Edit Skill Module' : 'Add Skill Module'}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Module Title
                      </label>
                      <input
                        {...register('title', { required: 'Title is required' })}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Color
                      </label>
                      <input
                        {...register('color')}
                        type="color"
                        className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Icon (emoji or text)
                    </label>
                    <input
                      {...register('icon')}
                      type="text"
                      placeholder="💻"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Skills
                      </label>
                      <button
                        type="button"
                        onClick={addSkillField}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Skill
                      </button>
                    </div>

                    <div className="space-y-3">
                      {skillFields.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Skill name"
                              value={skill.name}
                              onChange={(e) => updateSkillField(index, 'name', e.target.value)}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            />
                          </div>
                          <div className="w-32">
                            <select
                              value={skill.level}
                              onChange={(e) => updateSkillField(index, 'level', parseInt(e.target.value))}
                              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                            >
                              <option value={1}>Beginner</option>
                              <option value={2}>Intermediate</option>
                              <option value={3}>Advanced</option>
                              <option value={4}>Expert</option>
                              <option value={5}>Master</option>
                            </select>
                          </div>
                          {skillFields.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSkillField(index)}
                              className="p-2 text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
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
                      {editingModule ? 'Update' : 'Create'}
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

export default Skills;