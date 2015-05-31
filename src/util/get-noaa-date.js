import {getUTCDate} from "./date";
export default function(date){
   var d = date || getUTCDate(),
      month = (d.getMonth() + 1).toString(),
      day = d.getDate().toString();
   if(month.length === 1){
   		month = "0" + month;
   }
   if(day.length === 1){
   		day = "0" + day;
   }
   return d.getFullYear().toString() + month + day;
}
