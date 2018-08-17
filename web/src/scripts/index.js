import $ from 'jquery';

import '../styles/index.scss'; // webpackでコンパイルするため必須. 実際には.jsには展開されない.

$(document).ready(() => {
  window.console.log('hello!');
});
