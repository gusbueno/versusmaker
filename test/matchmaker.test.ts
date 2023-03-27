import { Matchmaker, Player, Queue } from '../src'

describe('Matchmaker', () => {
	test('should add new player to the queue', () => {
		const queue = new Queue()
		const player = new Player('1', 1000)
		queue.addPlayersToQueue([player])

		expect(queue.playersInQueue.length).toBe(1)
	})

	test('should find a match', () => {
		const queue = new Queue()
		const playerA = new Player('1', 1000)
		const playerB = new Player('2', 1099)
		const matchmaker = new Matchmaker(queue, 100, 1)

		queue.addPlayersToQueue([playerA, playerB])
		const match = matchmaker.findMatch()

		expect(match).not.toBeNull()
		expect(match?.teamA).toContain(playerA)
		expect(match?.teamB).toContain(playerB)
	})
})
