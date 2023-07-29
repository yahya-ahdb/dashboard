function getTime (dateString){
        const date = new Date(dateString);
        const offset = date?.getTimezoneOffset()/120;
        const hours = date?.getHours()
        date.setHours(hours - offset)
        return date.toLocaleTimeString();    
}
export default getTime