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
      questionSet: {},
      count: 16
    };
  }


  generateRandomQuestions() {
    for (let i = 0 ; i < this.state.count ; i++) {
      var random = Math.floor(Math.random() * (40-1+1)) + 1;
      alert(random)
      // this.state.questionSet = [...this.state.questionSet]; 
    }
  }

}

// Board component:
class Board extends React.Component {
  renderCards() {
    return (
      <div className="cards"> 
        {questions.map(question => 
            <Card questionInfo={question}></Card>
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
    <Board/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
