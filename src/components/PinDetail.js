import React, {useState, useEffect} from 'react';
import {MdDownloadForOffline} from 'react-icons/md';
import {Link, useParams} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

import {client, urlFor} from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/Data';
import Spinner from './Spinner';


const PinDetail = ({user}) => {

   const [pins, setPins] = useState(null);
   const [pinDetail, setPinDetail] = useState(null);
   const [comment, setComment] = useState('');
   const [addingComment, setAddingComment] = useState(false)
   const {pinId} = useParams();

   const addComment = () => {
      if(comment){
         setAddingComment(true);

         client
         .patch(pinId)
         .setIfMissing({ comments: []})
         .insert('after','comments[-1]',[{
            comment,
            _key: uuidv4(),
            postedBy:{
               _type: 'postedBy',
               _ref: user._id
            }
         }])
         .commit()
         .then(() => {
            fetchPinDetail();
            setComment('');
            setAddingComment(false);
         })
      }
   }

   const fetchPinDetail = () => {
      const query = pinDetailQuery(pinId);

      if(query){
         client.fetch(query)
         .then((date) => {
            setPinDetail(date[0]);

            if(date[0]){
              const query = pinDetailMorePinQuery(date[0]);
               client.fetch(query)
               .then((response) => setPins(response))
            }
         })
      }
   }


   useEffect(() => {
      fetchPinDetail();
   },[pinId]);

   if(!pinDetail) return <Spinner message="Loading pin..." />;

   return (
      <>
      <div className="flex xl-flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px'}}>
         <div className="flex justify-center items-center md:items-start flex-initial">
            <img src={pinDetail?.image && urlFor(pinDetail.image).url()} alt="user-post" className="rounded-t-3xl rounded-b-xl"/>
         </div>
         <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex justify-between items-center">
               <div className="flex gap-2 items-center">
               <a href={`${pinDetail.image?.asset?.url}?dl=`}
                     download
                     onClick={(e) => e.stopPropagation()}
                     className="bg-gray-400 w-8 h-8 rounded-full flex items-center justify-center text-wight text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none "
                     >
                        <MdDownloadForOffline/>
                     </a>
               </div>
               <a href={pinDetail.destination} target="_blank" rel="noreferrer">{pinDetail.destination}</a>
            </div>
            <div>
               <h1 className="text-4xl font-bold break-words mt-3">{pinDetail.title}</h1>
               <p className="mt-3">{pinDetail.about}</p>
            </div>
            <Link to={`/user-profile/${pinDetail.postedBy?._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
               <img className="w-8 h-full rounded-full object-cover" src={pinDetail.postedBy?.image || user?.imageUrl} alt="user-profile" />
               <p className="font-500 capitalize">{pinDetail.postedBy?.username}</p>
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-370 overflow-y-auto">
               {pinDetail?.comments?.map((comment,i) =>(
                  <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" value={i}>
                     <img src={comment.postedBy.image || user?.imageUrl} alt="user-profile" className="w-10 h-10 rounded-full cursor-pointer"/>
                     <div className="flex flex-col">
                        <p className="font-bold">{comment.postedBy.username}</p>
                        <p>{comment.comment}</p>
                     </div>
                  </div>
               ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
               <Link to={`/user-profile/${pinDetail.postedBy?._id}`} >
                  <img className="w-10 h-10 rounded-full cursor-pointer" src={pinDetail.postedBy?.image || user?.imageUrl} alt="user-profile" />
               </Link>
               <input type="text" className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300" placeholder="Add a comment" value={pinDetail.comment} onChange={(e) => setComment(e.target.value)}
               />
               <button
                  type="button" className="bg-red-500 font-500 outline-none text-white font-600 px-6 py-2 text-base rounded-full" onClick={addComment}
               >{addingComment? 'Posting the comment...' : 'Post'}</button>
            </div>
         </div>
      </div>
      {pins?.length>0? (
         <>
         <h2 className="text-center font-bold text-2x mt-8 mb-4">More like this</h2>
         <MasonryLayout pins={pins}/>
         </>
      ):(
         <Spinner message="Loading more pins..."></Spinner>
      )}
      </>
   );
};

export default PinDetail;