$(document).on("submit", "form", function(e) {
    e.preventDefault();
  
    var formData = new FormData($(this).get(0), $(e.originalEvent.submitter).get(0));
    $.ajax({
        type: "POST",
        url: window.location.pathname + window.location.search,
        xhrFields: {
            withCredentials: true
        },
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json"
    })
    .done(function(response) {
        if (response.redirect_uri) {
            var newURI = response.redirect_uri;
            if (response.flash_message) {
                newURI += `?flash=${encodeURIComponent(response.flash_message)}`;
            }
            window.location.href = newURI;
        } else {
            if (response.refresh_login) {
                $("#login-modal").load(window.location.href + " #login-modal > *");
                $("form").each(function() { // make sure all have id to reload CSRF token
                    $(this).load(window.location.href + ` #${$(this).attr("id")} > *`);
                });
                $("#login-modal").modal("show");
            }

            if (response.flash_message) {
                customFlash(response.flash_message);
            }
            
            if (response.submission_errors) { 
                errors = response.submission_errors;
                Object.keys(errors).forEach((field_name) => {
                    var field_elem = $(e.target).find(`#${field_name}-field`)
                    field_elem.find(`#${field_name}-input`).addClass("is-invalid");
                    field_elem.find(".invalid-feedback").text(errors[field_name][0]);
                });
            }
        }
    });
});
