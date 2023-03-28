import { Matchmaker, Player, Queue } from '../src'

describe('Matchmaker', () => {
	describe('match found!', () => {
		test('should add new player to the queue', () => {
			const queue = new Queue()
			const player = new Player('1', 1000)
			queue.addPlayersToQueue([player])

			expect(queue.playersInQueue.length).toBe(1)
		})

		test('should find a match with 1 player for each team', () => {
			const queue = new Queue()
			const playerA = new Player('1', 1000)
			const playerB = new Player('2', 593)
			const playerC = new Player('3', 1099)
			const matchmaker = new Matchmaker(queue, 100, 1)

			queue.addPlayersToQueue([playerA, playerB])
			const match = matchmaker.findMatch(playerC)

			expect(match).not.toBeNull()
			// checking teams in the match are full filled
			expect(match?.teamA.length).toEqual(1)
			expect(match?.teamB.length).toEqual(1)
			// checking players that should be and not be in the queue
			expect(queue.playersInQueue).toContain(playerB)
			expect(queue.playersInQueue).not.toContain(playerA)
			expect(queue.playersInQueue).not.toContain(playerC)
		})

		test('should find a match with 2 players for each team', () => {
			const queue = new Queue()
			const playerA = new Player('1', 1000)
			const playerB = new Player('2', 1099)
			const playerC = new Player('3', 593)
			const playerD = new Player('4', 1001)
			const playerE = new Player('5', 594)
			const playerF = new Player('6', 1100)
			const matchmaker = new Matchmaker(queue, 100, 2)

			queue.addPlayersToQueue([
				playerA,
				playerB,
				playerC,
				playerD,
				playerE,
			])
			const match = matchmaker.findMatch(playerF)

			// checking there there is a match found
			expect(match).not.toBeNull()
			// checking teams in the match are full filled
			expect(match?.teamA.length).toEqual(2)
			expect(match?.teamB.length).toEqual(2)
			;[playerC, playerE].forEach(player => {
				// checking players that should not be in the match
				expect(match?.teamA).not.toContain(player)
				expect(match?.teamB).not.toContain(player)
				// checking players still in the queue
				expect(queue.playersInQueue).toContain(player)
			})

			// checking players that should not be in the queue anymore
			;[playerA, playerB, playerD, playerF].forEach(player => {
				expect(queue.playersInQueue).not.toContain(player)
			})
		})

		test.only('should find a match with 5 players for each team', () => {
			const queue = new Queue()
			const matchmaker = new Matchmaker(queue, 100, 5)

			const playerA = new Player('1', 1000)
			const playerB = new Player('2', 1019)
			const playerC = new Player('3', 593)
			const playerD = new Player('4', 1001)
			const playerE = new Player('5', 1008)
			const playerF = new Player('6', 1021)
			const playerG = new Player('7', 1002)
			const playerH = new Player('8', 995)
			const playerI = new Player('9', 1036)
			const playerJ = new Player('10', 1003)
			const playerK = new Player('11', 936)

			queue.addPlayersToQueue([
				playerA,
				playerB,
				playerC,
				playerD,
				playerE,
				playerF,
				playerG,
				playerH,
				playerI,
				playerJ,
			])
			const match = matchmaker.findMatch(playerK)

			// checking there there is a match found
			expect(match).not.toBeNull()
			// checking teams in the match are full filled
			expect(match?.teamA.length).toEqual(5)
			expect(match?.teamB.length).toEqual(5)

			// checking players that should not be in the match
			expect(match?.teamA).not.toContain(playerC)
			expect(match?.teamB).not.toContain(playerC)
			// checking players still in the queue
			expect(queue.playersInQueue).toContain(playerC)

			// checking players that should not be in the queue anymore
			;[
				playerA,
				playerB,
				playerD,
				playerE,
				playerF,
				playerG,
				playerH,
				playerI,
				playerJ,
				playerK,
			].forEach(player => {
				expect(queue.playersInQueue).not.toContain(player)
			})
		})
	})
})
