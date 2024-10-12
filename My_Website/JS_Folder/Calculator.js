function calculateTip() {
    // Get values from the input fields
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const serviceQuality = parseFloat(document.getElementById('serviceQuality').value);

    // Validate input
    if (isNaN(billAmount) || isNaN(serviceQuality)) {
        document.getElementById('result').innerText = "Please enter valid numbers for both fields.";
        return;
    }

    // Calculate the tip
    const tipAmount = billAmount * (serviceQuality / 100);

    // Display the result on the webpage
    document.getElementById('result').innerText = `Tip Amount: $${tipAmount.toFixed(2)}`;
}
