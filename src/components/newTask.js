import React, {Component} from 'react';



class NewTask extends Component {
    constructor(){
        super();
        this.state={};
    }

    render(){

        //onNewTask={this.addNewTask(newTask)}
        return(
        <div><h3>Add a new task</h3>
            <div className="form-container">
                <form>
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
