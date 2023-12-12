document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var sidebarToggle = document.getElementById('sidebarToggle');

    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');
    });

    // Add an event listener to the document to hide the sidebar when clicking outside of it
    document.addEventListener('click', function (event) {
        var isClickInsideSidebar = sidebar.contains(event.target);
        var isClickOnToggle = sidebarToggle.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnToggle) {
            sidebar.classList.remove('active');
        }
    });

    // Prevent clicks on the sidebar from closing it
    sidebar.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});