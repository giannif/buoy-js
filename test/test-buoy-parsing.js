import _ from "lodash";
import parseData from "../src/parse-buoy";
import {expect} from "chai";
import {BUOY_DATA} from "./data/buoy-data";
import {DATA} from "./data/expected-data";
describe("parse buoy station data", function() {
	it("should exist", function() {
		expect(parseData).to.be.a("function");
	});
	it("should parse data", function() {
		var actual = parseData(BUOY_DATA);
		_.each(actual.result, function(buoy, index) {
			var entry = DATA[index];
			// console.log("test.js:24 buoy",buoy);
			// console.log("test.js:26 expectedBuoy",entry);
			expect(_.omit(buoy, "date", "label")).to.deep.equal(_.omit(entry, "date", "label"));
		})
	});
})
