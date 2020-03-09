import * as React from "react";
import '../styles/common.css';

class TeamData extends React.Component {

    render() {

        return <div className={this.showAddMember()}>

            <table border="2">
                <tr>
                    {this.showColumnHeader()}
                </tr>
                {this.showMembers()}

            </table>

        </div>

    }

    showAddMember() {
        const noMember = !this.props.members || this.props.members.length === 0;

        if (noMember) {
            return "hide";
        } else {
            return "show";
        }
    }

    showMembers() {
        if (this.props.members) {
            return this.props.members.map((member) => this.createRow(member));
        }
    }

    createRow(member) {
        return <tr>
            {this.createColumn(member)}
        </tr>;
    }

    createColumn(member) {
        if (this.props.members) {
            return this.props.fields.map(name => {
                return <td>{member[name]}</td>;
            });
        }
    }

    showColumnHeader() {
        if (this.props.members) {
            return this.props.fields.map(name => {
                return <th>{name}</th>;
            });
        }
    }
}

export default TeamData;