import { Pie } from '@nivo/pie'
import { defs } from './common';

const transform = data => {
  const col = {
    "expansion": {
      "id": "expansion",
      "label": "expansion",
      "value": 0,
    },
    "base": {
      "id": "base",
      "label": "base",
      "value": 0,
    }
  };

  data.filter(d => d.owned === true && d.isExpansion !== undefined).forEach(element => {
    if (element.isExpansion === true) {
      col.expansion.value++;
    } else {
      col.base.value++;
    }
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
      arcLinkLabel={e=>e.id}
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
          match: { id: "base" }, id: 'dots'
        },
        {
          match: { id: "expansion" }, id: 'lines'
        },
      ]}
  />
)
export default Component;
