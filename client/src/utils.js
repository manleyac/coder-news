  //function converts ISO datetime into relative time elapsed
  export const parseDate = (timestamp) => {
   let currentTime = new Date();
   let postTime = new Date(timestamp);
   let secondsPast = (currentTime - postTime) / 1000;
   if (secondsPast < 60) {
     return "Less than 1 minute ago";
   }

   if (secondsPast < 3600) {
     return "Less than 1 hour ago";
   }

   if (secondsPast <= 86400) {
     return `${parseInt(secondsPast / 3600)} hours ago`;
   }
   if (secondsPast > 86400) {
     return `${parseInt(secondsPast / 86400)} days ago`
   }
 };