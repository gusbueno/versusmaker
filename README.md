```text
 __      ________ _____   _____ _    _  _____ __  __          _  ________ _____
 \ \    / /  ____|  __ \ / ____| |  | |/ ____|  \/  |   /\   | |/ /  ____|  __ \
  \ \  / /| |__  | |__) | (___ | |  | | (___ | \  / |  /  \  | ' /| |__  | |__) |
   \ \/ / |  __| |  _  / \___ \| |  | |\___ \| |\/| | / /\ \ |  < |  __| |  _  /
    \  /  | |____| | \ \ ____) | |__| |____) | |  | |/ ____ \| . \| |____| | \ \
     \/   |______|_|  \_\_____/ \____/|_____/|_|  |_/_/    \_\_|\_\______|_|  \_\

```

<div>

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/gusbueno/versusmaker.svg)](https://github.com/gusbueno/versusmaker/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/gusbueno/versusmaker.svg)](https://github.com/gusbueno/versusmaker/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

## 🗒️ Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Usage](#usage)
-   [Built Using](#built_with)
-   [Authors](#authors)

## 📚 About <a name="about"></a>

`versusmaker` is a simple matchmaker and easy-to-use nodejs library.

## 🚀 Getting Started <a name="getting_started"></a>

### Install the package with npm

```shell
npm install --save versusmaker
```

### Install the package with yarn

```shell
yarn add versusmaker
```

## 🎬 Usage <a name="usage"></a>

-   Create a matchmaking for 1v1

```typescript
let match = null
// create a queue
const queue = new Queue()
// create a matchmaker instance passing the queue,
// 100 as a threshold (which is the different allowed between the mmr of the players
// that means that a player with 1100 mmr can match with a player with 1000 mmr
// and also a player with 1200 mrr),
// and the number of players per team, 1 for this case
const matchmaker = new Matchmaker(queue, 100, 1)

// create some players with an ID and their mmr
const player1 = new Player('1', 1000)
const player2 = new Player('2', 1070)
// try to find a match by calling `findMatch` passing a player
match = matchmaker.findMatch(player1)
// if the system does not find any match for that player
// it will add it to the queue and return null

// if we call the same function again with another player
// it will check the queue of players and the player passed
// so in this case we will get a match
match = matchmaker.findMatch(player2)
```

-   Adding players to queue

```typescript
// players that could not find a match
// are automatically added to the queue
// but maybe for any reason you wanna add player to the queue
// without trying to find a match for them
// you can do that by passing an array of players
const queue = new Queue()
const player1 = new Player('1', 2200)
const player2 = new Player('2', 1400)
queue.addPlayersToQueue([player1, player2])
```

-   Remove player from queue

```typescript
// if, for example, a player that was in queue disconnect from your game
// you can remove that player from the queue just by passing an array of player ids
const queue = new Queue()
const matchmaker = new Matchmaker(queue, 100, 5)
const myOwnPlayerId = '1'
const myOwnPlayerMMR = 2102
const player = new Player(myOwnPlayerId, myOwnPlayerMMR)
// we try to find a match for that player
const match = matchmaker.findMatch()
// returns null because it didn't find a match for that player
// so the player is automatically added in the queue

// but the player disconnected so we wanna remove it from the queue
queue.removePlayersFromQueue([player.id])
```

-   Match object
    The `match` returned by `.findMatch` function contains the following structure:

```json
{
	"id": "match-rhdfh2fg34b53", // match id
	"teamA": [], // array of Players
	"teamB": [], // array of Players
	"isReady": true // just a flag to know that the match teams are full filled
}
```

## 🚧 Built with <a name="built_with"></a>

-   [Typescript](https://www.typescriptlang.org/)
-   [NodeJs](https://nodejs.org/en/)
-   [uuid](https://github.com/uuidjs/uuid)

## 🧑🏻‍💻👩🏻‍💻 Authors <a name="authors"></a>

-   [@gusbueno](https://github.com/gusbueno)
