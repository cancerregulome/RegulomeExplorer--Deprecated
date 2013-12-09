define([
    'jquery',
    'underscore',
    'backbone',
    'views/base'
], function($, _, Backbone, BaseView) {

    var CloudStorageView = BaseView.extend({
        //the template file is defined relative to the path /app/scripts/templates
        // see main.js to modify this configuration
        template: 'topbar/modals_cloud_storage.hbs',
        events: {
            "click .gdrive-import": "browse_gdrive_load_item",
            "click .gdrive-snapshot": "take_snapshot_save_to_gdrive",
            "click .gdrive-export": "select_file_save_to_gdrive",
            "click .gdrive-session": "save_session_to_gdrive"
        },

        initialize: function(options) {
            _.extend(this, options);
            _.bindAll(this, "browse_gdrive_load_item", "take_snapshot_save_to_gdrive", "select_file_save_to_gdrive", "save_session_to_gdrive");

            // $(".gdrive-import").click(this.browse_gdrive_load_item);
            // $(".gdrive-snapshot").click(this.take_snapshot_save_to_gdrive);
            // $(".gdrive-export").click(this.select_file_save_to_gdrive);
            // $(".gdrive-session").click(this.save_session_to_gdrive);
        },

        browse_gdrive_load_item: function() {
            $(".gdrive-browse-modal").modal("show");
        },

        take_snapshot_save_to_gdrive: function() {
            $(".gdrive-snapshot-modal").modal("show");
        },

        select_file_save_to_gdrive: function() {
            $(".gdrive-export-modal").modal("show");
        },

        save_session_to_gdrive: function() {
            $(".gdrive-session-modal").modal("show");
        }

    });

    return CloudStorageView;
});