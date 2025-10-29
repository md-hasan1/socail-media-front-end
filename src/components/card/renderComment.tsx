// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { profileFallback } from "@/utils/fallBack";
// import moment from "moment";
// import Image from "next/image";

//   const renderComment = (comment: any,handleReplyClick:any,renderComment:any) => {
//     return (
//       <div className="mb-4">
//         {/* Comment Block */}
//         <div className="flex gap-4 items-start">
//           {/* Profile Picture */}
//           <div className="flex-shrink-0">
//             <Image
//               src={comment.user.profilePic || profileFallback}
//               alt={`Profile image of ${comment.user.firstName}`}
//               height={40}
//               width={40}
//               className="rounded-full"
//             />
//           </div>

//           {/* Comment Content */}
//           <div className="flex-grow">
//             <div className="flex items-center gap-2">
//               <p className="font-bold text-sm">
//                 {comment.user.firstName} {comment.user.lastName}
//               </p>
//               <p className="text-xs text-gray-500">
//                 {moment(comment.createdAt).fromNow()}
//               </p>
//             </div>
//             <p className="text-sm text-gray-700">{comment.text}</p>

//             {/* Interaction Buttons */}
//             <div className="flex gap-4 mt-2 text-sm text-blue-600">
//               <button className="hover:underline">Like</button>
//               <button
//                 className="hover:underline"
//                 onClick={() => handleReplyClick(comment.id)}
//               >
//                 Reply
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Nested Replies */}
//         {comment.replies && comment.replies.length > 0 && (
//           <div className="ml-12 mt-4">
//             {comment.replies.map((reply: any) => renderComment(reply))}
//           </div>
//         )}
//       </div>
//     );
//   };