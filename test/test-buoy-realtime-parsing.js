import _ from "lodash";
import parseData from "../src/parse-realtime-buoy-data";
import {PARSE_ERROR} from "../src/parse-realtime-buoy-data";
import {expect} from "chai";
import {BUOY_DATA} from "./data/buoy-data";
import {DATA} from "./data/expected-data";
describe("parse buoy station data", function() {
	it("should exist", function() {
		expect(parseData).to.be.a("function");
	});
	it("should parse the buoy string into an array of buoy records", function() {
		let actual = parseData(BUOY_DATA);
		expect(actual).to.be.an("array")
		expect(actual.length).to.equal(2)
		_.each(actual, function(buoy, index) {
			let expected = DATA[index];
            buoy.date = new Date(buoy.date);
			expect(buoy.date.toUTCString()).to.equal(expected.date)
			expect(_.omit(buoy, "date")).to.deep.equal(_.omit(expected, "date"));
		})
		expect(function() {
			parseData(12345)
		}).to.throw(PARSE_ERROR)

	});
	it("should get the specified number of records", function() {
		let actual = parseData(BUOY_DATA, 1);
		expect(actual).to.be.an("array")
		expect(actual.length).to.equal(1)
	});
})
