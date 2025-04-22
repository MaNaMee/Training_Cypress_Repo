class CartPage {
    // Locators
    cartLink = '.shop-menu > .nav > :nth-child(3)';
    breadcrumb = '.breadcrumb';
    productLocator = '[id^="product-"] > .cart_description > h4 > a'; // Matches all products dynamically
    checkoutButton = '.col-sm-6 > .btn';

    // Method to navigate to the cart
    navigateToCart() {
        cy.get(this.cartLink).should('contain', ' Cart').should('not.be.disabled').click();
    }

    // Method to verify cart page
    verifyCartPage() {
        cy.url().should('include', '/view_cart');
        cy.get(this.breadcrumb).should('contain', 'Shopping Cart').and('be.visible');
    }

    // Method to check if any product exists in the cart
    checkAnyProductInCart() {
        cy.get(this.productLocator).then((products) => {
            //actual checker if there are any products in the cart
            expect(products.length).to.be.greaterThan(0, 'No products found in the cart!');
        });
    }

    // Method to proceed to checkout
    proceedToCheckout() {
        cy.get(this.checkoutButton).should('not.be.disabled').click();
    }
}

export default new CartPage();