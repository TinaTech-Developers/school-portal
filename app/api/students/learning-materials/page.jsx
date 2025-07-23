// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import StudentLayout from "../../_components/StudentLayout";
// import { BiBookOpen, BiSearch } from "react-icons/bi";

// const learningMaterials = [
//   {
//     subject: "Mathematics",
//     subjectId: "math",
//     materials: [
//       {
//         title: "Algebra Notes",
//         url: "/materials/math/algebra.pdf",
//         type: "PDF",
//         uploaded: "2025-07-10",
//       },
//       {
//         title: "Geometry Slides",
//         url: "/materials/math/geometry.pptx",
//         type: "PPT",
//         uploaded: "2025-07-12",
//       },
//     ],
//   },
//   {
//     subject: "Science",
//     subjectId: "science",
//     materials: [
//       {
//         title: "Lab Safety",
//         url: "/materials/science/safety.pdf",
//         type: "PDF",
//         uploaded: "2025-07-11",
//       },
//     ],
//   },
// ];

// export default function LearningMaterialsPage() {
//   const [query, setQuery] = useState("");

//   const filtered = learningMaterials.filter((group) =>
//     group.subject.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <StudentLayout>
//       <div className="p-6 bg-gray-50 min-h-screen">
//         <div className="max-w-5xl mx-auto">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 📚 Learning Materials
//               </h1>
//               <p className="text-gray-500">
//                 View uploaded notes, slides and other materials.
//               </p>
//             </div>
//             <div className="relative">
//               <BiSearch className="absolute left-3 top-3 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search subjects..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {filtered.map((group) => (
//               <Link
//                 key={group.subjectId}
//                 href={`/dashboard/student/learning-materials/${group.subjectId}`}
//                 className="block bg-white rounded-xl p-6 shadow hover:shadow-md transition"
//               >
//                 <div className="flex items-center gap-4">
//                   <BiBookOpen className="text-4xl text-green-600" />
//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-800">
//                       {group.subject}
//                     </h2>
//                     <p className="text-sm text-gray-500">
//                       {group.materials.length} material
//                       {group.materials.length > 1 ? "s" : ""}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>

//           {filtered.length === 0 && (
//             <p className="text-gray-500 text-center mt-10">
//               No matching subjects found.
//             </p>
//           )}
//         </div>
//       </div>
//     </StudentLayout>
//   );
// }
