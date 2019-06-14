import React, { memo, useState, useReducer, useEffect, useContext } from 'react';

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
    <div>
      <h1>selected: {good}</h1>
      {
        goods.map(m => {
          return <Good good={m} selectedGood={setGood} />
        })
      }
    </div>
  );
}

export default HookTest;