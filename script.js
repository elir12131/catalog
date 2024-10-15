document.getElementById('addProductBtn').addEventListener('click', function() {
    const productContainer = document.getElementById('productContainer');
    const newProductField = document.createElement('div');
    newProductField.classList.add('productField');

    newProductField.innerHTML = `
        <label for="itemNumber">Item Number:</label>
        <input type="text" name="itemNumber[]" required>
        <label for="quantity">Quantity:</label>
        <input type="number" name="quantity[]" required min="1">
        <button type="button" class="removeProductBtn">Remove</button>
    `;

    productContainer.appendChild(newProductField);

    // Add event listener to remove the field
    newProductField.querySelector('.removeProductBtn').addEventListener('click', function() {
        productContainer.removeChild(newProductField);
    });
});
