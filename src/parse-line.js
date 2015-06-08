export default function getArrayFromLine(line) {
	return line.replace(/\s{2,}/g, ' ').replace("#", "").split(" ");
}
