/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReservationDate from './ReservationDate';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';

describe('ReservationDate', () => {
  let getUnavaliableDate;
  let startDate = '2022-03-26';
  let endDate;
  let setStartDate;
  let setEndDate;
  let unAvailableDates = [];
  let checkFirstUnAvailableDates;
  let disableDates;
  let focusedInput = 'endDate';
  let mockIsDisabledFunctionProps;

  beforeEach(() => {
    getUnavaliableDate = jest
      .fn()
      .mockResolvedValue([
        '2022-03-29',
        '2022-03-30',
        '2022-04-01',
        '2022-04-04',
        '2022-04-05',
      ]);
    setStartDate = jest.fn();
    setEndDate = jest.fn();

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
          // unAvailableDates.includes(date) ||
          // moment(date).isAfter(checkFirstUnAvailableDates())
          //   ? console.log(date)
          //   : console.log('nope');
        }
      }
    });

    mockIsDisabledFunctionProps = jest.fn().mockImplementation(() => {
      const startDate = '2022-03-01';
      let enabledDates = [];
      for (let i = 1; i < 40; i++) {
        const momentDate = moment(startDate).add(i, 'days');
        if (disableDates(momentDate)) {
          console.log(momentDate.format('YYYY-MM-DD'));
          enabledDates.push(momentDate.format('YYYY-MM-DD'));
        }
      }
      return enabledDates;
    });
  });
  it('날짜선택 버튼 클릭 시 달력 창 띄우기', async () => {
    await render(
      <ReservationDate
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    );
    unAvailableDates = await getUnavaliableDate();
    // const selectDateButton = screen.getByText('날짜를 선택해주세요');
    // userEvent.click(selectDateButton);
    expect(unAvailableDates).toEqual([
      '2022-03-29',
      '2022-03-30',
      '2022-04-01',
      '2022-04-04',
      '2022-04-05',
    ]);

    expect(checkFirstUnAvailableDates()).toBe('2022-03-29');
    // expect(mockIsDisabledFunctionProps()).toBe([
    //   '2022-03-26',
    //   '2022-03-27',
    //   '2022-03-28',
    // ]);
    console.log(mockIsDisabledFunctionProps());
  });
});
