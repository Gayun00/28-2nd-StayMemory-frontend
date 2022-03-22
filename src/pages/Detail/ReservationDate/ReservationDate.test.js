/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReservationDate from './ReservationDate';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ReservationDate', () => {
  let getUnavaliableDate;
  let startDate;
  let endDate;
  let setStartDate;
  let setEndDate;
  beforeEach(() => {
    getUnavaliableDate = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
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
    const selectDateButton = screen.getByText('날짜를 선택해주세요');
    userEvent.click(selectDateButton);

    expect(getUnavaliableDate).toHaveBeenCalled();
  });
});
