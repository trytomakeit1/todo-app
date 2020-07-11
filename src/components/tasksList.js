import React from 'react';

import {Link} from 'react-router-dom';

class TasksList extends React.Component {

    constructor(props){
        super(props);
        this.state={};

    }        
    


    render(){
        return(

            <div>
                <p className="message error-message">{this.props.onError}</p>

                <p className="message info-message">{this.props.onInfo}</p>

                {this.props.tasksList.map((element, index)=>{
                    return(
                        <div className="taskContainer" key={element._id} >
                            <div>
                                <div>
                                    <Link className="button pull-right trash" to={'/'} onClick={()=>this.props.onDeleteTask(element._id)}>Delete task</Link>

                                    <h5 className="inlineBlock">Title:</h5>
                                    <span style={{padding: '0px 20px'}}>{element.title}</span>
                                </div>
                                <div style={{clear: 'both'}}></div>

                                <hr />
                                <h5 className="inlineBlock">Due date:</h5>
                                <span style={{padding: '0px 20px'}}>
                                    {element.date}
                                </span>
                                <h5 className="inlineBlock">Done: </h5>

                                <input style={{padding: '0px 20px'}} type="checkbox" disabled checked={element.finished}/>
                            </div>
                            
                            
                            <div>
                                <Link className="button pull-right" to={`/task/${element._id}`} onClick={()=>this.props.getDetails(element._id)}>Go to details</Link>
                            </div>
                            
                            <div style={{clear: 'both'}}></div>
                        </div>
                    );

                })}
            </div>
        )
    }

}
export default TasksList;