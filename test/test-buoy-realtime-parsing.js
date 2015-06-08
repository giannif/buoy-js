import _ from "lodash";
import parseData from "../src/parse-realtime-buoy-data";
import {expect} from "chai";
import {BUOY_DATA} from "./data/buoy-data";
import {DATA} from "./data/expected-data";
describe("parse buoy station data", function() {
	it("should exist", function() {
		expect(parseData).to.be.a("function");
	});
	it("should match expected", function() {
		var actual = parseData(BUOY_DATA);
		expect(actual).to.be.an("array")
		expect(actual.length).to.equal(2)
		_.each(actual, function(buoy, index) {
			var expected = DATA[index];
			// console.log("parsed", buoy.date.toUTCString());
			// console.log("expected", expected.date.toUTCString());
			expect(buoy.date.toUTCString()).to.equal(expected.date)
			expect(_.omit(buoy, "date")).to.deep.equal(_.omit(expected, "date"));
		})
	});
})
