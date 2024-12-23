import { Pie } from '@nivo/pie'
import { defs } from './common';

const toHours = n => Math.floor(n / 60);

const transform = data => {
  const col = {};

  data.filter(d => d.owned === true && d.playingTime > 0).forEach(element => {
    const id = toHours(element.playingTime)

    if (col[id] === undefined) {
      col[id] = {
        "id": id,
        "label": id,
        "value": 0,
      }
    }

    col[id].value++;
  });

  return Object.keys(col).map(d => col[d]);
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
      enableArcLinkLabels={true}
      arcLinkLabel={e=>e.id+"h"}
      enableArcLabels={false}
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
          match: { id: 2 }, id: 'lines'
        },
        {
          match: { id: 1 }, id: 'dots'
        },
      ]}
  />
)
export default Component;
