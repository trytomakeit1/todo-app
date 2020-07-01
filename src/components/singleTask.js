import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class SingleTask extends Component{

    constructor(props){
        super(props);

        this.state={
            _id: this.props.task._id,
            title: this.props.task.title,
            date: '',
            description: this.props.task.description,
            finished: false
            
        };

        this.changeHandler = this.changeHandler.bind(this);
    }


    
    componentDidUpdate(prevProps, prevState){
        //console.info("prev props", prevProps.task);
       // console.info("current props", this.props.task);
        
        if(prevProps.task !== this.props.task) {

            this.setState({

                _id: this.props.task._id,
                title: this.props.task.title,
                
                description: this.props.task.description,
                finished: this.props.task.finished
            
            });

        }
    }

    changeHandler(event){

        let _name = event.target.name;
        console.log(event);
        if(_name !== "finished") {
   
            this.setState({
                [_name]: event.target.value

            });
        }
        else {
            console.log(event.target.checked)
            this.setState({
                [_name]: event.target.checked
    
            }); 
        }
    }


    editTask(event){
        event.preventDefault();

        let updatedTask = {
//            _id: event.target.elements._id.value,
            title: event.target.elements.title.value,
            date: Number(new Date()),
            description: event.target.elements.description.value,
            finished: event.target.elements.finished.checked
            
        }


        console.log("updatedTask", updatedTask);
        this.props.onEdit(event.target.elements._id.value, updatedTask);


    }

    
    render(){

        return(
            <div className="taskContainer">
                <div id="viewTask">
                
                    <div>
                        <h5 className="inlineBlock">Title:</h5>
                        <span style={{padding: '0px 20px'}}>{this.props.task.title}</span>
                    </div>

                    <hr />

                    <div style={{marginBottom: '20px'}}>

                        <h5>Description:</h5>
                        <p>{this.props.task.description}</p>
                        

                        <h5 className="inlineBlock">Due date:</h5>
                        <span style={{padding: '0px 20px'}}>
                            {new Date(this.props.task.date).toDateString()}
                        </span>
                        <h5 className="inlineBlock">Done: </h5>
                        {/* checked property should have that control otherwise get the following error.
                        Error: A component is changing an uncontrolled input of type checkbox to be controlled. Input elements
                        should not switch from uncontrolled to controlled (or vice versa). 
                        Decide between using a controlled or uncontrolled input element for the lifetime of the component*/}
                        {/* <input style={{padding: '0px 20px'}} type="checkbox" disabled checked={this.props.task.finished ? 
                        this.props.task.finished : false }/> */}

                    </div>
                    <div style={{margin: '20px 0px'}}>

                        <Link to="/" className="button">Back to list</Link>
                        <button className="pull-right" onClick={()=>{
                            document.getElementById("viewTask").style.display = "none";
                            document.getElementById("editTask").style.display = "block";
                            }}>Edit</button>
                    </div>
                    <div style={{clear: 'both'}}></div>
                </div>



                
                <div id="editTask" style={{display: "none"}}>

                    <form onSubmit={(e)=>this.editTask(e)}>
                        <div className="form-control">
                            <label htmlFor="title">Title:</label>
                            <input id="title" type="text" name="title" value={this.state.title} onChange={this.changeHandler}></input>
                        </div>

                        <div className="form-control">
                            <label htmlFor="date">Due date:</label>
                            <input id="date" type="text" name="date" placeholder="MM/DD/YYYY" value={this.state.date} disabled></input>
                        </div>

                        <div className="form-control display-table">
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" value={this.state.description} onChange={this.changeHandler}></textarea>
                        </div>

                        <div className="form-control display-table checkbox-input">

                        <label htmlFor="finished">Finished:</label>
                            <input id="finished" type="checkbox" name="finished" checked={this.state.finished} onChange={this.changeHandler}></input>
                            <input type="hidden" name="_id" value={this.state._id}></input>

                        </div>
                        <div className="pull-right">
                        <button>Save</button>
                        </div>
                        <div style={{clear: "both"}}>
                        </div>
                    </form>
                </div>
        
        
        
        </div>
        )
    }
}

export default SingleTask;