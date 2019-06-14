import React, { Component } from 'react';
import EnhanceForm from './EnhanceForm';

@EnhanceForm
class FormTest extends Component {
  constructor(props) {
    super(props);

    this.submit = () => {
      this.props.validateFields((err, values) => {
        if(err){
          alert('验证失败')
        }else{
          alert('验证成功');
          console.log(values);          
        }
      });
    };
  }

  render() {
    const { getFieldDecorator } = this.props;
    return (
      <div>
        {
          getFieldDecorator('username', {
            rules:
              [{ required: true, message: 'username is required' }]
          })(<input type="text" />)
        }
        {
          getFieldDecorator('password', {
            rules:
              [{ required: true, message: 'password is required' }]
          })(<input type="password" />)
        }

        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}



export default FormTest;