/// <reference types="cypress" />;
import '@testing-library/cypress/add-commands';

describe('검색 페이지 쿼리스트링 테스트', () => {
  beforeEach(() => {
    cy.visit('/list');
    cy.findByText('스테이 유형').click();
  });

  describe('숙박 유형 테스트', () => {
    it('한 가지 항목 선택 시 쿼리스트링 추가', () => {
      cy.findByLabelText('게스트하우스').click();
      cy.findByText('적용하기').click();
      expect(cy.url().should('contain', 'category=guesthouse'));
    });

    it('다수 항목 선택 시 하나의 키값에 함께 추가', () => {
      cy.findByLabelText('게스트하우스').click();
      cy.findByLabelText('호텔').click();
      cy.findByText('적용하기').click();
      expect(cy.url().should('contain', 'category=guesthouse%26hotel'));
    });
  });
});

describe('검색 페이지 click away 기능 테스트', () => {
  //
});
