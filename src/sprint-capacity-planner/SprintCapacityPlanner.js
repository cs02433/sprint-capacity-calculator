import React from 'react';
import '../styles/sprint.css';
import AddForm from "./AddForm";
import sprintCapacityCalculator from "../datamodel/sprint"


export default class SprintCapacityPlanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {capacity: "", startDate: "", endDate: ""};
    }

    onChange(e) {
        let val = {};
        val[e.target.name] = e.target.value;
        this.setState(val);
    }

    render() {
        return <div className="container">
            <div className="banner-container">
                <div className="banner center">
                    <span><h1> Sprint Capacity Planner</h1></span>
                </div>
            </div>
            <div className="schedule-container">
                <div>
                    <div className="schedule-item">
                        <label>Start Date <input name="startDate" id="startDate" value={this.props.startDate}
                                                 type="date"
                                                 onChange={(e) => this.onChange(e)}/></label>
                    </div>
                    <div className="schedule-item">
                        <label>End Date <input name="endDate" id="endDate" type="date" value={this.props.endDate}
                                               onChange={(e) => this.onChange(e)}/></label>
                    </div>
                </div>
            </div>
            <div>
                {this.state.capacity}
            </div>

            {this.showTeamMemberSection()}
            {this.showFixedTasksSection()}
            <input type="button" value="Calculate Capacity" onClick={() => this.calculateCapacity()}/>

        </div>
    }

    showTeamMemberSection() {
        let fields = ["name", "productivity", "type", "leaves"];
        return <AddForm title="Team Member" fields={fields} members={this.props.members}
                        addMember={this.props.addMember}/>
    }

    showFixedTasksSection() {
        let fields = ["name", "estimates"];
        return <AddForm title="Fixed Tasks" fields={fields} members={this.props.fixedTasks}
                        addMember={this.props.addFixedTask}/>
    }

    calculateCapacity() {
        let teamData = this.props.getTeamData();
        console.log(teamData);
        let capacity = sprintCapacityCalculator(new Date(this.state.startDate), new Date(this.state.endDate), teamData).getCapacity();
        this.setState({capacity: capacity});

    }
}