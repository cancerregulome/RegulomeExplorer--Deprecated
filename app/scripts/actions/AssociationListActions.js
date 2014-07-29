var AppDispatcher = require('../dispatcher/AppDispatcher');
var AssociationListConstants = require('../constants/AssociationListConstants');

export class AssociationListActions {

  /**
   * @param  {string} text
   */
  create(text) {
    AppDispatcher.handleViewAction({
      actionType: AssociationListConstants.AL_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText(id, text) {
    AppDispatcher.handleViewAction({
      actionType: AssociationListConstants.AL_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete(todo) {
    var id = todo.id;
    if (todo.complete) {
      AppDispatcher.handleViewAction({
        actionType: AssociationListConstants.AL_UNDO_COMPLETE,
        id: id
      });
    } else {
      AppDispatcher.handleViewAction({
        actionType: AssociationListConstants.AL_COMPLETE,
        id: id
      });
    }
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll() {
    AppDispatcher.handleViewAction({
      actionType: AssociationListConstants.AL_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy(id) {
    AppDispatcher.handleViewAction({
      actionType: AssociationListConstants.AL_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted() {
    AppDispatcher.handleViewAction({
      actionType: AssociationListConstants.AL_DESTROY_COMPLETED
    });
  }

}