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
	constructor(
		private queue: Queue,
		private threshold: number,
		private teamSize: number
	) {}

	public findMatch(player: Player): Match | null {
		// filter out the player from the queue if they are already present
		const updatedQueue = this.queue.playersInQueue.filter(
			p => p.id !== player.id
		)

		// Add the player to the updated queue
		updatedQueue.push(player)

		// find potential teammates and opponents for the player
		const potentialMatchPlayers = updatedQueue.filter(
			p => Math.abs(p.mmr - player.mmr) <= this.threshold
		)

		if (potentialMatchPlayers.length < this.teamSize * 2 - 1) {
			this.queue.addPlayersToQueue([player])
			return null // not enough players to fill two teams
		}

		const { match, selectedPlayerIds } = potentialMatchPlayers.reduce<{
			match: Match
			selectedPlayerIds: string[]
		}>(
			(acc, matchPlayer) => {
				if (acc.match.teamA.length < this.teamSize) {
					acc.match.teamA.push(matchPlayer)
					acc.selectedPlayerIds.push(matchPlayer.id)
				} else if (acc.match.teamB.length < this.teamSize) {
					acc.match.teamB.push(matchPlayer)
					acc.selectedPlayerIds.push(matchPlayer.id)
				}

				return acc
			},
			{
				match: {
					id: `match-${uuid()}`,
					teamA: [player],
					teamB: [],
					isReady: false,
				},
				selectedPlayerIds: [],
			}
		)

		if (
			match.teamA.length === this.teamSize &&
			match.teamB.length === this.teamSize
		) {
			// we got a match!
			// so we remove the selected players from the queue
			this.queue.removePlayersFromQueue(selectedPlayerIds)
			match.isReady = true
			return match
		}

		this.queue.addPlayersToQueue([player])
		return null // unable to find a suitable match
	}
}
