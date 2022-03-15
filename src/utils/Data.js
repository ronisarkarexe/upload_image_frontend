export const categories = [
   {
     name: 'cars',
     image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
   },
   {
     name: 'fitness',
     image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zml0bmVzc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
   },
   {
     name: 'wallpaper',
     image: 'https://images.unsplash.com/photo-1610483189142-975e408811c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VsbHBhcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
   },
   {
     name: 'websites',
     image: 'https://images.unsplash.com/photo-1426024120108-99cc76989c71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHdlYnNpdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
   },
   {
     name: 'photo',
     image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
   },
   {
     name: 'food',
     image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
   },
   {
     name: 'nature',
     image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
   },
   {
     name: 'art',
     image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
   }, {
     name: 'travel',
     image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dHJhdmVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
   },
   {
     name: 'quotes',
     image: 'https://images.unsplash.com/photo-1608999383953-d61f5d9c1ace?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHF1b3Rlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
   }, {
     name: 'cats',
     image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
   }, {
     name: 'dogs',
     image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
   },
   {
     name: 'other',
     image: 'https://unsplash.com/',
   },
 ];

export const userQuery = (userId) => {
   const query = `*[_type == "user" && _id == '${userId}']`;

   return query;
}

export const searchQuery = (searchTerm) =>{
   const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
      image{
         asset -> {
            url
         }
      },
      _id,
      destination,
      postedBy ->{
         _id,
         username,
         image
      },
      save[]{
         _key,
         postedBy ->{
            _id,
            username,
            image
         },
      },
   }`;

   return query;
}

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc){
   image{
      asset -> {
         url
      }
   },
   _id,
   destination,
   postedBy ->{
      _id,
      username,
      image
   },
   save[]{
      _key,
      postedBy ->{
         _id,
         username,
         image
      },
   },
}`;

export const pinDetailQuery = (pinId) => {
   const query = `*[_type == "pin" && _id == '${pinId}']{
     image{
       asset->{
         url
       }
     },
     _id,
     title, 
     about,
     category,
     destination,
     postedBy->{
       _id,
       username,
       image
     },
    save[]{
       postedBy->{
         _id,
         username,
         image
       },
     },
     comments[]{
       comment,
       _key,
       postedBy->{
         _id,
         username,
         image
       },
     }
   }`;
   return query;
 };
 
 export const pinDetailMorePinQuery = (pin) => {
   const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
     image{
       asset->{
         url
       }
     },
     _id,
     destination,
     postedBy->{
       _id,
       username,
       image
     },
     save[]{
       _key,
       postedBy->{
         _id,
         username,
         image
       },
     },
   }`;
   return query;
 };

 export const userCreatedPinsQuery = (userId) => {
   const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
     image{
       asset->{
         url
       }
     },
     _id,
     destination,
     postedBy->{
       _id,
       username,
       image
     },
     save[]{
       postedBy->{
         _id,
         username,
         image
       },
     },
   }`;
   return query;
 };
 
 export const userSavedPinsQuery = (userId) => {
   const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
     image{
       asset->{
         url
       }
     },
     _id,
     destination,
     postedBy->{
       _id,
       username,
       image
     },
     save[]{
       postedBy->{
         _id,
         username,
         image
       },
     },
   }`;
   return query;
 };