/// <reference types="cypress" />

describe('geoJson - map', () => {

    it('should provide values', () => {

        cy.visit('http://localhost:3000')

        cy.get('#left').clear()
        cy.get('#right').clear()
        cy.get('#top').clear()
        cy.get('#bottom').clear()

        cy.get('.MuiButtonBase-root').should('be.disabled')
        cy.get('.instructions').contains('click anywhere to start over')
        cy.get('.full-size').click(150, 150)
        cy.get('.instructions').contains('pick first vertex')
        cy.get('.leaflet-marker-pane').find('.leaflet-marker-icon').should('not.exist')
        cy.get('.full-size').click(150, 150)
        cy.get('.leaflet-marker-pane').find('.leaflet-marker-icon').should('have.length', 1)
        cy.get('.full-size').click(200, 200)
        cy.get('.leaflet-marker-pane').find('.leaflet-marker-icon').should('not.exist')
        cy.get('.leaflet-interactive')
        cy.get('.instructions').contains('click anywhere to start over')

        cy.get('#left').invoke('val').should("be.ok");
        cy.get('#top').invoke('val').should("be.ok");

        cy.get('.MuiButtonBase-root').should('not.be.disabled')

    })
})