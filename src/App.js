import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, ContinuousSizeLegend, LineSeries, MarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

//Total length of motorways. (kilometers) (y)
//data is obtained from https://twitter.com/spectatorindex/status/1100976386326425600

//country area sq. kms (size)
//data is obtained from https://en.wikipedia.org/wiki/List_of_European_countries_by_area

class App extends Component {
  render() {

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

    return (
      <div className="App">
        <XYPlot margin={{ left: 100, top: 100 }} xType="ordinal"
          height={500} width={700}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis position="middle" title="EU Country" />
          <YAxis position="middle" title="Total length of motorways. (kilometers)" />
          <LineSeries data={data} />
          <MarkSeries strokeWidth={2}
            opacity="0.8"
            sizeRange={[2, 30]} data={data} />
          <ContinuousSizeLegend
            circlesTotal={5}
            endSize={30}
            endTitle={551695}
            startSize={2}
            startTitle={23507}
            width={240}
          />
        </XYPlot>
      </div>
    );
  }
}

export default App;