import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {RiHomeFill} from 'react-icons/ri';
import {IoIosArrowForward} from 'react-icons/io';

import logo from '../assets/imageLogo.jpg';
import {categories} from '../utils/Data';
import Footer from './Footer';



const isNotActiveStyle = 'flex items-center px-5 gap-500 hover:text-black transition-all duration-200 easy-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 font-extrabold border-r-2 border-black transition-all duration-200 easy-in-out capitalize';


const Sidebar = ({user, closeToggle}) => {

   const handelCloseSidebar = () => {
      if(closeToggle) closeToggle(false);
   }
   return (
      <div className="flex flex-col justify-between bg-wight h-full overflow-y-scroll min-w-210 hide-scrollbar">
         <div className="flex flex-col">
            <Link
            to="/"
            className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
            onClick={handelCloseSidebar}
            >
               <img src={logo} alt="logo" className="w-full"/>
            </Link>
            <div className="flex flex-col gap-5">
               <NavLink
                  to='/'
                  className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
                  onClick={handelCloseSidebar}
               >
                  <RiHomeFill/>
                  Home
               </NavLink>
               <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover categories</h3>
               {categories.slice(0, categories.length - 1).map((category)=>(
                  <NavLink
                  to={`/category/${category.name}`}
                  className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
                  onClick={handelCloseSidebar}
                  key={category.name}
                  >
                     <img src={category.image} alt="category" className="w-8 h-8 rounded-full shadow-sm mr-3"/>
                  {category.name}
                  </NavLink>
               ))}
            </div>
         </div>
         {user && (
            <Link
               to={`/user-profile/${user._id}`}
               className="flex my-5 mb-5 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
               onClick={handelCloseSidebar}
            >
               <img src={user?.image || user.imageUrl} alt="User_Profile" className="w-10 h-10 rounded-full"  />
               <p>{user.userName || user.username}</p>
               <IoIosArrowForward/>
            </Link>
         )}
         <Footer/>
      </div>
   );
};

export default Sidebar;