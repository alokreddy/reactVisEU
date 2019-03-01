import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { GridRows } from '@vx/grid';
import { GradientTealBlue } from '@vx/gradient';
import { letterFrequency } from '@vx/mock-data';
import { scaleBand, scaleLinear } from '@vx/scale';
import { AxisBottom } from '@vx/axis';
import { extent, max } from 'd3-array';

const width = 600;
const height = 350;

const data = letterFrequency.slice(5);

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

// accessors
const x = d => d.letter;
const y = d => +d.frequency * 100;

export default () => {
  // bounds
  const xMax = width;
  const yMax = height - 120;

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.4
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, y)]
  });
  const colorScale = scaleLinear({
    range: ['#1ae7da', 'white'],
    domain: [0, max(data, y)]
  });

  return (
    <div className="container">
      <h1>Bars</h1>
      <svg width={width} height={height}>
        <GradientTealBlue id="teal" />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={`url(#teal)`}
          rx={14}
        />
        <GridRows
          scale={yScale}
          width={xMax}
          height={yMax}
          stroke="rgba(255,255,255,0.1)"
        />
        <Group top={40}>
          {data.map((d, i) => {
            const barHeight = yMax - yScale(y(d));
            return (
              <Group key={`bar-${x(d)}`}>
                <Bar
                  width={xScale.bandwidth()}
                  height={barHeight}
                  x={xScale(x(d))}
                  y={yMax - barHeight}
                  fill={`rgba(23, 233, 217, .5)`}
                  data={{ x: x(d), y: y(d) }}
                  onClick={data => event => {
                    alert(`clicked: ${JSON.stringify(data)}`);
                  }}
                />
                <text
                  x={xScale(x(d))}
                  y={yMax - barHeight}
                  fill={colorScale(y(d))}
                  fontSize={12}
                  dy={'-.5em'}
                >
                  {`${round(y(d), 1)}`}
                  <tspan fontSize="8" dy="-.33em">
                    %
                  </tspan>
                </text>
              </Group>
            );
          })}
        </Group>
        <AxisBottom
          scale={xScale}
          top={height - 80}
          tickStroke="#2cc7de"
          label={
            <text
              fill="white"
              textAnchor="middle"
              fontSize={10}
              fontFamily="Arial"
            >
              Letter Frequency
            </text>
          }
          tickLabelComponent={
            <text
              fill="#2cc7de"
              textAnchor="middle"
              fontSize={10}
              fontFamily="Arial"
            />
          }
          hideAxisLine
          hideTicks
        />
      </svg>

      <p>
        made with{' '}
        <span className="logo">
          <a href="https://vx-demo.now.sh">
            <img
              height="18"
              src="https://cdn.glitch.com/ac3546c3-5151-46d6-97a6-7a404abe0d96%2Ffavicon.ico?1498950553621"
            />
          </a>
        </span>
      </p>
      <div>
        <a href="https://glitch.com/edit/#!/remix/kind-modem">
          <img
            src="https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg"
            alt="Remix on Glitch"
          />
        </a>
      </div>

      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Oxygen",
            "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
        }

        h1 {
          margin: 1em 0;
        }

        p {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
        }

        .logo {
          margin-left: 5px;
          margin-top: 3px;
        }
      `}</style>
    </div>
  );
};
