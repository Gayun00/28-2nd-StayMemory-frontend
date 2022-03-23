/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReservationDate from './ReservationDate';
import { render } from '@testing-library/react';
import moment from 'moment';

describe('ReservationDate 예약 불가날짜 비활성화 처리 테스트', () => {
  let getUnavaliableDate;
  const startDate = '2022-03-26';
  let endDate;
  let setStartDate;
  let setEndDate;
  let unAvailableDates = [];
  let checkFirstUnAvailableDates;
  let disableDates;
  const focusedInput = 'endDate';
  let mockIsDisabledFunctionProps;

  beforeEach(() => {
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    getUnavaliableDate = jest
      .fn()
      .mockResolvedValue([
        '2022-03-29',
        '2022-03-30',
        '2022-04-01',
        '2022-04-04',
        '2022-04-05',
      ]);

    checkFirstUnAvailableDates = jest.fn().mockImplementation(() => {
      for (let i = 0; i < unAvailableDates.length; i++) {
        if (moment(unAvailableDates[i]).isAfter(startDate)) {
          return unAvailableDates[i];
        }
      }
    });

    disableDates = jest.fn().mockImplementation(momentDate => {
      const date = momentDate.format('YYYY-MM-DD');
      if (focusedInput === 'startDate') {
        return unAvailableDates.includes(date) ? true : false;
      } else if (focusedInput === 'endDate') {
        if (checkFirstUnAvailableDates()) {
          return unAvailableDates.includes(date) ||
            moment(date).isAfter(checkFirstUnAvailableDates())
            ? true
            : false;
        }
      }
    });

    mockIsDisabledFunctionProps = jest.fn().mockImplementation(() => {
      const startDate = '2022-03-26';
      let enabledDates = [];
      for (let i = 0; i < 31; i++) {
        const momentDate = moment(startDate).add(i, 'days');
        if (!disableDates(momentDate)) {
          enabledDates.push(momentDate.format('YYYY-MM-DD'));
        }
      }
      return enabledDates;
    });
  });

  it('컴포넌트 렌더링', async () => {
    await render(
      <ReservationDate
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    );
  });

  it('예약 불가 날짜 정보 받아오기', async () => {
    unAvailableDates = await getUnavaliableDate();

    expect(unAvailableDates).toEqual([
      '2022-03-29',
      '2022-03-30',
      '2022-04-01',
      '2022-04-04',
      '2022-04-05',
    ]);
  });

  it('선택한 체크인 날짜 26일 이후 첫번째 예약 불가 날짜 29일 찾기', () => {
    expect(checkFirstUnAvailableDates()).toBe('2022-03-29');
  });

  it('선택한 체크인 날짜와 첫번째 예약 불가날짜 사이 구간 26~28일만 선택 가능하도록 하기', () => {
    expect(mockIsDisabledFunctionProps()).toStrictEqual([
      '2022-03-26',
      '2022-03-27',
      '2022-03-28',
    ]);
  });
});
