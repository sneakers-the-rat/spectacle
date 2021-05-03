function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import zone from 'mdast-zone';
import unistVisit from 'unist-util-visit';
import * as mdast from 'mdast-builder';
export default function remarkRehypePresenterNotes(noteCallback) {
  function transformZoneNote(start, nodes) {
    noteCallback.apply(void 0, _toConsumableArray(nodes));
    return [];
  }

  function transformLineNote(node, index, parent) {
    if (node.children.length === 0) return;
    if (node.children[0].type !== 'text') return;
    var text = node.children[0];
    var match = /^Notes: (.*)$/.exec(text.value);
    if (!match) return;
    noteCallback(mdast.paragraph(mdast.text(match[1])));
    parent.children.splice(index, 1);
  }

  return function (tree) {
    zone(tree, 'notes', transformZoneNote);
    unistVisit(tree, 'paragraph', transformLineNote);
  };
}