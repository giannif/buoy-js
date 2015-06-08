import degreesToDirection from "../src/util/degrees-to-direction";
import noaaDate from "../src/util/get-noaa-date";
import {expect} from "chai";

describe("degrees-to-direction", function() {
	it("should exist", function() {
		expect(degreesToDirection).to.be.a("function");
	});
	it("should work okay", function() {
		expect(degreesToDirection(0)).to.equal("N");
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

