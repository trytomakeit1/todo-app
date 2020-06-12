import React from 'react';
import TasksList from './tasksList';

import * as data from '../../tasks.json';
import SingleTask from './singleTask';

export default class Content extends React.Component{

    constructor(){
        super();
        this.state={
            singleTaskId: -1,
            currentTask: {}
        };
        this.getDetails = this.getDetails.bind(this);
        
    }


    getDetails(taskId) {
        console.log("getDetails", taskId);

        // if exists in this.props.tasksList
        data.todoList.forEach(element => {
            if(element.id === taskId) {
                console.log("getDetails", element.description);
                // go to single task page
               // this.props.onChange(taskId)
               this.setState({
                singleTaskId: taskId,
                currentTask: element
            })
            }
        });
    }



    render(){

        return(
            <div>
                <p>This is the main content.</p>
                
                {this.state.singleTaskId === -1 && <TasksList tasksList={data.todoList} getDetails={(taskId)=>this.getDetails(taskId)} /> }
                
                {this.state.singleTaskId !== -1 && <SingleTask task={this.state.currentTask}/> }

            </div>

        )
    }
}