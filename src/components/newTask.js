import React, {Component} from 'react';
import Validate from './validate';


class NewTask extends Component {
    constructor(){
        super();
        this.state={
            errors: {
                date: '',
                title: '',
                description: ''
            }
            
        };
        this.addNewTask = this.addNewTask.bind(this);
    }



    


    addNewTask(event){
        // 1) get all the values from input fields
        event.preventDefault();

        const title = event.target.elements.title.value;
        const description = event.target.elements.description.value;        
        const date = event.target.elements.date.value;
        // Validation

        let validationResult = Validate(title, date, description);


        this.setState({
            errors: {
                date: validationResult.errors.date,
                title: validationResult.errors.title,
                description: validationResult.errors.description
            }
        });

        if (validationResult.errorOccured === 0) {

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
                        <span className="message error-message margin-l-10">{this.state.errors.title}</span>

                    </div>

                    <div className="form-control">
                        <label htmlFor="date">Due date:</label>
                        {/*pattern="/^\d\d\/\d\d\/\d\d\d\d$/"*/}

                        <input id="date" type="text" name="date" placeholder="DD/MM/YYYY"></input>
                        <span className="message error-message margin-l-10">{this.state.errors.date}</span>

                    </div>

                    <div className="form-control display-table">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description"></textarea>
                        <span className="message error-message margin-l-10">{this.state.errors.description}</span>

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
