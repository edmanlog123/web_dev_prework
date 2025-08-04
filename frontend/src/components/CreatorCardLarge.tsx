import { PencilIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

type Props = {
  name: string;
  bio: string;
  image: string;
  links: {
    type: string;
    url: string;
  }[];
  onEdit?: () => void;
};

export default function CreatorCard({ name, bio, image, onEdit }: Props) {
  return (
    <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow w-[350px] h-[420px] shrink-0">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-[270px] object-fill"
      />

      {/* Top-right icons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <InformationCircleIcon className="h-5 w-5 text-white bg-black bg-opacity-50 rounded-full p-0.5" />
        {onEdit && (
  <button onClick={onEdit}>
    <PencilIcon className="h-5 w-5 text-white bg-black bg-opacity-50 rounded-full p-0.5" />
  </button>
)}

      </div>

      {/* Content */}
      <div className="p-4 bg-white">
        <h3 className="text-sm font-bold text-blue-700 uppercase">{name}</h3>
        <div className="flex items-center space-x-2 mt-1 mb-2 text-gray-600">
          <FaYoutube className="w-4 h-4" />
          <FaTwitter className="w-4 h-4" />
          <FaInstagram className="w-4 h-4" />
        </div>
        <p className="text-sm text-gray-800 line-clamp-3">{bio}</p>
      </div>
    </div>
  );
}
