import * as React from "react";
import str from '../datamodel/string-utils';
import '../styles/form.css';

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
        return (
            <div className="form">

                <form className={"box"} onSubmit={(e) => this.onSubmit(e)} action="#">
                    <div className="title"><h3>{this.props.title}</h3></div>
                    {this.showFields()}
                    <div className="add-cancel">
                        <input type="submit" value="Add"/>
                        <input type="button" name="cancel" value="Cancel"
                               className={this.props.showCancel ? "hide" : "show"}
                               onClick={() => this.addMemberActionCancelled()}/>
                    </div>

                </form>
            </div>);
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
            return (
                <div className="input-field">
                    <div className="label">
                        <span>{str.capatilizeFirstLetter(name)} </span>
                    </div>
                    <div>
                        <input type="text" value={this.state[name]} name={name} onChange={(e) => this.onChange(e)}/>
                    </div>

                </div>);
        });
    }
}

export default AddMember;