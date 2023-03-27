import { v4 as uuid } from 'uuid'

import { Player } from './Player'
import { Queue } from './Queue'

interface Match {
	id: string
	teamA: Player[]
	teamB: Player[]
	isReady: boolean
}

export class Matchmaker {
	public id: string = `matchmaker-${uuid()}`
	private potentialMatches: Match[] = []
	constructor(
		private queue: Queue,
		private threshold: number,
		private teamSize: number
	) {}

	private createMatch(): Match | null {
		const match: Match = {
			id: `match-${uuid()}`,
			teamA: [],
			teamB: [],
			isReady: false,
		}

		for (const playerA of this.queue.playersInQueue) {
			for (const playerB of this.queue.playersInQueue) {
				if (
					playerA.id !== playerB.id &&
					Math.abs(playerA.mmr - playerB.mmr) <= this.threshold
				) {
					match.teamA.push(playerA)
					match.teamB.push(playerB)
					this.queue.removePlayersFromQueue([playerA.id, playerB.id])
					this.potentialMatches.push(match)
				}
			}
		}

		if (
			match.teamA.length === this.teamSize &&
			match.teamB.length === this.teamSize
		) {
			match.isReady = true
			return match
		}

		this.potentialMatches.push(match)
		return null
	}

	public findMatch(): Match | null {
		if (this.potentialMatches.length === 0) {
			return this.createMatch()
		}

		for (const match of this.potentialMatches) {
			const unmatchedPlayers = this.queue.playersInQueue.filter(
				player =>
					!match.teamA.includes(player) &&
					!match.teamB.includes(player)
			)

			for (const unmatchedPlayer of unmatchedPlayers) {
				if (
					match.teamA.length < this.teamSize &&
					this.isPlayerWithinThreshold(match.teamA, unmatchedPlayer)
				) {
					match.teamA.push(unmatchedPlayer)
				} else if (
					match.teamB.length < this.teamSize &&
					this.isPlayerWithinThreshold(match.teamB, unmatchedPlayer)
				) {
					match.teamB.push(unmatchedPlayer)
				}
			}

			if (
				match.teamA.length === this.teamSize &&
				match.teamB.length === this.teamSize
			) {
				match.isReady = true
				return match
			}
		}

		return null
	}

	private isPlayerWithinThreshold(team: Player[], player: Player): boolean {
		return team.every(
			teammate => Math.abs(teammate.mmr - player.mmr) <= this.threshold
		)
	}
}
