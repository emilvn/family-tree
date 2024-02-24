import { IFamilyMember } from "../types.ts";

function calculateAverageShoeSize(familyMembers: IFamilyMember[]) {
    let average = 0;
    const sizes = familyMembers.map((m) => m.shoeSize);
    if (sizes.length != 0) {
        const total = sizes.reduce((a, b) => a + b, 0);
        average = total / sizes.length;
    }
    return average;
}

export { calculateAverageShoeSize };