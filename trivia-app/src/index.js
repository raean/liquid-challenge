import React from 'react';
import ReactDOM, { unstable_renderSubtreeIntoContainer } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import questions from './questions.json';


// Make Game, Board, Card & Question functions/component classes.

/**
 * Game Component:
 * - Randomly selects 16 questions out of the 40.
 */

class Game extends React.Component {

  constructor(props) {
    super(props);
    var questionsSet = this.generateRandomQuestions();
    this.state = {
      userScore: 0
    };

  }

  pointGained(point) {
    this.setState({
      userScore: this.state.userScore+1
    });
  }



  // We need a handle click here to take in the question that was being answered. It has a to increment or keep the userScore the same and alter the score appearing on the as well as nullify the buttons.

  generateRandomQuestions() {
    var questionTracker = []
    let i = 0;
    while (i < 16) {
      var random = questions[Math.floor(Math.random() * questions.length)];
      if (!questionTracker.includes(random.id)) {
        i++; 
        questionTracker.push(random.id);
      }  
    }
    return questionTracker;
  }

  render() {
    return(
      <div className="game">
        <h1>Rae's Trivia Challenge</h1> 
        <h2> Your score: {this.state.userScore}/16</h2>
          <Board questionSet={this.generateRandomQuestions()} 
          onClick={() => this.pointGained()}/>
      </div>
    )
  }
}

// Board component:
class Board extends React.Component {

  renderCards() {
    const questionsTracker = this.props.questionSet;
    return (
      <div className="cards"> 
        {questions.map((question, key) => {
              if(questionsTracker.includes(question.id))
                 return(<Card questionInfo={question} category={question.category} onClick={() => this.props.onClick()}></Card>)

          } 
        )}
      </div>
    );
  }

  // This needs to loop through all the questions and display them onto the board.
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderCards()}
        </div>
      </div>
    );
  }
}

/**
 * This component class structures the cards such that they contain from the JSON file the category, the options, and the question itself. Upon submission, the user will be informed for the score.
 * 
 * TO UPDATE: Perhaps put the iteration in
 */
class Card extends React.Component {


  findColour(category) {
    var colour = "white";
    if (category === "Sports") {
      colour = "#f0f8ff";
    } else if (category === "Science") {
      colour = "#fff8dc";
    } else if (category === "Music") {
      colour = "#fffafa";
    } else {
      colour = "#f5f5dc";
    }
    return colour;
  }

  render() {

    var score = "?";

    return (
      <div className="card" style={{background: this.findColour(this.props.category)}}>
        <p> Category: {this.props.questionInfo.category}</p>
        <p> Score: {score}/1</p>
        <p key={this.props.questionInfo.id}> {this.props.questionInfo.question} </p>
          {this.props.questionInfo.options.map(option => 
            <button onClick={() => this.scoreUser(option, this.props.questionInfo.correct)} onClick={() => this.props.onClick()}>{option}</button> 
          )}
      </div>
    )} 
}


// ========================

ReactDOM.render(
  <React.StrictMode>
    <Game/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
