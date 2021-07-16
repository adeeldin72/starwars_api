import React, { Component } from "react";
import { getCharacters, getCharacterWithUrl } from "./Fetcher"
// import { useEffect, useState } from 'react';

// console.log(getCharacters());


class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
      charactersList: [],
      showCharacterInfo: false,
      characterInfo: [],
      isLoading: true
    }

  }

  //onclick get character info to be displayed
  displayCharacterInfo = function (url) {
    this.setState({ isLoading: true });

    getCharacterWithUrl(url).then(val => {

      this.setState({ characterInfo: [val.result], showCharacterInfo: true });

    }).then(() => {
      this.setState({ isLoading: false });

    });
    this.forceUpdate();
  }

  //on mount get info
  componentDidMount() {
    getCharacters().then(val => {
      this.setState({ charactersList: val.results, isLoading: false });

    });


  }

  render() {


    return (
      <div className="App">
        {this.state.isLoading ? <div className="loadingImg">
          <img src="./loading.gif" alt="not found" />
        </div> : ''}
        {!this.state.isLoading ? <div>
          <div className='listOfCharacters'>
            <ul className="ulOfCharacters">
              {this.state.charactersList.map((value, index) => {
                return (
                  <li key={index}>
                    <div>
                      <p>{value.name}</p>
                      <button onClick={() => this.displayCharacterInfo(value.url)}>Character Info</button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="characterInfo">

            {!this.state.isLoading ? <p className="title">{this.state.showCharacterInfo ? "Character Info" : "Click Character to Show Info"}</p> : ""}

            {this.state.showCharacterInfo === true ?

              <div className="personInfoContainer">
                <p>Name: {this.state.characterInfo[0].properties.name}</p>
                <p>Height: {this.state.characterInfo[0].properties.height}</p>
                <p>Gender: {this.state.characterInfo[0].properties.gender}</p>
                <p>Birth Year: {this.state.characterInfo[0].properties.birth_year}</p>
                <p>Hair Color: {this.state.characterInfo[0].properties.hair_color}</p>
                <p>Description: {this.state.characterInfo[0].description}</p>

              </div>
              : ''}
          </div>
        </div> : ''}
      </div>
    )
  }
}

export default App;
