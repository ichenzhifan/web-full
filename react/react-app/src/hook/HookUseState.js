import React, { memo, useState, useReducer, useEffect, useContext } from 'react';

const Good = memo(({ good, selectedGood }) => {
  console.log('xxx');

  return <div onClick={() => selectedGood(good)}>{good}</div>;
})

const HookTest = (props) => {
  const [good, setGood] = useState('');
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setGoods(['apple', 'peach']);
    }, 1000);
  }, []);

  console.log('yyy');
  

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