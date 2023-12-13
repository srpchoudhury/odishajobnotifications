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




 
// Function to get card data from the static cards on the page
function getCardData() {
    const cardsData = [];
    const cardElements = document.querySelectorAll('.card');

    cardElements.forEach(function (cardElement) {
        const title = cardElement.querySelector('h4').textContent;
        const description = cardElement.querySelector('p').textContent;
        const link = cardElement.querySelector('.badge.bg-info a').getAttribute('href');
        cardsData.push({ title, description, link });
    });

    return cardsData;
}

// Function to display cards based on search input
function displayCards(data) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = ''; // Clear existing cards

    // Filter cards based on search input
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchInput.trim() === "") {
        // If search input is empty, display all cards
        data.forEach(function (card) {
            const cardHtml = `
                <div class="col-md-4">
                    <div class="card p-2">
                        <div class="card-body">
                            <h4 style="color: blue;">${card.title}</h4>
                            <p style="color: green;">${card.description}</p>
                            <h5>
                                <span class="badge bg-dark">New ------- ></span>
                                <span class="badge bg-info"><a class="nav-link" href="${card.link}">View Details</a></span>
                            </h5>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.insertAdjacentHTML('beforeend', cardHtml);
        });
    } else {
        // If search input is not empty, filter and display matching cards
        const filteredData = data.filter(function (card) {
            return card.title.toLowerCase().includes(searchInput) || card.description.toLowerCase().includes(searchInput);
        });

        filteredData.forEach(function (card) {
            const cardHtml = `
                <div class="col-md-4">
                    <div class="card p-2">
                        <div class="card-body">
                            <h4 style="color: blue;">${card.title}</h4>
                            <p style="color: green;">${card.description}</p>
                            <h5>
                                <span class="badge bg-dark">New ------- ></span>
                                <span class="badge bg-info"><a class="nav-link" href="${card.link}">View Details</a></span>
                            </h5>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.insertAdjacentHTML('beforeend', cardHtml);
        });
    }
}

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', function () {
    displayCards(getCardData());
});
