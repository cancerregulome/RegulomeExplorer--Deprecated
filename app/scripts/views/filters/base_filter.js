define([
'jquery',
'underscore',
'backbone',
'views/base'
], function($, _, Backbone, BaseView) {
'use strict';

var FilterView = BaseView.extend({

    template: 'filters/base_filter.hbs',

    initialize: function(options) {
        _.bindAll(this, 'showError', 'showWarning');
    },
        

    showError: function(text) {
        this.$el('.filter-console').html(text);
    },

    showWarning: function(text) {
        this.$el('.filter-console').html(text);
    }

});

return FilterView;
});