
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

// Toggle menu and navbar on menu click
menu.onclick = () => {
    menu.classList.toggle('fa-times'); // Corrected typo: classLisstr → classList
    navbar.classList.toggle('active');
};

// Handle scroll events
window.onscroll = () => {
    // Remove menu icon and navbar active class on scroll
    menu.classList.remove('fa-times'); // Corrected typo: classLisstr → classList
    navbar.classList.remove('active'); // Corrected: remove → remove('active')

    // Show or hide scroll-to-top button based on scroll position
    if (window.scrollY > 40) {
        document.querySelector('#scroll-top').classList.add('active');
    } else {
        document.querySelector('#scroll-top').classList.remove('active');
    }
};

// Loader functionality
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
    setTimeout(loader, 3000); // Use setTimeout instead of setInterval for a one-time delay
}

// Trigger fadeOut on window load
window.onload = fadeOut;
// Array to store all orders
let allOrders = JSON.parse(localStorage.getItem('orders')) || [];

document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const order = {
        id: 'ORD-' + Date.now(),
        name: document.getElementById('customer-name').value,
        email: document.getElementById('customer-email').value,
        phone: document.getElementById('customer-phone').value,
        food: document.getElementById('food-items').value,
        address: document.getElementById('delivery-address').value,
        date: new Date().toLocaleString(),
        status: "Received"
    };
    
    // Save to array and localStorage
    allOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(allOrders));
    
    // Show confirmation and export button
    document.getElementById('order-form').style.display = 'none';
    document.getElementById('order-confirmation').style.display = 'block';
    document.getElementById('export-btn').style.display = 'inline-block';
    
    // Reset form
    this.reset();
});
const scriptURL = 'Your Google App Script URL'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Form is submitted" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
document.getElementById("submitBtn").addEventListener("click", async function() {
  const btn = this;
  const responseDiv = document.getElementById("responseMessage");
  btn.disabled = true;
  responseDiv.textContent = "Processing...";
  responseDiv.style.color = "blue";

  try {
    const formData = {
      name: document.querySelector('[name="name"]').value,
      phone: document.querySelector('[name="phone"]').value,
      email: document.querySelector('[name="email"]').value,
      food: document.querySelector('[name="food"]').value,
      address: document.querySelector('[name="address"]').value
    };

    // Replace with your deployed web app URL
    const scriptUrl = "https://script.google.com/macros/s/ABC123DEF456/exec";

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
      redirect: "follow"  // Important for Google Apps Script
    });

    // Handle redirect response from Google Apps Script
    const result = await response.text();
    let data;
    try {
      data = JSON.parse(result);
    } catch {
      // If response is HTML (redirect), try getting JSON from the page
      const jsonMatch = result.match(/{.*}/);
      if (jsonMatch) data = JSON.parse(jsonMatch[0]);
    }

    if (data && data.status === "success") {
      responseDiv.textContent = "✓ " + data.message;
      responseDiv.style.color = "green";

document.getElementById("orderForm").reset();
    } else {
      throw new Error(data?.message || "Unknown server response");
    }
  } catch (error) {
    responseDiv.textContent = "✗ Error: " + error.message;
    responseDiv.style.color = "red";
    console.error("Submission error:", error);
  } finally {
    btn.disabled = false;
  }
  const scriptURL = 'Your Google App Script URL'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Form is submitted" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
});

// Export functionality
document.getElementById('export-btn').addEventListener('click', exportToExcel);

function exportToExcel() {
    // Include SheetJS library
    const script = document.createElement('script');
    script.src = 'https://cdn.sheetjs.com/xlsx-0.19.3/package/dist/xlsx.full.min.js';
    script.onload = function() {
        // Convert orders to worksheet
        const ws = XLSX.utils.json_to_sheet(allOrders);
        
        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        
        // Export to Excel
        XLSX.writeFile(wb, "customer_orders.xlsx");
    };
    document.head.appendChild(script);
}