import React from 'react';
import counter from './Counter.module.css';

function Counter({ amount }) {
  return (
    <>
      {amount > 0 ? (
        <div className={counter.circle}>
          <p className='text text_type_digits-default'>{amount}</p>
        </div>
      ) : null}
    </>
  );
}

export default Counter;
