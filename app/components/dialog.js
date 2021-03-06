import React from "react"
import components from "./mdlComponents"
import FlatButton from 'material-ui/FlatButton';
import Form from "./form"
import DialogStore from "./DialogStore"

var actions;

function DialogTemplate() {
  var currentView = this.props.currentView
  actions = [<FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.props.toggle} />];

  switch(currentView) {
    case 'Add':
      actions.push(<FlatButton
          label="Save"
          primary={true}
          type="submit"
          disabled={this.props.setBirdLocation.length === 0|| this.props.setBirdSpecies.length == 0 || this.props.setBirdQty == 0 || this.props.setBirdDate.length === 0}
          keyboardFocused={true}
          onTouchTap={this.props.saveBird} />)
      return <Form {...this.props} />

    case 'Profile':
    case 'About':
    case 'SignOut':
      actions.push( <FlatButton
          label="ok"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.props.toggle} />)
      return DialogStore[currentView].call(this)

    default:
      return ''
  }
}

var Dialog = React.createClass({
  render: function() {
    var currentView = DialogTemplate.call(this)
    return <components.Dialog {...this.props} actions={actions}> {currentView} </components.Dialog>
  }
})

module.exports = Dialog
