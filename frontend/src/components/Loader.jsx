import React from "react";


export default function Loader() {
return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
<div className="relative flex items-center justify-center">
{/* Outer Ring */}
<div className="lg:w-16 w-13 h-13 lg:h-16 border-6 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
{/* Glowing Pulse */}
<div className="absolute w-16 h-16 rounded-full bg-black opacity-20 animate-ping"></div>
</div>
<p className="mt-6 text-gray-700 text-lg font-semibold animate-pulse">
Loading, please wait...
</p>
</div>
);
}