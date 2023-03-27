import { Player } from './Player'

interface Match {
	teamA: Player[]
	teamB: Player[]
}

export class Matchmaker {
	constructor(private players: Player[], private threshold: number) {}

	public addPlayerToQueue(player: Player): void {
		this.players.push(player)
	}

	public get playersInQueue(): number {
		return this.players.length
	}

	public findMatch(): Match | null {
		let potentialMatches: Match[] = []

		for (const playerA of this.players) {
			for (const playerB of this.players) {
				if (
					playerA.id !== playerB.id &&
					Math.abs(playerA.mmr - playerB.mmr) <= this.threshold
				) {
					const match: Match = {
						teamA: [playerA],
						teamB: [playerB],
					}
					potentialMatches.push(match)
				}
			}
		}

		// Expand potential matches to include more players per team (up to 5)
		potentialMatches = this.expandMatches(potentialMatches)

		// Return the first match found or null if no match is found
		return potentialMatches.length > 0 ? potentialMatches[0] : null
	}

	private expandMatches(potentialMatches: Match[]): Match[] {
		const expandedMatches: Match[] = []

		for (const match of potentialMatches) {
			const unmatchedPlayers = this.players.filter(
				player =>
					!match.teamA.includes(player) &&
					!match.teamB.includes(player)
			)

			for (const unmatchedPlayer of unmatchedPlayers) {
				if (
					match.teamA.length < 5 &&
					this.isPlayerWithinThreshold(match.teamA, unmatchedPlayer)
				) {
					match.teamA.push(unmatchedPlayer)
				} else if (
					match.teamB.length < 5 &&
					this.isPlayerWithinThreshold(match.teamB, unmatchedPlayer)
				) {
					match.teamB.push(unmatchedPlayer)
				}
			}

			expandedMatches.push(match)
		}

		return expandedMatches
	}

	private isPlayerWithinThreshold(team: Player[], player: Player): boolean {
		return team.every(
			teammate => Math.abs(teammate.mmr - player.mmr) <= this.threshold
		)
	}
}
