export async function GET() {
    const username = 'STTRAFE';

    const query = `
        query userContestRankingInfo($username: String!) {
            userContestRanking(username: $username) {
                rating
                globalRanking
                totalParticipants
                topPercentage
                attendedContestsCount
            }
            userContestRankingHistory(username: $username) {
                attended
                rating
                ranking
                contest {
                    title
                    startTime
                }
            }
        }
    `;

    try {
        const response = await fetch('https://leetcode.com/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com',
            },
            body: JSON.stringify({
                query,
                variables: { username },
            }),
            // Updates every day
            next: { revalidate: 86400 },
        });

        if (!response.ok) {
            throw new Error(`LeetCode API error: ${response.status}`);
        }

        const data = await response.json();
        const contestRanking = data?.data?.userContestRanking;
        const contestHistory = data?.data?.userContestRankingHistory || [];

        if (!contestRanking) {
            return Response.json({
                rating: null,
                topPercentage: null,
                error: 'No contest data found'
            });
        }

        // Filter to only attended contests and format the history
        const history = contestHistory
            .filter(contest => contest.attended)
            .map(contest => ({
                rating: Math.round(contest.rating),
                ranking: contest.ranking,
                title: contest.contest.title,
                date: new Date(contest.contest.startTime * 1000).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                })
            }));

        return Response.json({
            rating: Math.round(contestRanking.rating),
            topPercentage: contestRanking.topPercentage?.toFixed(2),
            globalRanking: contestRanking.globalRanking,
            totalParticipants: contestRanking.totalParticipants,
            attendedContestsCount: contestRanking.attendedContestsCount,
            history: history,
        });
    } catch (error) {
        console.error('Error fetching LeetCode data:', error);
        return Response.json(
            { error: 'Failed to fetch LeetCode data' },
            { status: 500 }
        );
    }
}
