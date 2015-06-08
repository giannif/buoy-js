import closestTideStation from "../src/util/closest-tide-station";
import {expect} from "chai";
import {TIDE_DATA} from "./data/tide";
import Tide from "../src/parse-tide";

describe("closest tide station", function() {
	it("should exist", function() {
		expect(closestTideStation).to.be.a("function");
	});
	it("find station", function() {
		expect(closestTideStation(33.855, -118.633).name).to.equal("SANTA MONICA");
		expect(closestTideStation(33.855, -118.633).distance).to.equal(20985);
		expect(closestTideStation(34.405, -119.692).name).to.equal("SANTA BARBARA");
		expect(closestTideStation(37.8031, -122.3971).name).to.equal("RINCON POINT, PIER 22 1/2");
	});
});

describe("parse tide data", function() {
	it("should get the current tide", function() {
		let testDate = new Date("2015-04-22 04:06 GMT+0000");
		let result = Tide.getCurrent(Tide.parse(TIDE_DATA), testDate);
		expect(result).to.be.an("object");
		expect(result.tideSize).to.equal(1.209);
		expect(result.isIncreasing).to.be.false;
		expect(result.tideSizeFeet).to.equal(3.6);
	});
	it("should get the next low tide", function() {
		let testDate = new Date("2015-04-22 00:00 GMT+0000");
		let result = Tide.getNextHighOrLow(Tide.parse(TIDE_DATA), testDate);
		expect(result).to.be.an("object");
		expect(result.tideSize).to.equal(0.485);
		expect(result.isHighTide).to.be.false;
		expect(result.tideSizeFeet).to.equal(1.4);
	});
	it("should get the next high tide", function() {
		let testDate = new Date("2015-04-22 01:36 GMT+0000");
		let result = Tide.getNextHighOrLow(Tide.parse(TIDE_DATA), testDate);
		expect(result).to.be.an("object");
		expect(result.tideSize).to.equal(1.436);
		expect(result.date.toUTCString()).to.equal("Wed, 22 Apr 2015 05:00:00 GMT");
		expect(result.isHighTide).to.be.true;
	});
	it("should return undefined if the tide data doesn't have a high/low", function() {
		let testDate = new Date("2015-04-22 05:00 GMT+0000");
		let result = Tide.getNextHighOrLow(Tide.parse(TIDE_DATA), testDate);
		expect(result).to.be.an("undefined");
	});
});

