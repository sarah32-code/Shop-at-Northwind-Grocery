function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("productId");
}

function fetchProductDetails(productId) {
    return fetch(`http://localhost:8081/api/products/${productId}`)
        .then(response => response.json());
}

function displayProductDetails(product) {
    const productDetailsDiv = document.getElementById("productDetails");
    productDetailsDiv.innerHTML = `
        <p>Product Name: ${product.productName}</p>
        <p>Price: $${product.unitPrice}</p>
        <p>Supplier: ${product.supplier}</p>
        <p>Units in Stock: ${product.unitsInStock}</p>
        <img src="${product.imageUrl}" alt="Product Image">
    `;
}

const productId = getProductIdFromUrl();
if (productId) {
    fetchProductDetails(productId)
        .then(product => displayProductDetails(product));
} else {
    window.location.href = "index.html";
}
