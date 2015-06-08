/*eslint-disable no-unused-expressions*/
import _ from "lodash";
import parseData from "../src/parse-latest-observation-data";
import {expect} from "chai";
import testData from "./data/buoy-latest-obs-data";
import expected from "./data/expected-latest-obs-data";
describe("parse latest observation data", function() {
	it("should exist", function() {
		expect(parseData).to.be.a("function");
	});
	it("should parse data", function() {
		var result = parseData(testData);
		expect(result).to.be.an("object")
		expect(_.isEmpty(result)).to.be.false;
		_.each(result, function(buoy) {
			var expectedBuoy = expected[buoy.stationID]
			expect(buoy.date.toUTCString()).to.equal(expectedBuoy.date)
			expect(_.omit(buoy, "date")).to.deep.equal(_.omit(expectedBuoy, "date"));
		})
	});
})
