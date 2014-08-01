import {
  AppDispatcher
}
from '../dispatcher/AppDispatcher';
import {
  ALConstants
}
from '../constants/AssociationListConstants';
module merge from 'react/lib/merge';

//FIXME: Cannot get browserify to transpile import of events or EventEmitter
// import {EventEmitter} from 'events'.EventEmitter;
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _associations = {}; // collection of AL items 
/**
 * Create a AL item.
 * @param  {string} text The content of the AL
 */

function create(association) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp in place of a real id.
  var id = Date.now();
  _associations[id] = {
    id: id,
    feature1: association.feature1 || {},
    feature2: association.feature2 || {},
    rho: association.rho || -Infinity,
    log10p: association.log10p || Infinity,
    correlation: association.correlation || null
  };
}

/**
 * Update a AL item.
 * @param  {string} id 
 * @param {object} updates An object literal containing only the data to be 
 *     updated.
 */

function update(id, updates) {
  _associations[id] = merge(_associations[id], updates);
}

/**
 * Update all of the AL items with the same object. 
 *     the data to be updated.  Used to mark all ALs as loaded.
 * @param  {object} updates An object literal containing only the data to be 
 *     updated.

 */

function updateAll(updates) {
  for (var id in _associations) {
    update(id, updates);
  }
}

/**
 * Delete a AL item.
 * @param  {string} id
 */

function remove(id) {
  delete _associations[id];
}

/**
 * Delete all the completed AL items.
 */

function removeAll() {
  for (var id in _associations) {
    remove(id);
  }
}

class ALStore extends EventEmitter {

  /**
   * Get the entire collection of ALs.
   * @return {object}
   */
  getAll() {
    return _associations;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

}

var ap = new AppDispatcher();

// Register to handle all updates
ap.register(function(payload) {
  var action = payload.action;
  var text;
  var obj;

  switch (action.actionType) {

  case ALConstants.AL_INSERT_ASSOC:
    obj = action.obj;
    if (obj !== null) {
      create(obj);
    }
    break;

  case ALConstants.AL_REMOVE_ASSOC:
    remove(action.id);
    break;

  case ALConstants.AL_REMOVE_ALL:
    removeAll();
    break;

  case ALConstants.AL_UPDATE:
    obj = action.obj;
    if (obj !== null) {
      updateAll(action.id, obj);
    }
    break;

  case ALConstants.AL_UPDATE_ALL:
    obj = action.obj;
    if (obj !== null) {
      updateAll(obj);
    }
    break;

  default:
    return true;
  }

  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here.  We need the default case,
  // however, to make sure this only gets called after one of the cases above.
  ALStore.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.
});

export {
  ALStore
};