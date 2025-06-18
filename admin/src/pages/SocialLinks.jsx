import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  fetchSocials,
  updateSocials,
  clearError,
} from "../features/socials/socialsSlice";
import {
  Save,
  Instagram,
  Linkedin,
  Github,
  FileText,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";

const SocialLinks = () => {
  const dispatch = useDispatch();
  const { socialLinks, isLoading, error } = useSelector(
    (state) => state.socials
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchSocialsData() {
      await dispatch(fetchSocials());
    }
    fetchSocialsData();
  }, [dispatch]);

  useEffect(() => {
    if (socialLinks) {
      setValue("Instagram", socialLinks.Instagram || "");
      setValue("LinkedIn", socialLinks.LinkedIn || "");
      setValue("GitHub", socialLinks.GitHub || "");
      setValue("X", socialLinks.X || "");
      setValue("CV", socialLinks.CV || "");
    }
  }, [socialLinks, setValue]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const isValid = (data) => {
    if (!data?.CV) {
      errors.cv = "cv link is required";
      return;
    }
  };
  const onSubmit = async (data) => {
    try {
      isValid();
      const result = await dispatch(updateSocials(data));
      console.log(result);
      if (result.type === "socials/updateSocials/fulfilled") {
        toast.success("Social links updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to update social links");
    }
  };

  const socialPlatforms = [
    {
      name: "Instagram",
      icon: Instagram,
      placeholder: "https://instagram.com/username",
      color: "text-pink-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      placeholder: "https://linkedin.com/in/username",
      color: "text-blue-600",
    },
    {
      name: "GitHub",
      icon: Github,
      placeholder: "https://github.com/username",
      color: "text-gray-800",
    },
    {
      name: "X",
      icon: ExternalLink,
      placeholder: "https://x.com/username",
      color: "text-black",
    },
    {
      name: "CV",
      icon: FileText,
      placeholder: "https://example.com/cv.pdf",
      color: "text-red-500",
    },
  ];

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
        <h1 className="text-2xl font-bold text-gray-900">Social Links</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your social media profiles and CV link
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Social Media Links
          </h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div key={platform.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <Icon className={`w-5 h-5 mr-2 ${platform.color}`} />
                    {platform.name}
                  </div>
                </label>
                <div className="relative">
                  <input
                    {...register(platform.name, {
                      required: `${platform.name} is required`,
                      pattern: {
                        value: /^https?:\/\/.+/,

                        message:
                          "Please enter a valid URL starting with http:// or https://",
                      },
                    })}
                    type="url"
                    placeholder={platform.placeholder}
                    className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  />
                  {socialLinks[platform.name] && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <a
                        href={socialLinks[platform.name]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
                {errors[platform.name] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[platform.name].message}
                  </p>
                )}
              </div>
            );
          })}

          <div className="flex justify-end pt-4">
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

      {/* Preview Section */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Preview</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon;
              const link = socialLinks[platform.name];
              return (
                <div key={platform.name} className="flex items-center">
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium ${platform.color} hover:bg-gray-50 transition-colors`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {platform.name}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-400">
                      <Icon className="w-4 h-4 mr-2" />
                      {platform.name} (Not set)
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {Object.values(socialLinks).every((link) => !link) && (
            <p className="text-gray-500 text-center py-4">
              No social links configured yet. Add your links above to see the
              preview.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
