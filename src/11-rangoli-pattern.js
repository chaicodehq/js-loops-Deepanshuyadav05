/**
 * 🎨 Priya ki Diwali Rangoli
 *
 * Priya Diwali pe rangoli banati hai. Uska pattern ek diamond shape mein
 * hota hai stars (*) ka. Tu usse help kar pattern generate karne mein!
 *
 * Rules (use nested for loops):
 *   - Input n determines the size of the diamond
 *   - The diamond has 2n - 1 rows total
 *   - Row i (1-indexed) of the top half has i stars
 *   - Row i of the bottom half mirrors the top
 *   - Stars are separated by a single space
 *   - Each row has leading spaces for center alignment
 *   - The widest row has n stars: "* * * ... *" (2n-1 chars wide)
 *   - No trailing spaces on any row
 *
 * Pattern for n=3:
 *     *
 *   * *
 *   * * *
 *   * *
 *     *
 *
 * (Each row is a string in the returned array)
 *
 * Validation:
 *   - Agar n positive integer nahi hai (0, negative, decimal, non-number),
 *     return empty array []
 *
 * @param {number} n - Size of the diamond (number of stars in the widest row)
 * @returns {string[]} Array of strings forming the diamond pattern
 *
 * @example
 *   rangoli(1) // => ["*"]
 *   rangoli(2) // => [" *", "* *", " *"]
 *   rangoli(3) // => ["  *", " * *", "* * *", " * *", "  *"]
 */
export function rangoli(n) {
    // 1. Validation: Must be a positive integer
    if (!Number.isInteger(n) || n <= 0) {
        return [];
    }

    const result = [];

    // Total rows in the diamond = 2n - 1
    // For n=3, rows are 1, 2, 3, 2, 1

    // 2. Generate Top Half (including the middle widest row)
    for (let i = 1; i <= n; i++) {
        let row = "";

        // Add leading spaces: (n - i) spaces
        for (let j = 0; j < n - i; j++) {
            row += " ";
        }

        // Add stars with a single space: i stars
        // We use a small trick: repeat the star+space and then trim the last space
        let stars = "";
        for (let k = 0; k < i; k++) {
            stars += "* ";
        }
        row += stars.trim();

        result.push(row);
    }

    // 3. Generate Bottom Half (mirror of the top, starting from n-1 down to 1)
    for (let i = n - 1; i >= 1; i--) {
        let row = "";

        // Add leading spaces: (n - i) spaces
        for (let j = 0; j < n - i; j++) {
            row += " ";
        }

        // Add stars: i stars
        let stars = "";
        for (let k = 0; k < i; k++) {
            stars += "* ";
        }
        row += stars.trim();

        result.push(row);
    }

    return result;
}