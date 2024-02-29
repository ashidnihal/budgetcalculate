function register(){
   
    const user={
        name:username.value,
        email:email.value,
        pass:Password.value,
        balance:0
    }

    if(user.name==""||user.email==""||user.pass==""){
        alert("Please fill the form")
    }else{
        if(user.email in localStorage){
            alert('Already exist')
        }else{
            localStorage.setItem(user.name,JSON.stringify(user))
            alert("Account Created")
            window.location.href = "./signin.html";
           
        }
    }
    
}

function login(){


    let uname= username1.value
    console.log(uname);
    let passw=password1.value
    console.log(passw);
    storedvalue=JSON.parse(localStorage.getItem(uname))
    console.log(storedvalue);
    if(uname in localStorage){
        if(passw===storedvalue.pass){
            alert("logged successfully")
            window.location="./home.html?name="+uname
            
            
        }else{
            alert("Incorrect password")
        }
    }
    else{
        alert("account not found")
    }
    
}

const urlParams = new URLSearchParams(window.location.search);
const acno = urlParams.get('name');
console.log(acno);
const accname = JSON.parse(localStorage.getItem(acno))
console.log(accname);
welcome.innerHTML=`Welcome ${accname.name}`



  




function addamount() {
    const incometyp = document.getElementById('incomeval').value;
    const incomeamn = document.getElementById('amountval').value;

    if (!incometyp || !incomeamn) {
        alert("Please fill in all the required fields.");
        return;
    }

    const key = `income-${accname.name}`;
    let existingArray = JSON.parse(localStorage.getItem(key)) || [];

    const userIncome = {
        amountIn: parseFloat(incomeamn), // Convert to float if needed
        amountTyp: incometyp,
        date: new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })

    };

    existingArray.push(userIncome);
    localStorage.setItem(key, JSON.stringify(existingArray));

    alert("Income added successfully.");
    incomeval.value="";
    amountval.value="";

    // Calculate and display total amount
    calculateAndDisplayTotalAmount();
    viewmore()
    updateBalance();
}

function calculateAndDisplayTotalAmount() {
    const incometyp = document.getElementById('incomeval').value;
    const key = `income-${accname.name}`;
    let existingArray = JSON.parse(localStorage.getItem(key)) || [];

    // Calculate the sum of amountIn values
    const totalAmount = existingArray.reduce((sum, entry) => sum + entry.amountIn, 0);

    // Display the total amount in the HTML element
    // document.getElementById('totalIncome').innerHTML = `$${totalAmount}`;
}





function remamount() {
    const expensetyp = document.getElementById('expenseval').value;
    const expenseamn = document.getElementById('expenseamt').value;

    if (!expensetyp || !expenseamn) {
        alert("Please fill in all the required fields.");
        return;
    }

    const key = `expense-${accname.name}`;
    let existingArray = JSON.parse(localStorage.getItem(key)) || [];

    // Ensure that existingArray is an array
    if (!Array.isArray(existingArray)) {
        existingArray = [];
    }

    const userwithdraw = {
        amountwth: parseFloat(expenseamn),
        expenseTyp: expensetyp,
        date: new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    existingArray.push(userwithdraw);
    localStorage.setItem(key, JSON.stringify(existingArray));

    alert("Submitted.");
    // Clear the input values
    document.getElementById('expenseval').value = "";
    document.getElementById('expenseamt').value = "";
    viewmore()
    // Calculate and display total expense
    calculateAndDisplayTotalExpense();
    updateBalance();
}
function calculateAndDisplayTotalExpense() {
    const expensetyp = document.getElementById('expenseval').value;
    const key = `expense-${accname.name}`;
    let existingArray = JSON.parse(localStorage.getItem(key)) || [];

    // Calculate the sum of amountwth values for all entries
    const totalExpense = existingArray.reduce((sum, entry) => sum + entry.amountwth, 0);

    // Display the total expense in the HTML element
    document.getElementById('totalExpenseDisplay').innerHTML = `<h5 class="mt-5 pb-5 text-light">$${totalExpense}</h5>`;
}



function updateBalance() {
    const incomeKey = `income-${accname.name}`;
    const expenseKey = `expense-${accname.name}`;

    // Retrieve income and expense arrays
    const incomeArray = JSON.parse(localStorage.getItem(incomeKey)) || [];
    const expenseArray = JSON.parse(localStorage.getItem(expenseKey)) || [];

    // Calculate the balance
    const totalIncome = incomeArray.reduce((sum, entry) => sum + entry.amountIn, 0);
    const totalExpense = expenseArray.reduce((sum, entry) => sum + entry.amountwth, 0);
    const balance = totalIncome - totalExpense;

    // Display the balance in the HTML element
    document.getElementById('totalIncome').innerHTML = `<h5 class="mt-5 pb-5 text-light">$${balance}</h5>`;
}

function cleardata(){
    localStorage.removeItem(`income-${accname.name}`)
    localStorage.removeItem(`expense-${accname.name}`)
    alert("cleared")
    document.getElementById('totalIncome').innerHTML = `<h5 class="mt-5 pb-5 text-light">$0</h5>`;
    document.getElementById('totalExpenseDisplay').innerHTML = `<h5 class="mt-5 pb-5 text-light">$0</h5>`;

    
}
function viewlesss(){
    viewit.innerHTML = ""
}

function viewLess() {
    less.innerHTML = `<p class="" onclick="viewmore()">View More</p>`;
    viewit.innerHTML = ``; // Clear the content of the viewit div
    viewit.style.display = 'none'; // Hide the viewit div
}
function viewmore() {
    const keyIncome = `income-${accname.name}`;
    const keyExpense = `expense-${accname.name}`;

    const dataIncome = JSON.parse(localStorage.getItem(keyIncome)) || [];
    const dataExpense = JSON.parse(localStorage.getItem(keyExpense)) || [];

    less.innerHTML = `<p class="" onclick="viewLess()">viewless</p>`;

    viewit.innerHTML = `
    <div id="pdf" class="container">
   
    <div>
    
        <h1 class="text-center">Income & Expense Details</h1>
    </div>
    <div class="row">
        <div class="col-lg-5 col-md-6 ms-md-5">
            <h1 class="text-center mt-3 pb-2">Income</h1>
            <table class="table table-striped ms-md-5">
                <thead>
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    ${dataIncome.map(entry => `
                        <tr>
                            <td>${entry.amountTyp}</td>
                            <td class="text-success">+${entry.amountIn}</td>
                            <td>${calculateBalance(entry.amountIn)}</td>
                            <td>${entry.date}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div class="col-lg-5 col-md-6 ms-md-5">
            <h1 class="text-center mt-3 pb-2">Expense</h1>
            <table class="table table-striped ms-md-5">
                <thead>
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    ${dataExpense.map(entry => `
                        <tr>
                            <td>${entry.expenseTyp}</td>
                            <td class="text-danger">-${entry.amountwth}</td>
                            <td>${calculateBalance(-entry.amountwth)}</td>
                            <td>${entry.date}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
    <div class="text-center mt-5 ms-md-5">
        <canvas id="expenseChart" width="400" height="400"></canvas>
    </div>
    
</div>
<button class="btn btn-primary mt-3 ms-5 mb-5" onclick="downloadPDF()">Download</button>
    `;
    
    updatePieChart(dataExpense);
    adjustChartSize();
    
}

function calculateBalance(amount) {
    // Implement your balance calculation logic here
    // This is just a placeholder
    return amount * 2;
}

function updatePieChart(dataExpense) {
    const expenseLabels = dataExpense.map(entry => entry.expenseTyp);
    const expenseAmounts = dataExpense.map(entry => entry.amountwth);

    const ctx = document.getElementById('expenseChart').getContext('2d');

    // Create pie chart with reduced dimensions
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: expenseLabels,
            datasets: [{
                data: expenseAmounts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0', '#FF5722'],
            }],
        },
        options: {
            title: {
                display: true,
                text: 'Expense Distribution',
                fontSize: 12, // Adjust font size if needed
            },
            responsive: false, // Disable responsiveness
            maintainAspectRatio: false, // Disable aspect ratio
        },
    });
    const canvasContainer = document.getElementById('expenseChart').parentElement;
    const canvasElement = document.getElementById('expenseChart');

    const containerWidth = canvasContainer.clientWidth;
    const canvasWidth = canvasElement.width;

    const marginLeft = (containerWidth - canvasWidth) / 2;
    canvasElement.style.marginLeft = `${marginLeft}px`;
}

// function downloadPDF() {
 
//     // window.print();
//     const element = document.getElementById('pdf');
//     html2pdf(element)
// }


function downloadPDF() {
    const pdfContent = document.getElementById('pdf');

    // Use html2canvas to capture the content as an image
    html2canvas(pdfContent).then((canvas) => {
        // Convert the canvas to a data URL
        const imgData = canvas.toDataURL('image/png');

        // Create a new jsPDF instance
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Add the captured image to the PDF
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

        // Save or open the PDF
        pdf.save('document.pdf');
    });
}


function adjustChartSize() {
    const expenseChart = document.getElementById('expenseChart');
    const mediaQuery = window.matchMedia('(max-width: 576px)');

    if (mediaQuery.matches) {
        // Apply styles for smaller screens
        expenseChart.style.width = '250px';
        expenseChart.style.height = '250px';
        expenseChart.style.marginLeft = '35px';  // Adjust this value as needed
    } else {
        // Apply styles for larger screens
        expenseChart.style.width = '400px';  // Adjust this value as needed
        expenseChart.style.height = '400px';  // Adjust this value as needed
        expenseChart.style.marginLeft = '386px';  // Adjust this value as needed
    }
}

// Call adjustChartSize on window load and resize
window.addEventListener('load', adjustChartSize);
window.addEventListener('resize', adjustChartSize);





function logout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    
    if (confirmLogout) {
        // Remove user-related data from localStorage
        localStorage.removeItem('unameKey');

        // Redirect to the login page
        window.location.href = './index.html';
    }
}


















   // const element = document.getElementById('viewit');

    // // Apply additional styles for print layout
    // element.style.width = '100%';
    // element.style.maxWidth = '800px'; // Adjust maximum width as needed
    // element.style.margin = 'auto';
    // element.style.padding = '20px';

    // html2pdf(element);4





























// function remamount(){
//     const userwithdraw={
//         amountwth: expenseamt.value,
//         expenseTyp: expenseval.value,
//         date: new Date()
//     }
//     localStorage.setItem(`expense-${accname.name}`,JSON.stringify(userwithdraw))
//     alert("amount withdraw")
// }


// localStorage.removeItem("nimafathima");



















// function remamount(){
//     const expensetyp = document.getElementById('expenseval').value;
//     const expenseamn = document.getElementById('expenseamt').value;

//     if (!expensetyp || !expenseamn) {
//         alert("Please fill in all the required fields.");
//         return;
//     }

//     const key = `expense-${accname.name}`;
//     let existingArray = JSON.parse(localStorage.getItem(key)) || [];
    
//     const userwithdraw = {
//         amountwth: parseFloat(expenseamn),
//         expenseTyp: expensetyp,
//         date: new Date().toISOString()
//     };

//     existingArray.push(userwithdraw);
//     localStorage.setItem(key, JSON.stringify(existingArray));

//     alert("Submitted.");

//     // Calculate and display total expense
//     calculateAndDisplayTotalExpense();
// }

// function calculateAndDisplayTotalExpense() {
//     const expensetyp = document.getElementById('expenseval').value;
//     const key = `expense-${accname.name}`;
//     let existingArray = JSON.parse(localStorage.getItem(key)) || [];

//     // Calculate the sum of amountwth values
//     const totalExpense = existingArray
//         .filter(entry => entry.expenseTyp === expensetyp)
//         .reduce((sum, entry) => sum + entry.amountwth, 0);

//     // Display the total expense in the HTML element
//     document.getElementById('totalExpenseDisplay').innerHTML = `Total Expense (${expensetyp}): ${totalExpense}`;
// }