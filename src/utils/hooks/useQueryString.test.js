/**
 * @jest-environment jsdom
 */

describe('useQueryStringObject', () => {
  let testobj;
  let testObjWithArr;
  let testObjWithStr;
  let search;
  let parseObjectToSearchParams;
  let parseQueryIntoObject;
  let state;
  let URLSearch;

  beforeEach(() => {
    testobj = {
      checkin: '2022-03-22',
      checkout: '2022-03-26',
    };

    testObjWithArr = {
      category: ['guesthouse', 'hotel'],
    };

    testObjWithStr = {
      city: 'jeju',
    };

    search = '';
    URLSearch = new URLSearchParams(search);

    parseObjectToSearchParams = (obj = state, page = 'list') => {
      let updatedValue;

      Object.entries(obj).map(([key, value]) => {
        updatedValue = Array.isArray(value) ? value.join('&') : value;

        value && URLSearch.set(key, updatedValue);
      });
      return `/${page}?` + URLSearch.toString();
    };

    parseQueryIntoObject = querystring => {
      const params = new URLSearchParams(querystring);
      const obj = {};

      for (const key of params.keys()) {
        if (params.getAll(key).length > 1) {
          obj[key] = params.getAll(key);
        } else {
          obj[key] = params.get(key);
        }
      }

      return obj;
    };
  });

  it('객체를 쿼리스트링으로 변환', () => {
    expect(parseObjectToSearchParams(testobj)).toBe(
      '/list?checkin=2022-03-22&checkout=2022-03-26'
    );
  });

  it('쿼리스트링을 객체로 변환', () => {
    expect(
      parseQueryIntoObject(`checkin=2022-03-22&checkout=2022-03-26`)
    ).toEqual({
      checkin: '2022-03-22',
      checkout: '2022-03-26',
    });
  });

  it('배열을 value로 갖는 객체를 쿼리스트링으로 변환', () => {
    expect(parseObjectToSearchParams(testObjWithArr)).toBe(
      `/list?category=guesthouse%26hotel`
    );
  });

  it('문자열을 value로 갖는 객체를 쿼리스트링으로 변환', () => {
    expect(parseObjectToSearchParams(testObjWithStr)).toBe(`/list?city=jeju`);
  });
});
