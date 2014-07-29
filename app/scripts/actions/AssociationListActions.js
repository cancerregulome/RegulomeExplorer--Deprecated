var AppDispatcher = require('../dispatcher/AppDispatcher');
var AssociationListConstants = require('../constants/AssociationListConstants');

export class AssociationListActions {

  /**
   * @param  {string} text
   */
  create(assoc) {
    AppDispatcher.handleViewAction({
      actionType: AssociationListConstants.AL_INSERT_ASSOC,
      obj: assoc
    });
  },

  /**
   * @param  {string} id The ID of the Association List item
   * @param  {string} text
   */
  remove(id) {
    AppDispatcher.handleViewAction({
      actionType: AssociationListConstants.AL_REMOVE_ASSOC,
      id: id
    });
  },

   /**
   * Clear Association List
   * 
   */
  removeAll() {
        AppDispatcher.handleViewAction({
        actionType: AssociationListConstants.AL_REMOVE_ALL,
      });
  },

  /**
   * 
   * @param  {string} id
   * @param {object} assoc
   */
  update(id, assoc) {
    AppDispatcher.handleViewAction({
      actionType: AssociationListConstants.AL_UPDATE,
      id: id,
      obj: assoc
    });
  },

  /**
   * Copy object proeperties into all Associations
   */
  updateAll(assoc) {
    AppDispatcher.handleViewAction({
      actionType: AssociationListConstants.AL_UPDATE_ALL,
      obj: assoc
    });
  }

}