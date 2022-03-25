/**
 * @jest-environment jsdom
 */

describe('객체와 배열 상태 변경 테스트', () => {
  let updateState;
  let testObj;
  let testObjWithArr;
  let state;
  let stateKey;

  beforeEach(() => {
    state = {
      category: ['guesthouse', 'hotel'],
    };
    stateKey = Object.keys(state)[0];

    updateState = (value, key = stateKey) => {
      if (Array.isArray(state[key])) {
        let updatedArray = [];
        let updatedState = [];
        if (!state[key].includes(value)) {
          updatedArray = [...state[key], value];
        } else {
          updatedArray = [...state[key]].filter(el => {
            return el !== value;
          });
        }
        updatedState = {
          [key]: updatedArray,
        };
        return updatedState;
      } else {
        let updatedState = {};
        updatedState = {
          ...state,
          [key]: value,
        };
        return updatedState;
      }
    };
    testObj = {
      checkin: '2022-03-22',
      checkout: '2022-03-26',
    };

    testObjWithArr = {
      category: ['guesthouse'],
    };
  });

  it('state가 객체일 떄 전달받은 key와 value로 상태변경', () => {
    state = testObj;
    expect(updateState('2022-03-24', 'checkin')).toEqual({
      checkin: '2022-03-24',
      checkout: '2022-03-26',
    });
  });

  it('변경할 state가 배열일 때 중복되는 값이 없으면 전달받은 value 추가', () => {
    state = testObjWithArr;
    stateKey = Object.keys(state)[0];

    expect(updateState('hotel')).toEqual({
      category: ['guesthouse', 'hotel'],
    });
  });

  it('변경할 state가 배열일 때 중복되는 값이 있으면 전달받은 value 삭제', () => {
    state = testObjWithArr;
    stateKey = Object.keys(state)[0];

    expect(updateState('guesthouse')).toEqual({
      category: [],
    });
  });
});
