
define([
    'jquery',
    'underscore',
    'backbone',
    'views/base',
    'templates'
], function ($, _, Backbone, BaseView, JST) {

    var ApplicationView = BaseView.extend({
        template: 'application.hbs',
    });

    return ApplicationView;
});