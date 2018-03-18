import React from 'react';

const TextInput = (props) => (
  <div className="TextInput">
    <input type="text" className="TextInput__input" value={props.value}
      onChange={(event) => props.onTextChange(event.target.value)} placeholder={props.label} />
  </div>
);

export default TextInput;