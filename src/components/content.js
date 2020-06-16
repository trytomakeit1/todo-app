import React from 'react';
import TasksList from './tasksList';
import SingleTask from './singleTask';
import NewTask from './newTask';
//import * as data from '../../tasks.json';


import {Route} from 'react-router-dom';

import {fetchList, fetchTask} from '../../api/index';

export default class Content extends React.Component{

    constructor(){
        super();
        this.state={
            //tasks: data.todoList
            tasks:[],
            currentTask:{}
        };
        this.getDetails = this.getDetails.bind(this);
        
    }



    componentDidMount(){

        console.log("did mount");

        fetchList().then((list)=>{
            console.log('list from api', list);
            this.setState((state)=>({
                tasks: list
            }))
        }).catch(e=>console.error(e));
    }


    getDetails(taskId) {
        
        fetchTask(taskId).then(task => {

            this.setState({
                currentTask: task
            })
        }).catch(e=>console.error(e));
           
    }


    addNewTask(newTask){

        console.log("add new task", newTask);
        //update the state with new data
        this.setState((state)=>({
            tasks: this.state.tasks.concat(newTask)
        }));

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

                <Route path="/new" render={({history})=>{
                    return (
                        <NewTask  onNewTask={(newTask)=>
                            {
                                this.addNewTask(newTask);
                                history.push("/");
                            
                            }
                
                
                
                        }/>
                   
                   
                    )
                }
                }>


                </Route>

            </div>

        )
    }
}