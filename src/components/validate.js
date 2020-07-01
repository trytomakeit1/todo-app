import DateControl from './dateControl';


const Validate = (title, date, description) => {


    let dateValidation = DateControl(date);
    let dateError = dateValidation ? dateValidation : "";
    let titleError = (!title || title === "") ?
    "*Error: Please insert a title" : "";
    let descriptionError = (!description || description === "") ?
    "*Error: Please insert the description" : "";

    //send error msg
        
    return {
        errorOccured: (dateError !== "" || 
                        titleError !== "" || 
                        descriptionError !== "") ? 1 : 0,
        errors: {
            date: dateError,
            title: titleError,
            description: descriptionError

        }};

}

export default Validate;