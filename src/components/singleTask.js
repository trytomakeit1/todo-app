import React, { Component } from 'react';

class SingleTask extends Component{

    constructor(){
        super();
        this.state={};
    }

    render(){

        return(
            <div className="taskContainer">
                
                <div>
                    <h5 className="inlineBlock">Title:</h5>
                    <span style={{padding: '0px 20px'}}>{this.props.task.title}</span>
                </div>

                <hr />

                <h5>Description:</h5>
                <p>{this.props.task.description}</p>
                
                <h5 className="inlineBlock">Due date:</h5>
                <span style={{padding: '0px 20px'}}>
                    {new Date(this.props.task.date).toDateString()}
                </span>
                <h5 className="inlineBlock">Done: </h5>

                <input style={{padding: '0px 20px'}} type="checkbox" disabled checked={this.props.task.finished}/>
                        
        </div>)
    }
}

export default SingleTask;