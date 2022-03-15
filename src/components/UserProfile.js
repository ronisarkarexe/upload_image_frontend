import React,{useState, useEffect} from 'react';
import { AiOutlineLogout} from 'react-icons/ai';
import {useParams, useNavigate} from 'react-router-dom';
import {GoogleLogout} from 'react-google-login';


import {userCreatedPinsQuery, userQuery, userSavedPinsQuery} from '../utils/Data';
import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const randomImage = "https://source.unsplash.com/1600x900/?nature,photography,technology";

const activeBtnStyle = 'bg-red-500 text-white font-600 p-2 rounded-full w-20 outline-none'
const notActiveBtnStyle = 'bg-primary mr-4 text-black font-600 p-2 rounded-full w-20 outline-none'


const UserProfile = () => {

   const [user, setUser] = useState(null);
   const [pins, setPins] = useState(null);
   const [text, setText] = useState('Created')
   const [activeBtn, setActiveBtn] = useState('created')
   const navigate = useNavigate();
   const {userId} = useParams();

   useEffect(() => {
      const query = userQuery(userId);

      client.fetch(query)
      .then((response) => {
         setUser(response[0]);
      })
   },[userId]);

   useEffect(() => {
      if(text === 'Created'){
         const createdPinsQuery = userCreatedPinsQuery(userId);
         
         client.fetch(createdPinsQuery)
         .then((response) => {
            setPins(response);
         })
      }else{
         const savedPinsQuery = userSavedPinsQuery(userId);

         client.fetch(savedPinsQuery)
         .then((response) => {
            setPins(response);
         })
      }
   },[text, userId]);

   const Logout = () => {
      localStorage.clear();
      navigate('/login');
   }

   if(!user ){
      return <Spinner message="Loading profile..?"></Spinner>
   }

   // console.log('User-Profile',user._id)
   // console.log('localStorage',localStorage.user)


   return (
      <div className="relative pb-2 h-full justify-center items-center">
         <div className="flex flex-col pb-5">
            <div className="relative flex flex-col mb-7">
               <div className="justify-center flex flex-col items-center">
                  <img src={randomImage} alt="banner-pic" className="w-full h-370 2xl:h-510 shadow-lg object-cover"/>
                  <img src={user.image || user?.imageUrl} alt="user-pic" className="w-20 h-full rounded-full -mt-10 shadow-xl object-cover"/>
                  <h1 className="font-bold text-3xl text-center mt-3">{user.username || user?.userName}</h1>
                  <div className="absolute top-0 z-1 right-0 p-2">
                     {userId === user._id && (
                        <GoogleLogout
                        clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                        render={(renderProps) => (
                           <button
                              type="button"
                              className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                           >
                              <AiOutlineLogout color="red" fontSize={21}/>
                           </button>
                        )}
                        onLogoutSuccess={Logout}
                        cookiePolicy="single_host_origin"
                        />
                     )}
                  </div>
               </div>
               <div className="text-center mb-7">
                  <button
                     type="button"
                     onClick={(e)=>{
                        setText(e.target.textContent);
                        setActiveBtn('created')
                     }}
                     className={`${activeBtn === 'created' ? activeBtnStyle : notActiveBtnStyle}`}
                  >
                     Created
                  </button>
                  <button
                     type="button"
                     onClick={(e)=>{
                        setText(e.target.textContent);
                        setActiveBtn('saved')
                     }}
                     className={`${activeBtn === 'saved' ? activeBtnStyle : notActiveBtnStyle}`}
                  >
                     Saved
                  </button>
               </div>
               {pins?.length?(
                  <div className="px-2">
                     <MasonryLayout pins={pins}/>
                  </div>
               ):(
                  <div className="flex justify-center items-center font-bold w-full text-xl mt-2">
                     <p>No pins found.!</p>
                  </div>
               )}
                  {/* <div className="px-2">
                     <MasonryLayout pins={pins}/>
                  </div> */}
            </div>
         </div>
      </div>
   );
};

export default UserProfile;