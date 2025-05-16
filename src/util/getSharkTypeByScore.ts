interface ScoreProps {
  dscore: number;
  iscore: number;
  mscore: number;
  cscore: number;
}

// SharkTypeText 배열을 정의하여 각 상어 유형의 label과 value를 매핑
const SharkTypeText = [
  { label: '고래상어', value: 'whale' },
  { label: '그린란드상어', value: 'greenland' },
  { label: '레몬상어', value: 'lemon' },
  { label: '망치머리상어', value: 'hammerhead' },
  { label: '뱀상어', value: 'tiger' },
  { label: '넓은주둥이상어', value: 'megamouth' },
  { label: '파자마 상어', value: 'pyjama' },
  { label: '톱상어', value: 'saw' },
  { label: '천사상어', value: 'angel' },
  { label: '모래뱀상어', value: 'sand' },
  { label: '카펫상어(와블공상어)', value: 'wobbegong' },
  { label: '너스샤크', value: 'nurse' },
  { label: '암초상어', value: 'reef' },
];

const getSharkTypeByScore = ({
  dscore,
  iscore,
  mscore,
  cscore,
}: ScoreProps): string => {
  const scores = {
    d: dscore,
    i: iscore,
    m: mscore,
    c: cscore,
  };

  const highScores = Object.values(scores).filter(score => score >= 90).length;
  if (highScores >= 2) {
    return 'whale';
  }

  const sharkTypes: { [key: string]: string } = {
    d1: 'greenland',
    i1: 'lemon',
    m1: 'hammerhead',
    c1: 'tiger',
    d2: 'megamouth',
    i2: 'pyjama',
    m2: 'saw',
    c2: 'angel',
    d3: 'sand',
    i3: 'wobbegong',
    m3: 'nurse',
    c3: 'goblin',
  };

  let selectedSharkType = '';
  let maxScore = -1;

  for (const [key, score] of Object.entries(scores)) {
    let sharkCategory = '';
    if (score >= 75 && score <= 90) {
      sharkCategory = '1';
    } else if (score >= 50 && score < 75) {
      sharkCategory = '2';
    } else if (score < 50) {
      sharkCategory = '3';
    }

    if (sharkCategory) {
      const sharkKey = `${key}${sharkCategory}`;
      const sharkTypeValue = sharkTypes[sharkKey];
      if (
        score > maxScore ||
        (score === maxScore &&
          'dimc'.indexOf(key) < 'dimc'.indexOf(selectedSharkType[0]))
      ) {
        selectedSharkType = sharkTypeValue;
        maxScore = score;
      }
    }
  }

  return selectedSharkType;
};

// 상어 유형의 value로 label을 찾는 함수
const getSharkLabelByValue = (value: string): string => {
  const shark = SharkTypeText.find(shark => shark.value === value);
  return shark ? shark.label : '';
};

export { getSharkTypeByScore, getSharkLabelByValue, SharkTypeText };
