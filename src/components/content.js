import React from 'react';
import TasksList from './tasksList';
import SingleTask from './singleTask';
import NewTask from './newTask';
//import * as data from '../../tasks.json';

import {Route} from 'react-router-dom';

import {fetchList, fetchTask, addTask, updateTask} from '../../api/index';

export default class Content extends React.Component{

    constructor(){
        super();
        this.state={
            //tasks: data.todoList
            tasks:[],
            currentTask:{}
        };
        this.getDetails = this.getDetails.bind(this);
        this.editTask = this.editTask.bind(this);
        
    }



    componentDidMount(){

        fetchList().then((list)=>{
            //console.log('list from api', list);
            this.setState((state)=>({
                tasks: list
            }))
        }).catch(e=>console.error(e));
    }


    getDetails(taskId) {
        
        fetchTask(taskId).then(task => {
            console.log(task);

            this.setState({
                currentTask: task
            })
        }).catch(e=>console.error(e));
           
    }


    addNewTask(newTask){

        addTask(newTask).then((str)=>{

            fetchList().then(listData =>{
                this.setState({
                    tasks: listData
                });
            })
            .catch(e => console.error(e));
        }).catch(e => console.error(e));

    }


    editTask(taskId, editedTask){


        updateTask(taskId, editedTask).then(result => {

            // instead of calling the DB again, just update the state with the updated task.
            let newTasks = []
            this.state.tasks.forEach((singleTask, index) =>{
                console.log(singleTask);

                console.log(taskId);
                if(singleTask._id === taskId){

                    let newSingleTask = {...singleTask};
                    // update this element
                    newSingleTask.title = editedTask.title;
                    newSingleTask.date = editedTask.date;
                    newSingleTask.description = editedTask.description;
                    newSingleTask.finished = editedTask.finished;

                    newTasks.push(newSingleTask);
                    
                } else {
                    newTasks.push(singleTask);
                }
            });

            console.log(newTasks);
        
            this.setState({
                tasks: newTasks
            });
        }).catch(e=>console.error(e));
 
    }


    render(){
        
        return(
            <div>
                <p>This is the main content.</p>
                <Route exact path="/" render={()=>(
                    
                    <TasksList tasksList={this.state.tasks} getDetails={(taskId)=>this.getDetails(taskId)} />
                )}>
                
                </Route>

                <Route path="/task/" render={({history})=>(
                    <SingleTask task={this.state.currentTask} onEdit={(id, task)=>
                        {this.editTask(id, task);
                            history.push("/");
                        }
                    }/>
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