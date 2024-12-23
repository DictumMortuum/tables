import { Pie } from '@nivo/pie'
import { defs } from './common';

const transform = data => {
  const col = {
    "owned": {
      "id": "owned",
      "label": "Owned",
      "value": 0,
    },
    "preOrdered": {
      "id": "preOrdered",
      "label": "Preordered",
      "value": 0,
    },
    "forTrade": {
      "id": "forTrade",
      "label": "For Trade",
      "value": 0,
    },
    "previousOwned": {
      "id": "previousOwned",
      "label": "Previously Owned",
      "value": 0,
    },
    "want": {
      "id": "want",
      "label": "Want",
      "value": 0,
    },
    "wantToPlay": {
      "id": "wantToPlay",
      "label": "Want to Play",
      "value": 0,
    },
    "wantToBuy": {
      "id": "wantToBuy",
      "label": "Want to Buy",
      "value": 0,
    },
    "wishlist": {
      "id": "wishlist",
      "label": "Wishlist",
      "value": 0,
    }
  };

  data.forEach(element => {
    if (element.owned === true) {
      col.owned.value++;
    }

    if (element.preOrdered === true) {
      col.preOrdered.value++;
    }

    if (element.forTrade === true) {
      col.forTrade.value++;
    }

    if (element.previousOwned === true) {
      col.previousOwned.value++;
    }

    if (element.want === true) {
      col.want.value++;
    }

    if (element.wantToPlay === true) {
      col.wantToPlay.value++;
    }

    if (element.wantToBuy === true) {
      col.wantToBuy.value++;
    }

    if (element.wishlist === true) {
      col.wishlist.value++;
    }
  });

  return Object.keys(col).filter(d => col[d].value > 0).map(d => col[d]);
}

const MyResponsivePie = ({ data, width, height }) => (
  <Pie
      data={transform(data)}
      width={width}
      height={height}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      innerRadius={0.3}
      padAngle={1.5}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      sortByValue={true}
      enableArcLinkLabels={false}
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
          match: { id: 'owned' }, id: 'dots'
        },
        {
          match: { id: 'forTrade' }, id: 'lines'
        },
        {
          match: { id: 'want' }, id: 'lines'
        }
      ]}
  />
)
export default MyResponsivePie;
