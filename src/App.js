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
      wins: { playerWin: 0, computerWin: 0, draw: 0, gameCount: 0 },
      totalRounds: 0,
      reset: false,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array.
    if (this.state.cardDeck.length < 10) {
      this.resetGame();
      this.setState({ reset: true });
      console.log(this.state.reset);
      return;
    } else {
      this.setState({ reset: false });
      console.log(this.state.reset);
    }
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    this.setState(
      {
        currCards: newCurrCards,
      },
      () => {
        const player = 0;
        const computer = 1;
        const draw = 2;
        if (
          this.state.currCards[player].rank <
          this.state.currCards[computer].rank
        ) {
          this.resultsWin(computer);
        } else if (
          this.state.currCards[player].rank >
          this.state.currCards[computer].rank
        ) {
          this.resultsWin(player);
        } else if (
          this.state.currCards[player].rank ===
          this.state.currCards[computer].rank
        ) {
          this.resultsWin(draw);
        }
      }
    );
  };

  resultsWin = (index) => {
    let winArray = { ...this.state.wins };
    if (index === 0) {
      winArray.playerWin += 1;
    } else if (index === 1) {
      winArray.computerWin += 1;
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
    const player = 0;
    const computer = 1;
    if (
      this.state.currCards[player].rank < this.state.currCards[computer].rank
    ) {
      winner = "The winner is Computer!";
    } else if (
      this.state.currCards[player].rank > this.state.currCards[computer].rank
    ) {
      winner = "The winner is Player!";
    } else if (
      this.state.currCards[player].rank === this.state.currCards[computer].rank
    ) {
      winner = "This is a Draw.";
    }
    return winner;
  };

  resetGame = () => {
    this.setState({
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      wins: { playerWin: 0, computerWin: 0, draw: 0, gameCount: 0 },
    });
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        Player {index + 1}: {name} of {suit}
      </div>
    ));

    const printLeaderBoard = (
      <Container fluid>
        <Row xs="6" className="justify-content-md-center">
          <Col>Player 1</Col>
          <Col>{this.state.wins.playerWin}</Col>
        </Row>
        <Row xs="6" className="justify-content-md-center">
          <Col>Player 2</Col>
          <Col>{this.state.wins.computerWin}</Col>
        </Row>
        <Row xs="6" className="justify-content-md-center">
          <Col>Draw</Col>
          <Col>{this.state.wins.draw}</Col>
        </Row>

        <Row xs="6" className="justify-content-md-center">
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
            {currCardElems}
            <br />
            {printResults}
            <br />
            {printLeaderBoard}
            <br />
            <Container flex>
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
