// this generates a warning about unsaved data from CKAN
// public/base/javascript/modules/basic-form.js
$(function() {
    function showResourceFields() {
        var resourceType = resourceEl.val().toLowerCase().replace(' ', '');
        $('.cfpb_extrafield').addClass('hidden');
        $('#cfpb_extrafields_' + resourceType).removeClass('hidden');
    }
    var resourceEl = $('#field-resource_type');
    if (resourceEl.length > 0) {
        showResourceFields();
    }
    $('#field-resource_type').on('change', showResourceFields);
});
