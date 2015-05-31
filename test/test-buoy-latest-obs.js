import _ from "lodash";
import parseData from "../src/parse-latest-observation-data";
import {expect} from "chai";
import testData from "./data/buoy-latest-obs-data";
import expected from "./data/expected-latest-obs-data";

describe("parse latest obs", function() {
	it("should exist", function() {
		expect(parseData).to.be.a("function");
	});
	it("should parse data", function() {
		var result = parseData(testData);
		_.each(result, function(buoy) {
			var expectedBuoy = expected[buoy.stationID]
			// console.log("test.js:24 buoy",buoy);
			// console.log("test.js:26 expectedBuoy",expectedBuoy);
			expect(_.omit(buoy, "date", "label")).to.deep.equal(_.omit(expectedBuoy, "date", "label"));
		})
	});
})
