import React, { Component, useState } from 'react';

export default BaseComponent => {
  return class EForm extends Component {
    constructor(props) {
      super(props);

      this.fields = {};
      this.options = {};
      this.state = {};

      this.getFieldDecorator = this.getFieldDecorator.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.validateField = this.validateField.bind(this);
      this.validateFields = this.validateFields.bind(this);
    }

    validateField(field) {
      const rules = this.options[field].rules;
      console.log(rules);
      
      // some里面任何一项不通过就返回true跳出，取反表示校验失败
      const isValid = !rules.some(rule => {
        if (rule.required) {
          if (!this.state[field]) {
            //校验失败
            this.setState({
              [field + "Message"]: rule.message
            });
            return true;
          }
        }

        return false;
      });

      if (isValid) {
        this.setState({
          [field + "Message"]: ""
        });
      }

      return isValid;
    }

    validateFields(cb) {
      const rets = Object.keys(this.options).map(field =>
        this.validateField(field)
      );
      const ret = rets.every(v => v === true);
      cb(ret, this.state);
    }

    handleChange(e) {
      const { name, value } = e.target;
      
      this.setState({
        [name]: value
      }, () => {
        this.validateField(name);
      });
    }

    getFieldDecorator(field, opt) {
      this.fields[field] = field;
      this.options[field] = opt;

      return Comp => {
        return React.cloneElement(Comp, {
          name: field,
          value: this.state[field] || '',
          onChange: this.handleChange
        })
      }
    }

    render() {
      return <BaseComponent
        {...this.props}
        getFieldDecorator={this.getFieldDecorator}
        validateFields={this.validateFields}
      />
    }
  }
};