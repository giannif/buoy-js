import degreesToDirection from "../src/util/degrees-to-direction";
import noaaDate from "../src/util/get-noaa-date";
import {expect} from "chai";

describe("degrees-to-direction", function() {
	it("should exist", function() {
		expect(degreesToDirection).to.be.a("function");
	});
	it("should convert a number to direction value", function() {
		expect(degreesToDirection(0)).to.equal("N");
		expect(degreesToDirection(360)).to.equal("N");
		expect(degreesToDirection(12)).to.equal("NNE");
		expect(degreesToDirection(34)).to.equal("NE");
		expect(degreesToDirection(60)).to.equal("ENE");
		expect(degreesToDirection(90)).to.equal("E");
		expect(degreesToDirection(120)).to.equal("ESE");
		expect(degreesToDirection(130)).to.equal("SE");
		expect(degreesToDirection(160)).to.equal("SSE");
		expect(degreesToDirection(180)).to.equal("S");
		expect(degreesToDirection(200)).to.equal("SSW");
		expect(degreesToDirection(215)).to.equal("SW");
		expect(degreesToDirection(240)).to.equal("WSW");
		expect(degreesToDirection(260)).to.equal("W");
		expect(degreesToDirection(290)).to.equal("WNW");
		expect(degreesToDirection(310)).to.equal("NW");
		expect(degreesToDirection(348.75)).to.equal("NNW");
	});
})

describe("noaa date", function() {
	it("should exist", function() {
		expect(noaaDate).to.be.a("function");
	});
	it("should return the correct value", function() {
		expect(noaaDate().length).to.equal(8, "dates are of lenght 8, e.g. 20150413");
		let date = new Date();
		date.setUTCFullYear(1981);
		date.setUTCDate(2);
		date.setUTCMonth(4);
		expect(noaaDate(date)).to.equal("19810502");
		date = new Date();
		date.setUTCFullYear(1981);
		date.setUTCDate(12);
		date.setUTCMonth(11);
		expect(noaaDate(date)).to.equal("19811212");
	});
});

