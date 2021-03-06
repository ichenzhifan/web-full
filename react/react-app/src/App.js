import React from 'react';
import './App.css';
import { Button } from 'antd';
import CommentList from './CommentList';
import { FilterComp } from './FilterComp';
// import Hello from './Hoc';
import Hello from './HocDecrator';

import {
  RadioGroup,
  Radio
} from './RadioComps';

import HookTest from './hook/HookUseState';
import HookUseReducer from './hook/HookUseReducer';
import HookUseContext from './hook/HookUseContext';
import FormTest from './components/FormTest';

function App() {
  return (
    <div className="App">
      {/* <Button className="primary" onClick={() => alert('ok')}>ok</Button>
      <CommentList />

      <RadioGroup name="mvvm">
        <Radio value="react" checked="checked">react</Radio>
        <Radio value="vue">vue</Radio>
        <Radio value="angular">angular</Radio>
      </RadioGroup> */}

      {/* 仅仅显示div标签. */}
      {/* <FilterComp tag="p">
        <div>this is div</div>
        <p>this is p</p>
      </FilterComp> */}

      {/* <Hello text="this is hoc"/> */}
      {/* <HookTest /> */}
      <FormTest />
    </div>
  );
}

export default App;
