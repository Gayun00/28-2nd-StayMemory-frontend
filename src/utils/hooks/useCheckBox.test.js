/**
 * @jest-environment jsdom
 */

import { TYPE_DATA } from '../constants';

describe('체크박스 테스트', () => {
  let handleCheckedAll;
  let isCheckedAll;
  let isChecked;
  let state;
  let data;

  beforeEach(() => {
    data = TYPE_DATA.category;

    isChecked = property => {
      return state.includes(property);
    };

    isCheckedAll = () => {
      return data.every(obj => state.includes(obj.name));
    };

    handleCheckedAll = () => {
      let updatedList = [];

      if (!isCheckedAll()) {
        data.forEach(obj => {
          updatedList.push(obj.name);
        });
      }
      return updatedList;
    };
  });
  it('isChecked(): 체크 여부 테스트', () => {
    state = ['guesthouse'];
    expect(isChecked('guesthouse')).toBe(true);
  });

  it('isCheckedAll: 모든 항목 체크 여부 테스트', () => {
    state = ['guesthouse', 'hotel'];
    expect(isCheckedAll()).toBe(true);
  });

  it('handleCheckAll(): 전체 선택 기능 테스트 ', () => {
    state = [];
    expect(handleCheckedAll()).toEqual(['guesthouse', 'hotel']);
  });
});
