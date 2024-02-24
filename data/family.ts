/* Family tree for Henning */
import FamilyMember from "../src/models/FamilyMember";

const lars = new FamilyMember("Lars", 20, 46, [], "M");
const iben = new FamilyMember("Iben", 26, 38, [], "F");
const bente = new FamilyMember("Bente", 46, 37, [lars], "F");
const viggo = new FamilyMember("Viggo", 47, 42, [iben], "M");
const henning = new FamilyMember("Henning", 65, 44, [viggo, bente], "M");

const family: FamilyMember[] = [henning, viggo, bente, iben, lars];

export { family, henning };
