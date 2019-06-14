import React, { memo, useState, useReducer, useEffect, useContext } from 'react';

const Context = React.createContext();

const goodReducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return action.payload;
    case 'add':
      return [...state, action.payload];
    default:
      return state;
  }
};

const Good = memo(({ good, selectedGood }) => {
  return <div onClick={() => selectedGood(good)}>{good}</div>;
})

const GoodAdd = props => {
  const [value, setValue] = useState('');
  const { dispatch } = useContext(Context);
  
  const onEnter = e => {
    if (e.key === 'Enter') {
      dispatch({
        type: 'add',
        payload: e.target.value
      })

      setValue('');
    }
  };

  return <div>
    <input value={value} onInput={e => setValue(e.target.value)} onKeyDown={onEnter} />
  </div>
};

const HookTest = (props) => {
  const [good, setGood] = useState('');
  const [goods, dispatch] = useReducer(goodReducer, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: 'init',
        payload: ['apple', 'peach']
      });
    }, 1000);
  }, []);

  return (
    <Context.Provider value={{ dispatch }}>
      <h1>selected: {good}</h1>
      <GoodAdd />
      {
        goods.map(m => {
          return <Good good={m} selectedGood={setGood} />
        })
      }
    </Context.Provider>
  );
}

export default HookTest;