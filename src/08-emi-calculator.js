/**
 * 📱 Rohit ka Phone EMI Calculator
 *
 * Rohit ne naya phone liya hai EMI pe! Usse jaanna hai ki kitne months
 * lagenge phone ka poora paisa chukane mein. Har month interest lagta hai
 * remaining amount pe, aur phir EMI deduct hoti hai.
 *
 * Rules (use while loop):
 *   - Start with principal amount (remaining balance)
 *   - Each month:
 *     1. Calculate interest = remaining * monthlyRate (monthlyRate is like 0.02 for 2%)
 *     2. Add interest to remaining: remaining = remaining + interest
 *     3. Deduct EMI: remaining = remaining - emi
 *     4. Increment months count
 *     5. Add emi to totalPaid
 *   - Continue while remaining > 0
 *   - In the last month, if remaining < emi, just pay what's left
 *     (totalPaid += remaining before deduction, not full emi)
 *
 * Infinite loop protection:
 *   - Agar EMI <= first month's interest (principal * monthlyRate),
 *     toh loan kabhi khatam nahi hoga!
 *     Return: { months: -1, totalPaid: -1, totalInterest: -1 }
 *
 * Validation:
 *   - All three params must be positive numbers, else return
 *     { months: -1, totalPaid: -1, totalInterest: -1 }
 *
 * @param {number} principal - Loan amount (phone ki price)
 * @param {number} monthlyRate - Monthly interest rate (e.g., 0.02 for 2%)
 * @param {number} emi - Monthly EMI amount
 * @returns {{ months: number, totalPaid: number, totalInterest: number }}
 *
 * @example
 *   calculateEMI(10000, 0.01, 2000)
 *   // Month 1: 10000 + 100 = 10100, pay 2000, remaining = 8100
 *   // Month 2: 8100 + 81 = 8181, pay 2000, remaining = 6181
 *   // ... continues until remaining <= 0
 *
 *   calculateEMI(10000, 0.05, 400)
 *   // First month interest = 500, EMI = 400 < 500, INFINITE LOOP!
 *   // => { months: -1, totalPaid: -1, totalInterest: -1 }
 */

/**
 * 📱 Rohit ka Phone EMI Calculator
 */
export function calculateEMI(principal, monthlyRate, emi) {
    // 1. Validation: All params must be positive numbers
    if (
        typeof principal !== 'number' || principal <= 0 ||
        typeof monthlyRate !== 'number' || monthlyRate < 0 ||
        typeof emi !== 'number' || emi <= 0
    ) {
        return { months: -1, totalPaid: -1, totalInterest: -1 };
    }

    // 2. Infinite Loop Protection:
    // If EMI is less than or equal to the first month's interest,
    // the balance will never decrease.
    if (emi <= principal * monthlyRate) {
        return { months: -1, totalPaid: -1, totalInterest: -1 };
    }

    let remaining = principal;
    let months = 0;
    let totalInterest = 0;
    let totalPaid = 0;

    // 3. Calculation Loop
    while (remaining > 0) {
        months++;

        // Calculate interest for this month
        const interestThisMonth = remaining * monthlyRate;
        totalInterest += interestThisMonth;

        // Add interest to the balance
        remaining += interestThisMonth;

        // Last month logic: If remaining is less than EMI, pay only what's left
        if (remaining < emi) {
            totalPaid += remaining;
            remaining = 0;
        } else {
            totalPaid += emi;
            remaining -= emi;
        }
    }

    // 4. Rounding to 2 decimal places to handle floating point issues
    return {
        months: months,
        totalPaid: parseFloat(totalPaid.toFixed(2)),
        totalInterest: parseFloat(totalInterest.toFixed(2))
    };
}