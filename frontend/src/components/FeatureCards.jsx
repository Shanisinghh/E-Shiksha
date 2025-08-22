import { MdCastForEducation } from "react-icons/md";
import { MdOutlineLockOpen } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";

const features = [
  { icon: <MdCastForEducation className="w-7 h-7 text-blue-600" />, text: "20k+ online Courses" },
  { icon: <MdOutlineLockOpen className="w-7 h-7 text-green-600" />, text: "Lifetime Access" },
  { icon: <RiMoneyRupeeCircleFill className="w-7 h-7 text-yellow-600" />, text: "Value for money" },
  { icon: <MdOutlineSupportAgent className="w-7 h-7 text-purple-600" />, text: "Lifetime Support" },
  { icon: <MdGroups2 className="w-7 h-7 text-pink-600" />, text: "Community Support" },
];

export default function FeatureCards() {
  return (
    <div className="my-6 px-2">
      <div className="flex gap-4 overflow-x-auto md:overflow-x-hidden flex-nowrap md:flex-wrap md:justify-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-shrink-0 items-center py-3 px-5 gap-2 rounded-md bg-white shadow-sm border border-gray-200 text-sm font-medium text-gray-700 hover:shadow-lg transition"
          >
            {feature.icon}
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
