describe("Mahal Intro", () => {
    it("check h1", () => {
        const h1 = document.querySelector('h1');
        expect(h1.innerHTML).equal(`Welcome to the Mahal App`);
    });
});