import React from 'react';
import counter from './Counter.module.css';

type TCount = { amount: number };

function Counter({ amount }: TCount) {
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
