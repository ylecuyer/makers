/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from 'react';
import ReactDOM from 'react-dom';
import Popper from 'popper.js';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import request from 'superagent'


function emojiSupported() {
  var pixelRatio = window.devicePixelRatio || 1;
  var offset = 12 * pixelRatio;
  var node = document.createElement('canvas');
  var ctx = node.getContext('2d');
  ctx.fillStyle = '#f00';
  ctx.textBaseline = 'top';
  ctx.font = '32px Arial';
  ctx.fillText('\ud83d\udc28', 0, 0); // U+1F428 KOALA
  return ctx.getImageData(offset, offset, 1, 1).data[0] !== 0;
}

import onClickOutside from 'react-onclickoutside';

function saveReaction(emoji, todo_id) {
  request
  .post('/todos/'+todo_id+'/reaction')
  .send({ emoji: emoji, todo: todo_id, authenticity_token: document.querySelector('meta[name="csrf-token"]')['content']})
  .end((err, res) => {
    // Calling the end function will send the request
    location.reload()
  });

}

class MyPicker extends Picker {
  handleClickOutside(evt) {
    var picker = document.getElementById('picker')
    ReactDOM.unmountComponentAtNode(picker)
  }
}

var EnhancedPicker = onClickOutside(MyPicker);

document.addEventListener("turbolinks:load", function(event) {

  if (!emojiSupported()) {
    twemoji.parse(document.body);
  }

  var add_reaction_btns = document.querySelectorAll('.add-reaction')
  var picker = document.getElementById('picker')

  var emojiclicked = function(elt) {
    return function(emoji, event) {
      saveReaction(emoji.native, elt.dataset['todoId'])
    }
  }

  add_reaction_btns.forEach(function(elt) {
    elt.addEventListener("click", function(){
      ReactDOM.render(
        React.createElement(EnhancedPicker, { onClick: emojiclicked(elt) }, null),
        picker
      );

      new Popper(elt, picker, {
        placement: 'right'
      });
    });
  });

  document.querySelectorAll('.reaction .emoji').forEach(function(elt) {
    elt.addEventListener("click", function() {
      var emoji = elt.dataset['emoji']
      var todo_id = elt.dataset['todoId']
      saveReaction(emoji, todo_id)
    })
  });
});

