import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SprintCapacityPlanner from './sprint-capacity-planner/SprintCapacityPlanner';
import * as serviceWorker from './serviceWorker';

const members = [];
const fixedTasks = [];

ReactDOM.render(<SprintCapacityPlanner members={members} addMember={addMember}/>, document.getElementById('root'));

function addFixedTask(task) {
    fixedTasks.push(task);
    render();
}

function addMember(member) {
    members.push(member);
    render();
}

function render() {
    ReactDOM.render(<SprintCapacityPlanner getTeamData={getTeamData} addFixedTask={addFixedTask} fixedTasks={fixedTasks}
                                           members={members}
                                           addMember={addMember}/>, document.getElementById('root'));
}

function getTeamData() {
    let fixedTask = fixedTasks.map(t => t.estimates).reduce((a, b) => a + b, 0);
    return {
        members: members,
        publicHolidays: 0,
        fixedTasks: fixedTask
    };
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
