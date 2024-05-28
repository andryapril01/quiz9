document.addEventListener("DOMContentLoaded", () => {
  const addItemButton = document.getElementById("add-item");
  const itemNameInput = document.getElementById("item-name");
  const itemPriceInput = document.getElementById("item-price");
  const itemList = document.querySelector("#item-list tbody");
  const totalPriceElement = document.getElementById("total-price");
  const payNowButton = document.getElementById("pay-now");

  let total = 0;

  addItemButton.addEventListener("click", () => {
    const itemName = itemNameInput.value;
    const itemPrice = parseFloat(itemPriceInput.value);

    if (itemName === "" || isNaN(itemPrice)) {
      alert("Please enter valid item name and price.");
      return;
    }

    const newRow = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = itemName;

    const priceCell = document.createElement("td");
    priceCell.textContent = itemPrice.toFixed(2);

    const actionsCell = document.createElement("td");
    actionsCell.className = "actions";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.addEventListener("click", () => {
      const newPrice = prompt("Enter new price:", itemPrice);
      if (newPrice !== null && !isNaN(parseFloat(newPrice))) {
        const diff = parseFloat(newPrice) - itemPrice;
        total += diff;
        itemPrice = parseFloat(newPrice);
        priceCell.textContent = itemPrice.toFixed(2);
        updateTotalPrice();
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => {
      total -= itemPrice;
      itemList.removeChild(newRow);
      updateTotalPrice();
    });

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    newRow.appendChild(nameCell);
    newRow.appendChild(priceCell);
    newRow.appendChild(actionsCell);

    itemList.appendChild(newRow);

    total += itemPrice;
    updateTotalPrice();

    itemNameInput.value = "";
    itemPriceInput.value = "";
  });

  payNowButton.addEventListener("click", () => {
    alert(`Total amount paid: $${total.toFixed()}`);
    itemList.innerHTML = "";
    total = 0;
    updateTotalPrice();
  });

  function updateTotalPrice() {
    totalPriceElement.textContent = total.toFixed();
  }
});
