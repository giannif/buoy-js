/*eslint-disable no-unused-expressions*/
import _ from "lodash";
import parseData from "../src/parse-station-properties";
import {PARSE_ERROR} from "../src/parse-station-properties";
import {expect} from "chai";
import fs from "fs"
describe("parse station name and coords from station html", function() {
	it("should exist", function() {
		expect(parseData).to.be.a("function");
	});
	it("should parse data", function() {
		let DATA = fs.readFileSync("./test/data/station/station-name-coords.html")
		var result = parseData(DATA);
		expect(result).to.be.an("object")
		expect(_.isEmpty(result)).to.be.false;
		expect(result.id).to.equal("LTJF1")
		expect(result.name).to.equal("8720228 - Little Jetties, St. Johns River, FL")
		expect(result.latitude).to.equal(30.379)
		expect(result.longitude).to.equal(-81.446)
	});
	it("should parse alternate data", function() {
		let DATA = fs.readFileSync("./test/data/station/station-name-coords-2.html")
		var result = parseData(DATA);
		expect(result).to.be.an("object")
		expect(_.isEmpty(result)).to.be.false;
		expect(result.id).to.equal("LTJF1")
		expect(result.name).to.equal("Alternate Station")
		expect(result.latitude).to.equal(-30.379)
		expect(result.longitude).to.equal(81.446)
	});
	it("should throw errors", function() {
		expect(function() {
			parseData(12345)
		}).to.throw(PARSE_ERROR + " no id")
		expect(function() {
			parseData("<title>NDBC/Ravioli</title>")
		}).to.throw(PARSE_ERROR + " no coords")
	});
})
