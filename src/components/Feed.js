import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {client} from '../client';
import { feedQuery, searchQuery } from '../utils/Data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';


const Feed = () => {
   const [loding, setLoding] = useState(false);
   const [pins, setPins] = useState(null)
   const { categoryId } = useParams();

   useEffect(() => {
      setLoding(true)
     if(categoryId){
         const query = searchQuery(categoryId);

         client.fetch(query)
         .then((data) => {
            setPins(data);
            setLoding(false)
         })
     }else{
      client.fetch(feedQuery)
      .then((data) => {
         setPins(data)
         setLoding(false)
      })
     }
   }, [categoryId])
   

   if(loding) return <Spinner message="We are adding new ideas to your feed!"/>

   if(!pins?.length) return <h2>No pins available</h2>
   
   return (
      <div>
         {pins && <MasonryLayout pins={pins}/>}
      </div>
   );
};

export default Feed;