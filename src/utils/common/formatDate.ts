export const formatDate = (date:any) => {
    if(!date)
    {
      return date
    }
    const dateOfTypeDate = new Date(date);
    const year = dateOfTypeDate.getFullYear();
    const month = String(dateOfTypeDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(dateOfTypeDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const DateToTime = (date:string|undefined) =>{
   if(!date)
   {
     return date
   }
   const dateOfTypeDate = new Date(date+" GMT+0530");
   return dateOfTypeDate.toISOString()
}