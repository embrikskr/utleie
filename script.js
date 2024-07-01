document.getElementById('calculateButton').addEventListener('click', calculateLoan);

function calculateLoan() {
    // Hent verdier fra skjemaet
    let housingPrice = parseFloat(document.getElementById('housingPrice').value);
    let monthlyFee = parseFloat(document.getElementById('monthlyFee').value);
    let electricity = parseFloat(document.getElementById('electricity').value);
    let municipalFees = parseFloat(document.getElementById('municipalFees').value) / 12;
    let internet = parseFloat(document.getElementById('internet').value);
    let insurance = parseFloat(document.getElementById('insurance').value);
    let rentalCosts = parseFloat(document.getElementById('rentalCosts').value);
    let maintenanceCosts = parseFloat(document.getElementById('maintenanceCosts').value) / 12;
    let interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    let loanTerm = parseFloat(document.getElementById('loanTerm').value) * 12;
    let income = parseFloat(document.getElementById('income').value);

    // Beregn månedlig boliglånsbetaling ved bruk av annuitetslånformelen
    let monthlyPayment = (housingPrice * interestRate) / (1 - Math.pow(1 + interestRate, -loanTerm));

    // Totale månedlige utgifter før avdrag
    let totalMonthlyCostBeforeLoan = income - (monthlyFee + electricity + municipalFees + internet + insurance + rentalCosts + maintenanceCosts + (housingPrice*interestRate));

    // Beregn skattefradrag
    let taxDeduction = totalMonthlyCostBeforeLoan * 0.22;

    // Totale månedlige utgifter etter skatt
    let totalMonthlyCostAfterTax = monthlyPayment + monthlyFee + electricity + municipalFees + internet + insurance + rentalCosts + maintenanceCosts  + taxDeduction;

    // Beregn månedlig cashflow
    let cashflow = income - totalMonthlyCostAfterTax;

    // Funksjon for å formatere tall med tusenskiller
    function formatNumber(num) {
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Beregn boligverdi etter 3, 5 og 10 år
    function futureValue(presentValue, rate, years) {
        return presentValue * Math.pow(1 + rate, years);
    }

    let value3Years = futureValue(housingPrice, 0.03, 3);
    let value5Years = futureValue(housingPrice, 0.03, 5);
    let value10Years = futureValue(housingPrice, 0.03, 10);

    // Oppdater tabellen med resultatene
    document.getElementById('monthlyPaymentCell').textContent = formatNumber(monthlyPayment);
    document.getElementById('totalMonthlyCostBeforeLoanCell').textContent = formatNumber(totalMonthlyCostBeforeLoan);
    document.getElementById('taxDeductionCell').textContent = formatNumber(taxDeduction);
    document.getElementById('totalMonthlyCostAfterTaxCell').textContent = formatNumber(totalMonthlyCostAfterTax);
    document.getElementById('incomeCell').textContent = formatNumber(income);
    document.getElementById('cashflowCell').textContent = formatNumber(cashflow);

    // Fargekoding av cashflow
    if (cashflow >= 0) {
        document.getElementById('cashflowCell').className = 'positive';
    } else {
        document.getElementById('cashflowCell').className = 'negative';
    }

        // Fargekoding av resultat
        if (totalMonthlyCostBeforeLoan > 0) {
            document.getElementById('totalMonthlyCostBeforeLoanCell').className = 'positive';
        } else {
            document.getElementById('totalMonthlyCostBeforeLoanCell').className = 'negative';
        }
    

    // Oppdater tabellen med framtidig boligverdi
    document.getElementById('value3YearsCell').textContent = formatNumber(value3Years);
    document.getElementById('value5YearsCell').textContent = formatNumber(value5Years);
    document.getElementById('value10YearsCell').textContent = formatNumber(value10Years);

    // Vis resultatet (hvis du vil vise noe annet i tillegg)
    document.getElementById('result').innerHTML = `
        <h2>Resultat</h2>
    `;
}

// Legg til event listeners for å oppdatere kalkulatoren når input verdiene endres
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateLoan);
});
