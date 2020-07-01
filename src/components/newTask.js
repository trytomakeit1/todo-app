import React, {Component} from 'react';
import DateControl from './dateControl';




class NewTask extends Component {
    constructor(){
        super();
        this.state={
            error: ''
        };
        this.addNewTask = this.addNewTask.bind(this);
    }



    addNewTask(event){
        // 1) get all the values from input fields
        event.preventDefault();
        // Validation

        let dateValidation = DateControl(event.target.elements.date.value);
        console.log("dateValidation", dateValidation);
        if(dateValidation){
            //send error msg
            this.setState({
                error: dateValidation
            })
        } else {
            const title = event.target.elements.title.value;
            const description = event.target.elements.description.value;        
            const date = event.target.elements.date.value;

            
            // 2) create an object to be added to the main data

            let newTask={
                //id: Number(new Date()),
                title,
                description,
                date,
                finished: false
            }

            this.props.onNewTask(newTask);

        }
        
    }


    render(){

        //onNewTask={this.addNewTask(newTask)}
        return(
        <div><h2>Add a new task</h2>
            <div className="form-container">
                <form onSubmit={()=>this.addNewTask(event)}>
                    <div className="form-control">
                        <label htmlFor="title">Title:</label>
                        <input id="title" type="text" name="title"></input>
                    </div>

                    <div className="form-control">
                        <label htmlFor="date">Due date:</label>
                        {/*pattern="/^\d\d\/\d\d\/\d\d\d\d$/"*/}

                        <input id="date" type="text" name="date" placeholder="DD/MM/YYYY"></input>
                        <span className="error-message margin-l-10">{this.state.error}</span>

                    </div>

                    <div className="form-control display-table">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description"></textarea>
                    </div>

                    <div>
                        <input type="hidden" name="finished" value="false"></input>
                    </div>
                    <div className="pull-right">
                        <button>Submit</button>
                    </div>
                    <div style={{clear: "both"}}></div>
                </form>
            </div>
        </div>);
    }

}
export default NewTask;
