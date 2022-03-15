import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs';


import { urlFor, client } from '../client';
import { fetchUser } from '../utils/fetchUser';
import { userQuery } from '../utils/Data';

const Pin = ({pin:{postedBy, image, _id, destination, save}}) => {

   const navigate = useNavigate();
   const [postHovered, setPostHovered] = useState(false);

   const user = fetchUser();

   const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user?.googleId))?.length;

   
   // 1, [2,3,1] -> [1].length -> 1 -> !1 -> false ->!false -> true
   // 1, [2,3,1] -> [].length -> 0 -> !0 -> true ->!true -> false



   const savePin = (id) => {
      if(!alreadySaved){
         client
         .patch(id)
         .setIfMissing({save: []})
         .insert('after', 'save[-1]',[{
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy:{
               _type: 'postedBy',
               _ref: user?.googleId,
            }
         }])
         .commit()
         .then(() => {
            window.location.reload();
         })
      }
   }

   const deletePin = (id) => {
      client
      .delete(id)
      .then(() => {
         window.location.reload();
      })
   }

   return (
      <div className="m-2">
         <div
            onMouseEnter={() => setPostHovered(true)}
            onMouseLeave={() => setPostHovered(false)}
            onClick={()=> navigate(`/pin-detail/${_id}`)}
            className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow:hidden transition-all duration-500 easy-in-out"
         >
         <img src={urlFor(image).width(250).url()} className="rounded-lg w-full" alt="user-post" />
         {postHovered && (
            <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50" style={{height: "100%"}}>
               <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                     <a href={`${image?.asset?.url}?dl=`}
                     download
                     onClick={(e) => e.stopPropagation()}
                     className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none "
                     >
                        <MdDownloadForOffline/>
                     </a>
                  </div>
                  {alreadySaved? (
                  <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-600 px-3 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                    {save?.length} Saved
                  </button>
                  ): (
                     <button

                     onClick={(e) => {
                        savePin(_id);
                        e.stopPropagation();
                     }}
                      type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-600 px-3 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                        Save
                     </button>
                  )}
               </div>
               <div className="flex justify-between items-center gap-2 w-full">
                     {destination && (
                        <a
                        href={destination}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-gray-500 flex items-center gap-2  text-black font-500 p-1 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                        >
                           <BsFillArrowUpRightCircleFill/>
                           {destination.length >20 ? `${destination.slice(0, 15)}...`: destination}
                        </a>
                     )}
                     { postedBy?._id === user?.googleId && (
                        <button
                        className="bg-gray-500 flex p-2 gap-2 font-bold wight rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                        type="button"
                        onClick={(e) => {
                           e.stopPropagation();
                           deletePin(_id)
                        }}
                        >
                           <AiTwotoneDelete/>
                        </button>
                     )}
               </div>
            </div>
         )}
         </div>
         <div>
            <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
               <img className="w-8 h-full rounded-full object-cover" src={postedBy?.image || user?.imageUrl} alt="user-profile" />
               <p className="font-500 capitalize">{postedBy?.username || user?.name}</p>
            </Link>
         </div>
      </div>
   );
};

export default Pin;