import * as React from "react";

class AddMember extends React.Component {
    constructor(props) {

        super(props);
        let state = {};
        props.fields.forEach((name) => state[name] = "");
        this.state = state;
    }

    onSubmit(e) {
        let newData = {};
        this.props.fields.forEach((name) => {
            newData[name] = this.state[name];
        });
        this.props.onSuccess(newData);
        e.preventDefault();
    }

    render() {
        return <div>

            <div>
                <form onSubmit={(e) => this.onSubmit(e)} action="#">
                    {this.showFields()}
                    <br/>
                    <input type="submit" value={"Add " + this.props.title}/>
                    <input type="button" value="Cancel" className={this.props.showCancel ? "hide" : "show"}
                           onClick={() => this.addMemberActionCancelled()}/>
                </form>

            </div>

        </div>
    }

    reset() {
        this.setState({name: "", productivity: "", type: "", leaves: ""});
    }

    addMemberActionCancelled() {
        this.reset();
        this.props.onCancel();
    }

    onChange(event) {
        let change = {};
        const targetName = event.target.name;
        change[targetName] = event.target.value;
        this.setState(change);
    }

    showFields() {
        return this.props.fields.map(name => {
            return <input type="text" value={this.state[name]} name={name} onChange={(e) => this.onChange(e)}/>
        });
    }
}

export default AddMember;