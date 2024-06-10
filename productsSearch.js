fetch("http://localhost:8081/api/categories")
    .then(response => response.json())
    .then(categories => {
        const categoryDropdown = document.getElementById("categoryDropdown");
        categories.forEach(category => {
            const option = document.createElement("option");
            option.textContent = category.name;
            option.value = category.categoryId;
            categoryDropdown.appendChild(option);
        });
    });

function fetchAndDisplayProducts() {
    const searchType = document.querySelector('input[name="searchType"]:checked').id;
    const resultsDisplay = document.getElementById("resultsDisplay");

    if (searchType === "viewAll") {
        fetch("http://localhost:8081/api/products")
            .then(response => response.json())
            .then(products => displayProducts(products));
    } else if (searchType === "searchByCategory") {
        const categoryId = document.getElementById("categoryDropdown").value;
        if (categoryId !== "Select one...") {
            fetch(`http://localhost:8081/api/products/bycategory/${categoryId}`)
                .then(response => response.json())
                .then(products => displayProducts(products));
        }
    }
}

function displayProducts(products) {
    const resultsDisplay = document.getElementById("resultsDisplay");
    resultsDisplay.innerHTML = "";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
            <p>Product Name: ${product.productName}</p>
            <p>Price: $${product.unitPrice}</p>
            <a href="productDetails.html?productId=${product.productId}">See Details</a>
        `;
        resultsDisplay.appendChild(productDiv);
    });
}

document.querySelectorAll('input[name="searchType"]').forEach(input => {
    input.addEventListener("change", fetchAndDisplayProducts);
});

fetchAndDisplayProducts();
