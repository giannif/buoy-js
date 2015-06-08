export default function(date){
   var d = date || new Date(),
      month = (d.getUTCMonth() + 1).toString(),
      day = d.getUTCDate().toString();
   if(month.length === 1){
   		month = "0" + month;
   }
   if(day.length === 1){
   		day = "0" + day;
   }
   return d.getUTCFullYear().toString() + month + day;
}
