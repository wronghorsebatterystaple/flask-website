function showAuthElems() {
    $(".auth-false").attr("hidden", "");
    $(".auth-true").removeAttr("hidden");
}

function hideAuthElems() {
    $(".auth-true").attr("hidden", "");
    $(".auth-false").removeAttr("hidden");
}

$(document).ready(function() {
    const loginModal_elem = $("#login-modal");
    // Security - wipe contents on hide
    loginModal_elem.on("hidden.bs.modal", function(e) {
        $(e.target).find("#password-input").val("");
    });

    loginModal_elem.on("shown.bs.modal", function(e) {
        $(e.target).find("#password-input").focus();
    });

    // Differentiate modal vs. non-modal logins for redirect
    loginModal_elem.find("#is_modal").val("yes");

    $("#login-form-modal").on("submit", async function(e) {
        e.preventDefault();

        var formData = new FormData(e.target, e.originalEvent.submitter);
        const responseJSON = await fetchWrapper(URL_POST_ABS_LOGIN, {
            method: "POST",
            body: formData
        });

        processStandardAjaxResponse(responseJSON, e);
        if (responseJSON.success) {
            showAuthElems();
            $("#login-modal").modal("hide");
        }
    });

    $("#logout-link").on("click", async function(e) {
        e.preventDefault();

        const responseJSON = await fetchWrapper(URL_POST_ABS_LOGOUT, {
            method: "GET"
        }, {
            previous: window.location.hostname + window.location.pathname
        });

        processStandardAjaxResponse(responseJSON, e);
        if (!responseJSON.redirect_url_abs) {
            hideAuthElems();
        }
    });

    $("#login-modal").on("show.bs.modal", function(e) {
        if (window.location.href.startsWith(URL_GET_ABS_LOGIN)) {
            e.preventDefault();
            customFlash("You're already on the login page, you doofus.");
        }
    });
});
