import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalBarSeries, MarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

//Total length of motorways. (kilometers) (y)
//data is obtained from https://twitter.com/spectatorindex/status/1100976386326425600

//country area sq. kms (size)
//data is obtained from https://en.wikipedia.org/wiki/List_of_European_countries_by_area

const Wrapper = styled.section`
  padding: 1em;
  background: white;
  display:flex;
  flex-direction:row;
  font-size: 2rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;


const Logo = styled.h1`
  font-size: 3rem;
  //margin-left: 2rem;
  position: relative;
  z-index: 2;
  //transform: skew(-7deg);
 
    padding: 0.5rem 1rem;
    background: midnightblue;
    color: white;
    text-transform: uppercase;
    text-decoration: none;
 
    @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const data = [
  { x: 'Spain', y: 15444, size: 498468 },
  { x: 'Germany', y: 12996, size: 357386 },
  { x: 'France', y: 11612, size: 551695 },
  { x: 'Italy', y: 6943, size: 301338 },
  { x: 'UK', y: 3768, size: 248532 },
  { x: 'Portugal', y: 3065, size: 91568 },
  { x: 'Netherlands', y: 2730, size: 41198 },
  { x: 'Turkey', y: 2542, size: 23507 },
  { x: 'Hungary', y: 1924, size: 93030 },
  { x: 'Switzerland', y: 1440, size: 41290 }
];

const dataArr = data.map((d) => {
  return {
    x: d.x,
    y: d.size,
    size: d.size
  }
});


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      barData: data,
      bubbleData: dataArr
    };
  }

  render() {

    return (
      <div className="App" >
      <Logo>Length of Motorways VS Country size (EU)</Logo>
        <Wrapper>
          <div>
          <p>Length of Motorways</p>
            <XYPlot
              margin={{ left: 100, top: 50, bottom: 100 }}
              xType="ordinal"
              height={540} width={720}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis position="middle" title="EU Country" tickLabelAngle={-60} />
              <YAxis position="middle" title="Total length of motorways. (KM)" />
              <VerticalBarSeries
                opacity="0.6"
                data={this.state.barData} />
            </XYPlot>
          </div>
          <div>
          <p>Size of country (in Europe)</p>
            <XYPlot margin={{ left: 100, top: 50, bottom: 100 }} xType="ordinal"
              height={540} width={720}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis position="middle" title="Country" tickLabelAngle={-60} />
              <YAxis position="middle" title="Area of country in Europe. (Sq. KMs)" />
              <MarkSeries
                strokeWidth={2}
                opacity="0.8"
                sizeRange={[2, 30]} data={this.state.bubbleData} />
            </XYPlot>
          </div>
        </Wrapper>

      </div>
    );
  }
}

export default App;