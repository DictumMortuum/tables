import { Pie } from '@nivo/pie'
import { defs } from './common';

const transform = data => {
  const col = {};

  data.filter(d => d.owned === true && d.maxPlayers > 0).forEach(element => {
    if (col[element.maxPlayers] === undefined) {
      col[element.maxPlayers] = {
        "id": element.maxPlayers,
        "label": element.maxPlayers,
        "value": 0,
      }
    }

    col[element.maxPlayers].value++;
  });

  return Object.keys(col).filter(d => col[d].value > 5).map(d => col[d]);
}

const Component = ({ data, width, height }) => (
  <Pie
      data={transform(data)}
      width={width}
      height={height}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      innerRadius={0.3}
      padAngle={1.5}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      enableArcLinkLabels={false}
      arcLabel={e=>e.id+" ("+e.value+")"}
      legends={[
        {
          anchor: 'bottom-left',
          direction: 'column',
          justify: false,
          translateX: -50,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 20,
          itemsSpacing: 0,
          symbolSize: 20,
          itemDirection: 'left-to-right'
        }
      ]}
      defs={defs}
      fill={[
        {
          match: { id: 2 }, id: 'dots'
        },
        {
          match: { id: 3 }, id: 'dots'
        },
        {
          match: { id: 4 }, id: 'dots'
        },
      ]}
  />
)
export default Component;
