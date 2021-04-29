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
    this.state = {
      questionSet: this.generateRandomQuestions()
    };
  }

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
    const questionSet = this.state.questionSet;

    return(
      <div className="game">
          <Board questionSet={this.generateRandomQuestions()}/>
      </div>
    )
  }

}

// Board component:
class Board extends React.Component {
  renderCards() {
    const questionsTracker = this.props.questionSet;
    console.log(questionsTracker);
    return (
      <div className="cards"> 
        {questions.map((question, key) => {
              if(questionsTracker.includes(question.id))
                 return(<Card questionInfo={question}></Card>)
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


  render() {
    return (
      <div className="card">
        <p> Category: {this.props.questionInfo.category}</p>
        <p key={this.props.questionInfo.id}> {this.props.questionInfo.question} </p>
          {this.props.questionInfo.options.map(option => 
            <button>{option}</button> 
          )}
      </div>
    )} 
}


// ========================

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <h1> Hello, world! </h1>
    {/* <Board/> */}
    <Game/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
