import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      phrase: '',
      phraseTranslated: 'Let me translate to Pig Latin for you.'
    }
  }
  // The translate function is where you will put your logic to convert the sentence entered by the user to pig location.  What is currently in the function will only directly copy what the user has entered.
  
  translate = (e) => {
    e.preventDefault()
    let inputToTranslate = this.state.phrase
    
    //work
    let words = inputToTranslate.split(' ');
    let pigLatinWords = [];
    let vowelsSometimesY = ['a','e','i','o','u','y']
    let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',]
    let puncuation = ['.', ',']
    for(let i = 0; i < words.length; i++) {
      let isTherePuncuation = [false, false];
      let word = words[i];
      let puncuationPresent = false;
      for(let p = 0; p < puncuation.length; p++){
        if(word.includes(puncuation[p])){
          isTherePuncuation[p] = true;
          puncuationPresent = true;
        }
      }
      let wordLowerCase = word.toLowerCase();
      let pigLatinWord = '';
      let firstVowel = '';       
      let dexFirstVowel = 100;
      let qDex = wordLowerCase.indexOf('q');
      let isCapatilized = word.charAt(0).toUpperCase() === word.charAt(0);
      
      let vowelFound = false;
      let letterFound = false;
      for(let j = 0; j < word.length; j++) {
        let char = wordLowerCase.charAt(j);
        if(!letterFound){
          if(letters.includes(char)){
            letterFound = true;
          }
        }
        if(!vowelFound){
          if(vowelsSometimesY.includes(char)) {
            firstVowel = char;
            dexFirstVowel = j;
            vowelFound = true;
            if(!puncuationPresent){
              break;
            }
          }
        }
        if(letterFound){
          if(puncuation.includes(char)){
            word = word.replace(char, "");
          }
        }
      }
      
      if(!letterFound){
        pigLatinWord = word;
        pigLatinWords.push(pigLatinWord);
        continue;
      }
      
      if(dexFirstVowel === 0){
        pigLatinWord = word + "way";
      }
      else {
        let qInWord = false;
        //if qDex > -1 then there is a q
        if(qDex > -1) {
          //if qDex is less than first vowel then this is a q word
          if(qDex < dexFirstVowel){
            if(qDex === 0) {
              if(firstVowel === "u") {
                qInWord = true;
              }
            }
            else {
              if(firstVowel === "u") {
                qInWord = true;
              }
            }
          }
        }
        let xtraDex = qInWord ? 1 : 0;
        pigLatinWord = word.slice(dexFirstVowel + xtraDex) + word.slice(0, dexFirstVowel + xtraDex) + 'ay';
        pigLatinWord.toLowerCase();
        if(isCapatilized){
          pigLatinWord = pigLatinWord.charAt(0).toUpperCase() + pigLatinWord.slice(1).toLowerCase();
        }
      }
      if(puncuationPresent){
        for(let r = 0; r < puncuation.length; r++){
          if(isTherePuncuation[r]){
            pigLatinWord += puncuation[r];
            break;
          }
        }
      }
      pigLatinWords.push(pigLatinWord);
    }
    
    inputToTranslate = pigLatinWords.join(" ");
    this.setState({phraseTranslated: inputToTranslate})
  }

  

  handleChange = (e) => {
    this.setState({phrase: e.target.value})
  }
//https://lh3.googleusercontent.com/QvvsRY5ShwDNEouVMK8_z7QCwS3grkgd4mzZOlom23Hurralk54ObvsyEMM8ZSNR5pEFBeBMzltzEEcgi2llYJnhXTuXClN3njmMjtw3vgn8Go5jr40fHMNzfI64eYRrnHbZUutxCA=w2400
// <div id="pigImage">
//             <img src='https://images3.alphacoders.com/235/235985.jpg' alt="pig with butcher cut names in pig latin" id="butcherPig"></img>
//           </div>    
  render() {
    return (
      
      <div className="wrapper">
        <sidebar id="left-side" className = "box sidebar sidebarBox">
          <div>
            <form className="info" onSubmit={this.translate}>
              <label htmlFor="input-phrase">Translate this: </label>
              <input name="input-phrase" onChange={this.handleChange}></input>
              <input className="button" type="submit" value="Submit" />
            </form>
            <p className="original-text">{this.state.phrase}</p>
          </div>
        </sidebar>
        <div className = "emptybox empty">
        </div>
        <main>
          <div id="right-side" className="text-center contentBox content speech-bubble speech-bubble" id="tran-text">
            <p>{this.state.phraseTranslated}</p>
          </div>
        </main>
        <footer className=" footer">
          <div className="text-center">
            <p>Coded by Arvin and Ryan</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
