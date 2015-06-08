"use strict";

ckan.module('resrelated', function ($, _) {
    return {
        initialize: function () {
            $.proxyAll(this, /_on/);
            this.el.on('click', this._onClick);
        },

        _onClick: function(event) {
            var editor = ace.edit("editor_div");
            this.options.gistdesc = $('#gist-description').val();
            if (this.options.gistdesc == ''){
                this.options.gistdesc = "title of resource-related gist";
                var outhtml = '<h3><font color="red">Fill in description field.</font></h3>';
                $('#ace_output').html(outhtml);
                $('#gist-description').focus();
                return;
            }
            var textgist = editor.getSession().getValue();
            $('#ace_output').html('<div id="loader"><img src="/loader.gif" alt="loading..."></div>');
            var apiurl   = 'https://github.cfpb.gov/api/v3/gists';
            
            this._postGIST(apiurl,textgist, function(json) {
                if (!("html_url" in json)){
                    $('#ace_output').html("<h2>github post failed</h2><br>",json);
                }else {
                    var user   = json.user;
                    if(user == null) { user = "anonymous user"; }
                    this.options.gistlink = json.html_url;
                    var outhtml = '<h3>Posted a <a href="'+json.html_url+'">gist</a></h3>'; 
                    $('#ace_output').html(''); //kill the loading gif
                    $('#ace_output').html(outhtml);
                    var option = $('<option></option>').attr("value", this.options.gistlink).text(this.options.gistdesc);
                    // append to list see listrelated.html for the id
                    // snl: code review the select should be in the template, not the snippet
                    // both javascript functions (list_related and this one)
                    // should append to the template
                    $('#gistselect').append(option); 
                    
                    
                    if (!this._snippetReceived) {
                        this.sandbox.client.getTemplate(this.options.html,
                                                        this.options,
                                                        null);
                        this._snippetReceived = true;
                    }
                } 
            });
        },

        _postGIST: function(apiurl, basecontent, callback) {
            var mythis=this; // code review?
            var description = mythis.options.gistdesc;
            var ext = $.parseJSON($('#gistType').val());
            ext = ext.ext;
            var fp= "file."+ext;
            var filedata = {"description": description, "public": true,
                            "files": {"file" : {"filename" : fp, "content": basecontent}}}; 
            $.ajax({
                type: 'POST',
                data: JSON.stringify(filedata),
                url: apiurl,
                complete: function(xhr) {
                    callback.call(mythis, xhr.responseJSON);
                }
            }).done(function(response) {
                console.log("GitHub response:");
                console.log(response);
            });
        }
                     
    };
    
});