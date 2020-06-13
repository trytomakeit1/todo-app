import React, {Component} from 'react';



class NewTask extends Component {
    constructor(){
        super();
        this.state={};
        this.addNewTask = this.addNewTask.bind(this);
    }



    addNewTask(event){
        // 1) get all the values from input fields
        event.preventDefault();
        const title = event.target.elements.title.value;
        const description = event.target.elements.description.value;        
        const date = event.target.elements.date.value;

        
        // 2) create an object to be added to the main data

        let newTask={
            id: Number(new Date()),
            title,
            description,
            date,
            finished: false
        }

        this.props.onNewTask(newTask);

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
                        <input id="date" type="text" name="date" placeholder="DD-MM-YYYY"></input>
                    </div>

                    <div className="form-control display-table">
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" name="description"></textarea>
                    </div>

                    <div>
                        <input type="hidden" name="finished" value="false"></input>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>);
    }

}
export default NewTask;
