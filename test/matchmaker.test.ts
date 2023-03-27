import { Matchmaker, Player } from '../src'

describe('Matchmaker', () => {
	test('should add new player to the queue', () => {
		const matchmaker = new Matchmaker(100)
		const player = new Player(1, 1000)

		matchmaker.addPlayerToQueue(player)

		expect(matchmaker.playersInQueue).toBe(1)
	})

	test('should find a match', () => {
		const matchmaker = new Matchmaker(100)
		const playerA = new Player(1, 1000)
		const playerB = new Player(2, 1099)

		matchmaker.addPlayerToQueue(playerA)
		matchmaker.addPlayerToQueue(playerB)

		const match = matchmaker.findMatch()

		expect(match).not.toBeNull()
		expect(match?.teamA).toContain(playerA)
		expect(match?.teamB).toContain(playerB)
	})
})
