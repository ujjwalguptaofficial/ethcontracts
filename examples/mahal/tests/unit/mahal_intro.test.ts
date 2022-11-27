import { initiate, mount, getMount } from "@mahaljs/test-utils";
import MahalIntro from "@/components/mahal_intro.mahal";

describe("Mahal Intro", () => {
    let component;
    before(async () => {
        component = await mount(MahalIntro);
    });

    it("check h1", async () => {
        const h1 = component.find('h1');
        expect(h1.innerHTML).equal(`Welcome to the Mahal App`);
    });
});