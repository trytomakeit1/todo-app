import moment from 'moment';

const DateControl = (dateToCheck) => {

    let controlResult;
    console.log("date to control:", dateToCheck);

    if(dateToCheck.match(/^\d\d\/\d\d\/\d\d\d\d$/) == null) {
        controlResult = "*Error: The date format should be: DD/MM/YYYY";
        return controlResult;
    }
    let dateToArray = dateToCheck.split("/");
    if(!((parseInt(dateToArray[0]) >= 0 && parseInt(dateToArray[0]) <= 31))) {
        controlResult = "*Error: The day is not a valid number";
    } else
    if(!((parseInt(dateToArray[1]) >= 1 && parseInt(dateToArray[1]) <= 12))) {
        controlResult = "*Error: The month is not a valid number";
    } else
    // TODO year interval
    
    if(!((parseInt(dateToArray[2]) <= moment().year() && parseInt(dateToArray[2]) >= 1970 ))) {
        controlResult = "*Error: The year is not a valid number";

    }
    
    return controlResult;
    
}

export default DateControl;