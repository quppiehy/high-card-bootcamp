import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      wins: { player1Win: 0, player2Win: 0, draw: 0, gameCount: 0 },
      totalRounds: 0,
      reset: false,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array.
    if (this.state.cardDeck.length < 10) {
      this.resetGame();
      this.setState({ reset: true });
      return;
    } else if (this.state.reset) {
      this.setState({ reset: false });
    }
    console.log(this.state.reset);
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    this.setState(
      {
        currCards: newCurrCards,
      },
      () => {
        const player1 = 0;
        const player2 = 1;
        const draw = 2;
        if (
          this.state.currCards[player1].rank <
          this.state.currCards[player2].rank
        ) {
          this.resultsWin(player2);
        } else if (
          this.state.currCards[player1].rank >
          this.state.currCards[player2].rank
        ) {
          this.resultsWin(player1);
        } else if (
          this.state.currCards[player1].rank ===
          this.state.currCards[player2].rank
        ) {
          this.resultsWin(draw);
        }
      }
    );
  };

  resultsWin = (index) => {
    let winArray = { ...this.state.wins };
    if (index === 0) {
      winArray.player1Win += 1;
    } else if (index === 1) {
      winArray.player2Win += 1;
    } else if (index === 2) {
      winArray.draw += 1;
    }
    winArray.gameCount += 1;
    this.setState({
      wins: winArray,
    });
  };

  checkValue = () => {
    let winner = "";
    const player1 = 0;
    const player2 = 1;
    if (
      this.state.currCards[player1].rank < this.state.currCards[player2].rank
    ) {
      winner = "The winner is Player 2!";
    } else if (
      this.state.currCards[player1].rank > this.state.currCards[player2].rank
    ) {
      winner = "The winner is Player 1!";
    } else if (
      this.state.currCards[player1].rank === this.state.currCards[player2].rank
    ) {
      winner = "This is a Draw.";
    }
    return winner;
  };

  resetGame = () => {
    let newWins = { player1Win: 0, player2Win: 0, draw: 0, gameCount: 0 };
    this.setState({
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      wins: newWins,
    });
    console.log(newWins);
  };

  render() {
    const currCardElems = this.state.currCards.map(
      ({ name, suit, imgSrc }, index) => (
        // Give each list element a unique key
        <Row
          xs="7"
          className="justify-content-md-center"
          key={`Rowplayer${index}`}
        >
          <Col>Player {index + 1}</Col>
          <Col>
            <img
              className="card"
              src={require(`${imgSrc}`)}
              alt={`${name} of ${suit}`}
            />
          </Col>
        </Row>
      )
    );
    const printLeaderBoard = (
      <Container>
        <Row xs="5" className="justify-content-md-center">
          <Col>Player 1</Col>
          <Col>{this.state.wins.player1Win}</Col>
        </Row>
        <Row xs="5" className="justify-content-md-center">
          <Col>Player 2</Col>
          <Col>{this.state.wins.player2Win}</Col>
        </Row>
        <Row xs="5" className="justify-content-md-center">
          <Col>Draw</Col>
          <Col>{this.state.wins.draw}</Col>
        </Row>
        <Row xs="5" className="justify-content-md-center">
          <Col>Round</Col>
          <Col>{this.state.wins.gameCount}</Col>
        </Row>
      </Container>
    );

    const printResults = (
      <div>
        {this.state.currCards && this.state.currCards.length > 0 ? (
          this.checkValue()
        ) : (
          <p>Click Deal to deal cards</p>
        )}
      </div>
    );

    if (this.state.reset === true) {
      return (
        <div className="App">
          <header className="App-header">
            <h3>High Card 🚀</h3> <br />
            <h4>Game was reset as card deck had less than 10 cards left.</h4>
            <Button variant="primary" onClick={this.dealCards}>
              Deal
            </Button>
          </header>
        </div>
      );
    } else if (this.state.wins.gameCount > 0) {
      return (
        <div className="App">
          <header className="App-header">
            <h3>High Card 🚀</h3> <br />
            <Container>{currCardElems}</Container>
            <br />
            {printResults}
            <br />
            {printLeaderBoard}
            <br />
            <Container>
              <Row xs="6" className="justify-content-md-center">
                <Col>
                  <Button variant="primary" onClick={this.dealCards}>
                    Deal
                  </Button>
                </Col>
                <Col>
                  <Button variant="primary" onClick={this.resetGame}>
                    Reset Game
                  </Button>
                </Col>
              </Row>
            </Container>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <h3>High Card 🚀</h3> <br />
            {currCardElems}
            <Button variant="primary" onClick={this.dealCards}>
              Deal
            </Button>
          </header>
        </div>
      );
    }
  }
}

export default App;
