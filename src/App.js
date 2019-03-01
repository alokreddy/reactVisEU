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
  padding: 4em;
  background: papayawhip;
  display:flex;
  flex-direction:row;
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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hoveredNode: false,
      results: data,
    };
  }

  render() {

    const {hoveredNode} = this.state;

    return (
      <div className="App">
        <Wrapper>
          <div>
            <XYPlot
              margin={{ left: 100, top: 50, bottom: 100 }}
              xType="ordinal"
              height={480} width={480}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis position="middle" title="EU Country" tickLabelAngle={-60} />
              <YAxis position="middle" title="Total length of motorways. (KM)" />
              <VerticalBarSeries
                onValueMouseOver={x => this.setState({
                  results: data.filter(function (data) {
                    return data.x === "France";
                  })
                })}
                onValueMouseOut={(datapoint, event) => this.setState({ results: data })}
                opacity="0.6"
                data={this.state.results} />
            </XYPlot>
          </div>
          <div>
            <XYPlot margin={{ left: 100, top: 50, bottom: 100 }} xType="ordinal"
              height={480} width={480}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis position="middle" title="Country" tickLabelAngle={-60} />
              <YAxis position="middle" title="Area of country in Europe. (Sq. KMs)" />
              <MarkSeries
                onValueMouseOver={event => this.setState({
                  results: data.filter(function (data) {
                    return data.x === event;
                  })
                })}
                onValueMouseOut={() => this.setState({ results: data })}
                strokeWidth={2}
                opacity="0.8"
                sizeRange={[2, 30]} data={this.state.results} />
            </XYPlot>
          </div>
        </Wrapper>

      </div>
    );
  }
}

export default App;