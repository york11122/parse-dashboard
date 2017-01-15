/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import Field     from 'components/Field/Field.react';
import Label     from 'components/Label/Label.react';
import Modal     from 'components/Modal/Modal.react';
import React     from 'react';
import TextInput from 'components/TextInput/TextInput.react';

export default class GetAccountDialog extends React.Component {
  constructor() {
    super();

    this.state = {
      confirmation: ''
    };
  }

  valid() {
    if (this.state.confirmation === this.props.className) {
      return true;
    }
    if (!this.props.selection['*'] && Object.keys(this.props.selection).length < 10) {
      return true;
    }
    return false;
  }

  render() {
    let content = null;
    let selectionLength = Object.keys(this.props.selection).length;
    if (this.props.selection['*'] || selectionLength >= 10) {
      content = (
        <Field
          label={
            <Label
              text='Confirm this action'
              description='Enter the current class name to continue.' />
          }
          input={
            <TextInput
              placeholder='Current class name'
              value={this.state.confirmation}
              onChange={(confirmation) => this.setState({ confirmation })} />
          } />
      );
    }
    const deleteText = this.props.relation ? 'Detach' : '引繼';
    return (
      <Modal
        type={selectionLength === 1 ? Modal.Types.INFO :Modal.Types.DANGER}
        icon='warn-outline'
        title={this.props.selection['*'] ? `${deleteText} all rows?` : (selectionLength === 1 ? `${deleteText} 這筆資料?` : `一次只能引繼一筆`)}
        subtitle={this.props.relation ? 'You need to delete origin record. This is a reference.' : '請稍後至Jobs/Job Status查看'}
        disabled={!this.valid()}
        confirmText={selectionLength === 1 ? `Yes, ${this.props.relation ? 'detach' : '發佈'}` : '大於一筆(取消)'}
        cancelText={'Never mind, don\u2019t.'}
        onCancel={this.props.onCancel}
        onConfirm={selectionLength === 1 ? this.props.onConfirm : this.props.onCancel}>
        {content}
      </Modal>
    );
  }
}
