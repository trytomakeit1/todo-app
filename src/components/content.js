import React from 'react';
import TasksList from './tasksList';
import SingleTask from './singleTask';
import NewTask from './newTask';
import * as data from '../../tasks.json';

import {Route} from 'react-router-dom';

export default class Content extends React.Component{

    constructor(){
        super();
        this.state={
            tasks: data.todoList
        };
        this.getDetails = this.getDetails.bind(this);
        
    }


    getDetails(taskId) {

        data.todoList.forEach(element => {
            if(element.id === taskId) {

                this.setState({
                currentTask: element
            })
            }
        });
    }


    addNewTask(newTask){

        console.log("add new task", newTask);
        //update the state with new data

    }

    render(){
        
        return(
            <div>
                <p>This is the main content.</p>
                <Route exact path="/" render={()=>(
                    
                    <TasksList tasksList={this.state.tasks} getDetails={(taskId)=>this.getDetails(taskId)} />
                )}>
                
                </Route>

                <Route path="/task/" render={()=>(

                    <SingleTask task={this.state.currentTask}/>
                )}>
                </Route>

                <Route path="/new" render={()=>(
                    <NewTask  />

                )}>


                </Route>

            </div>

        )
    }
}