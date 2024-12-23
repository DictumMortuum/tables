import { Bar } from '@nivo/bar'

const toDecade = n => n - n % 10;

const transform = data => {
  const col = {};
  const keys = {};

  data.filter(d => d.owned === true && d.yearPublished > 0).forEach(element => {
    const decade = toDecade(element.yearPublished)

    if (col[decade] === undefined) {
      col[decade] = {
        "id": decade,
      }
    }

    if (col[decade][element.yearPublished] === undefined) {
      col[decade][element.yearPublished] = 0;
      keys[element.yearPublished] = true;

    }

    col[decade][element.yearPublished]++;
  });

  return {
    col: Object.keys(col).map(d => col[d]),
    keys: Object.keys(keys).sort(),
  }
}

const Component = ({ data, height, width }) => {
  const { col, keys } = transform(data);

  return (
    <Bar
      data={col}
      keys={keys}
      indexBy="id"
      height={height}
      width={width}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      enableTotals={true}
      labelSkipWidth={12}
      labelSkipHeight={12}
      tooltipLabel={e => e.id}
      legends={[{
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [{
          on: 'hover',
          style: {
            itemOpacity: 1
          }
        }]
      }]}
    />
  );
}

export default Component;
