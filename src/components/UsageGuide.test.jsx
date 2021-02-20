import React from 'react';
import ReactDOM from 'react-dom';
import UsageGuide from './UsageGuide';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UsageGuide />, div);
  ReactDOM.unmountComponentAtNode(div);
});
