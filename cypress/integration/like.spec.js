/// <reference types="cypress" />;
import '@testing-library/cypress/add-commands';

// describe('Nav 컴포넌트 테스트', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });

//   it('지역 선택 모달창 띄우기', () => {
//     cy.findByText('어디로 떠날까요?').click();
//   });
// });

describe('상세페이지 숙박 기간 선택 테스트', () => {
  beforeEach(() => {
    cy.visit('/findstay/7');
  });

  it('체크인 날짜 선택', () => {
    cy.findByText('날짜를 선택해주세요').click();
    cy.get('.CalendarDay').get('aria-disabled="false"');
  });
});
