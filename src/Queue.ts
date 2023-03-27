import { Player } from './Player'

export class Queue {
	private players: Player[] = []
	constructor() {}

	public get playersInQueue(): Player[] {
		return this.players
	}

	public addPlayersToQueue(players: Player[]): void {
		this.players = [...this.players, ...players]
	}

	public removePlayersFromQueue(playerIds: string[]): void {
		this.players = this.players.filter(
			player => !playerIds.includes(player.id)
		)
	}
}
