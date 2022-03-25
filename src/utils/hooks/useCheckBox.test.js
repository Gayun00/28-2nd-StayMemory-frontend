/**
 * @jest-environment jsdom
 */

import { TYPE_DATA } from '../constants';

describe('체크박스 테스트', () => {
  let handleCheckedAll;
  let isCheckedAll;
  let isChecked;
  let state;
  let stateKey;
  let stateValue;
  let data;

  beforeEach(() => {
    state = {
      category: ['guesthouse'],
    };
    data = TYPE_DATA.category;

    stateKey = Object.keys(state)[0];
    stateValue = state[stateKey];

    isChecked = property => {
      return stateValue.includes(property);
    };

    isCheckedAll = () => {
      return data.every(obj => stateValue.includes(obj.name));
    };

    handleCheckedAll = () => {
      let updatedList = [];

      if (!isCheckedAll()) {
        data.forEach(obj => {
          updatedList.push(obj.name);
        });
      }

      const updatedState = {
        [stateKey]: updatedList,
      };

      return updatedState;
    };
  });

  it('isChecked(): 체크 여부 테스트', () => {
    state = {
      category: ['guesthouse'],
    };
    expect(isChecked('guesthouse')).toBe(true);
  });

  it('isCheckedAll: 모든 항목 체크 여부 테스트', () => {
    state = {
      category: ['guesthouse', 'hotel'],
    };
    stateValue = state[stateKey];
    expect(isCheckedAll()).toEqual(true);
  });

  it('handleCheckAll(): 전체 선택 기능 테스트 ', () => {
    state = {
      category: ['guesthouse'],
    };
    expect(handleCheckedAll()).toEqual({
      category: ['guesthouse', 'hotel'],
    });
  });
});
