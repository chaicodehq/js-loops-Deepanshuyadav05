/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
    // 1. Validation: Array check
    if (!Array.isArray(matches) || matches.length === 0) {
        return [];
    }

    const teamsData = {};

    // Helper function to initialize team if not present
    const initTeam = (team) => {
        if (!teamsData[team]) {
            teamsData[team] = {
                team: team,
                played: 0,
                won: 0,
                lost: 0,
                tied: 0,
                noResult: 0,
                points: 0
            };
        }
    };

    // 2. Loop through matches
    for (const match of matches) {
        const { team1, team2, result, winner } = match;

        initTeam(team1);
        initTeam(team2);

        // Increment played count for both
        teamsData[team1].played += 1;
        teamsData[team2].played += 1;

        if (result === "win") {
            const loser = winner === team1 ? team2 : team1;

            // Winner gets 2 points
            teamsData[winner].won += 1;
            teamsData[winner].points += 2;

            // Loser gets 0
            teamsData[loser].lost += 1;
        }
        else if (result === "tie") {
            // Both get 1 point
            teamsData[team1].tied += 1;
            teamsData[team1].points += 1;
            teamsData[team2].tied += 1;
            teamsData[team2].points += 1;
        }
        else if (result === "no_result") {
            // Both get 1 point
            teamsData[team1].noResult += 1;
            teamsData[team1].points += 1;
            teamsData[team2].noResult += 1;
            teamsData[team2].points += 1;
        }
    }

    // 3. Convert object to array and Sort
    return Object.values(teamsData).sort((a, b) => {
        // Sort by points DESCENDING
        if (b.points !== a.points) {
            return b.points - a.points;
        }
        // If points equal, sort by team name ASCENDING
        return a.team.localeCompare(b.team);
    });
}