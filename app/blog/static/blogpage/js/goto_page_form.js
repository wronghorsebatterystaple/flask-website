$(document).ready(function() {
    $("#goto-page-form").on("submit", function(e) {
        e.preventDefault();

        // non-state-changing GET shouldn't need CSRF protection
        let pageNum = parseInt($("#goto-page-form__input--page").val(), 10);
        if (isNaN(pageNum) || pageNum <= 0 || pageNum > TOTAL_PAGES) {
            customFlash("oh no you have broken my website");
            return;
        }

        window.location.href = window.location.pathname + `?page=${pageNum}`;
    });
});
