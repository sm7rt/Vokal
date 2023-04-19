import { configure } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.scss';

const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
