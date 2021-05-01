import React from 'react';
import ReactDOM, { unstable_renderSubtreeIntoContainer } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import questions from './questions.json';


/**
 * The Game component stores the game's state and updates the score for the user. It also assesses whether the answers to the questions the user selected are correct or incorrect.
 */
class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userScore: 0,
      testQuestions: this.generateRandomQuestions(),
      answeredQuestions: {},
      gameFinished: false
    };
    this.resetGame = this.resetGame.bind(this);
  }

  /**
   * Updates the state variable with the updated user score. If the game is finished (as in, all the questions are answered) then a window alert informs the users with a message and a reset game button appears.
   */
  questionAnswered(questionFull, optionSelected) {
    if (optionSelected.option === questionFull.correct) {
      this.state.answeredQuestions[questionFull.id]  = true;
      this.setState({
        userScore: this.state.userScore+1,
        answeredQuestions: this.state.answeredQuestions
      });
    } else {

      this.state.answeredQuestions[questionFull.id] = false;
      this.setState({
        userScore: this.state.userScore-1,
        answeredQuestions: this.state.answeredQuestions
      });
    }

    var mapSize = this.getAnsweredCount(this.state.answeredQuestions); // This piece of the checks if all the questions have been answered.
    if (mapSize == 16) {
      this.setState({
        gameFinished: true
      });
      if (this.state.userScore < 16) {
        window.alert("Game over! Better luck next time ;)!");
      } else {
        window.alert("Congratulations! You've got them all correct. Have another go :D!");
      }
    }
  }

  /**
   * Gets the total number of questions answered based on the map of questioned provided.
   * @returns size as an integer of the map.
   */
  getAnsweredCount(answeredQuestions) {
    var count = 0;
    for (var item in answeredQuestions) {
      count++;
    }
    return count;
  }
  
  /**
   * Selects 16 out of 40 questions randomly to be used for the Trivia challenge.
   * @returns the ID's of the questions from the JSON file.
   */
  generateRandomQuestions() {
    var questionTracker = []
    let i = 0;
    while (i < 16) {
      var random = questions[Math.floor(Math.random() * questions.length)];
      random.answered = null;
      if (!questionTracker.includes(random.id)) {
        i++; 
        questionTracker.push(random.id);
      }  
    }
    return questionTracker;
  }

  /**
   * Returns the colour that the score HTML tag should be based on it's value.
   */
  findScoreColour() {
    if (this.state.userScore == 0) {
      return "black";
    } else if (this.state.userScore < 0) {
      return "red";
    } else {
      return "green";
    }
  }

  /**
   * Reset game with a new(er) set of questions and cleans the state.
   */
  resetGame() {
    this.setState({
      userScore: 0,
      testQuestions: this.generateRandomQuestions(),
      answeredQuestions: {},
      gameFinished: false
    });
  }

  render() {
    return(
      <div className="game">
        <h1 class="title">Rae's Trivia Challenge</h1> 
        <h2 class="sub-title" style={{color: this.findScoreColour()}}> Your score: {this.state.userScore}/16</h2>
          {this.state.gameFinished &&
            <button onClick={this.resetGame}> Reset Game</button>
          }
          <Board questionSet={this.state.testQuestions} answeredQuestions={this.state.answeredQuestions}
          onClick={(questionFull, optionSelected) => this.questionAnswered(questionFull, optionSelected)}/>
      </div>
    )
  }
}

/**
 * The Board component lives within the Game component and also has 16 Card children mapped from the questions randomly selected in the state. It iterates through the IDs and renders thems.
 */
class Board extends React.Component {

  /**
   * Renders all 16 Card components.
   * @returns the HTML elements.
   */
  renderCards() {
    const questionsTracker = this.props.questionSet;
    return (
      <div className="cards"> 
        {questions.map((question, key) => {
              if(questionsTracker.includes(question.id))
                 return(<Card questionInfo={question} category={question.category} onClick={(questionFull, optionSelected) => this.props.onClick(questionFull, optionSelected)} answeredQuestions={this.props.answeredQuestions}></Card>)

          } 
        )}
      </div>
    );
  }

  render() { // The render card function does the heavy-lifting for card generation.
    return (
      <div>
        <div className="board-row" class="cards">
          {this.renderCards()} 
        </div>
      </div>
    );
  }
}

/**
 * This component class structures the cards such that they contain from the JSON file the category, the options, and the question itself. Upon submission, the user will be informed for the score.
 */
class Card extends React.Component {

  /**
   * Colours the card based on the category passed through the props.
   * @returns the colour of the card in String format.
   */
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

  /**
   * ((Disclaimer: I'm guessing there's a cleaner way to do this.))
   * 
   * The render function here checks if the question has been answered or not before populating the buttons are disabled or not (as well as updated the score of that particular question).
   */
  render() {
    const answeredQuestions = this.props.answeredQuestions;
    const questionInfo = this.props.questionInfo;
    var score = "?"
    if (answeredQuestions[questionInfo.id] != null) {
      score = answeredQuestions[questionInfo.id] ? "1" : "0";
      return (
        <div className="card" class="card" style={{background: this.findColour(this.props.category)}}>
          <p> Category: {this.props.questionInfo.category}</p>
          <p> Score: {score}/1</p>
          <p key={this.props.questionInfo.id}> {this.props.questionInfo.question} </p>
            {
              this.props.questionInfo.options.map(option =>  
              <button disabled="true" onClick={() => this.props.onClick(this.props.questionInfo, {option})} category={this.props.questionInfo.category}>{option}</button>  
            )}
            {
             answeredQuestions[questionInfo.id] && 
             <p style={{color: "green", fontWeight: "bold"}}> Right! </p> 
            }
            {!answeredQuestions[questionInfo.id] && 
             <p style={{color: "red", fontWeight: "bold"}}> Wrong... :( </p>
            }
        </div>
      )} else {
        return (
          <div className="card" style={{background: this.findColour(this.props.category)}}>
            <p> Category: {this.props.questionInfo.category}</p>
            <p> Score: {score}/1</p>
            <p key={this.props.questionInfo.id}> {this.props.questionInfo.question} </p>
              {
                this.props.questionInfo.options.map(option => 
                <button variant="secondary" onClick={() => this.props.onClick(this.props.questionInfo, {option})} category={this.props.questionInfo.category} >{option}</button> 
              )}
          </div>
        )}
    }
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
