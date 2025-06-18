import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as LucideIcons from "lucide-react";
export default function DynamicIcon({ iconName, className = "", size = 24 }) {
  const IconComponent =
    FaIcons[iconName] || AiIcons[iconName] || LucideIcons[iconName];

  if (!IconComponent)
    return <span className="text-red-500">Icon not found</span>;

  return <IconComponent size={size} className={className} />;
}
