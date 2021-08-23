/// <reference types="cypress" />

describe('geoJson - form', () => {

  it('validation', () => {

    cy.visit('http://localhost:3000')
    cy.get('#left').clear()
    cy.get('#right').clear()
    cy.get('#top').clear()
    cy.get('#bottom').clear()

    cy.get('#left-helper-text').contains('required')
    cy.get('#right-helper-text').contains('required')
    cy.get('#top-helper-text').contains('required')
    cy.get('#left-helper-text').contains('required')
    cy.get('.MuiButtonBase-root').should('be.disabled')

    cy.get('#left').type('250')
    cy.get('#left-helper-text').contains('provide a value between -180 and +180')
    cy.get('#top').type('-450')
    cy.get('#top-helper-text').contains('provide a value between -90 and +90')

  })

  it('shows error 1', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.visit('http://localhost:3000')
    cy.get('input[name=left]').click().clear().type('0')
    cy.get('input[name=right]').clear().type('1')
    cy.get('input[name=top]').clear().type('0.26')
    cy.get('input[name=bottom]').clear().type('0')
    cy.get('.MuiButtonBase-root').click()

    cy.on('window:alert', (text) => {
      expect(text).to.contains('the selection is too large');
    });

  })

  it('shows error 2', () => {

    cy.visit('http://localhost:3000')
    cy.get('#left').clear().type('13.365')
    cy.get('#right').clear().type('13.425')
    cy.get('#top').clear().type('52.536')
    cy.get('#bottom').clear().type('52.510')
    cy.get('.MuiButtonBase-root').click()

    cy.on('window:alert', (text) => {
      expect(text).to.contains('You requested too many nodes (limit is 50000). Either request a smaller area, or use planet.osm');
    });
  })

  it('can submit', () => {
    cy.intercept('GET', 'https://www.openstreetmap.org/api/0.6/map?*').as('getBbox')

    cy.get('#left').clear().type('0')
    cy.get('#right').clear().type('0.001')
    cy.get('#top').clear().type('0.001')
    cy.get('#bottom').clear().type('0')
    cy.get('.MuiButtonBase-root').click()
    cy.get('.MuiButtonBase-root').should('be.disabled').contains('loading')

    cy.wait('@getBbox')
    cy.get('.pretty-json-container > :nth-child(1) > :nth-child(1)')
    cy.get('.top-panel > .MuiButton-root').invoke('attr', 'href').should('contain', 'blob:http://localhost:3000')

  })
})
