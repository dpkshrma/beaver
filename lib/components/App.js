'use babel';

import React from 'react';

const App = props => {
  const { id, text } = props;
  console.log()
  return (
    <div id={id}>
      Super {text}
    </div>
  );
};

export default App;
