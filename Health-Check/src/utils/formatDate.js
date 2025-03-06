export function formatDate(inputDate) {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
  if (inputDate === null) {
    return null
  } else {
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }
    
  
   
  }
  
 