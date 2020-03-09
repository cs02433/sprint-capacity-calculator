import React from 'react';
import '../styles/team-member.css';
import '../styles/common.css';
import TeamData from "../team/TeamData";
import AddMember from "../team/AddMember";

export default class AddForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {addNewMember: true, addBtnClicked: false};
    }


    render() {
        return <div className="team-container">
            <TeamData fields={this.props.fields} members={this.props.members}/>
            {this.showAddMember()}
            <div className={this.showAddMemberBtn()}>
                <input type="button" value="Add New Member"
                       onClick={() => this.addClicked()}/>
            </div>
        </div>;

    }

    noMember() {
        return !this.props.members || this.props.members.length === 0;
    }

    showAddMember() {
        let show = this.state.addBtnClicked;
        const noMem = this.noMember();
        if (noMem) {
            show = true;
        }
        if (show) {
            return <div>
                <div>
                    <h3>{this.props.title}</h3>
                </div>
                <AddMember title={this.props.title} fields={this.props.fields} showCancel={this.noMember()}
                           onCancel={() => this.addMemberCancel()}
                           onSuccess={(member) => this.onSuccess(member)}/>
            </div>
        } else {
            return <div>

            </div>
        }

    }

    showAddMemberBtn() {
        if (this.noMember()) {
            return "add-new-member hide";
        }
        return this.state.addNewMember ? "add-new-member" : "add-new-member hide";
    }


    addMemberCancel() {
        this.setState({addBtnClicked: false, addNewMember: !this.state.addMember});
    }

    addClicked() {
        this.setState({addBtnClicked: !this.state.addBtnClicked, addNewMember: !this.state.addNewMember});
    }

    onSuccess(member) {
        this.setState({addBtnClicked: false, addNewMember: true});
        this.props.addMember(member);
    }
}