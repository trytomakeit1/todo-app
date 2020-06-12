import React from 'react';
import TasksList from './tasksList';

import * as data from '../../tasks.json';
import SingleTask from './singleTask';
import {Route} from 'react-router-dom';

export default class Content extends React.Component{

    constructor(){
        super();
        this.state={
            currentTask: {}
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



    render(){
        
        return(
            <div>
                <p>This is the main content.</p>
                <Route exact path="/" render={()=>(
                    
                        <TasksList tasksList={data.todoList} getDetails={(taskId)=>this.getDetails(taskId)} />
                    )}>
                
                </Route>

                <Route path="/task/" render={()=>(

                    <SingleTask task={this.state.currentTask}/>
                )}>
                </Route>

            </div>

        )
    }
}