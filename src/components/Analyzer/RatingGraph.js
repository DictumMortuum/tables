import { Bar } from '@nivo/bar'

const toRating = n => Math.floor(n);

const transform = data => {
  const col = {};

  data.filter(d => d.owned === true).forEach(element => {
    const id = toRating(element.averageRating)

    if (col[id] === undefined) {
      col[id] = {
        "id": id,
        "value": 0,
      }
    }

    col[id].value++;
  });

  return {
    col: Object.keys(col).map(d => col[d]),
    keys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  }
}

const Component = ({ data, height, width }) => {
  const { col } = transform(data);

  return (
    <Bar
      data={col}
      keys={["value"]}
      indexBy="id"
      height={height}
      width={width}
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      padding={0.2}
      tooltipLabel={e => e.id}
    />
  );
}

export default Component;
