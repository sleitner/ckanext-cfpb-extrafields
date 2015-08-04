// this generates a warning about unsaved data from CKAN
// public/base/javascript/modules/basic-form.js
$(function() {
    $('#resource-switcher a').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      var type = $(this).attr('href').replace('#', '');
      $('#field-resource_type').val(type);
      $('#resource_save').trigger('click');
    });
});
