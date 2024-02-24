import { IFamilyMember, ITreeData } from "../types/types.ts";

class FamilyMember implements IFamilyMember {
    name: string;
    age: number;
    shoeSize: number;
    gender: "M" | "F";

    constructor(name: string, age: number, shoeSize: number, children: FamilyMember[], gender: "M" | "F") {
        this.name = name;
        this.age = age;
        this.shoeSize = shoeSize;
        this.children = children;
        this.gender = gender;
    }

    private _children: FamilyMember[] = [];

    get children() {
        return this._children;
    }

    set children(children: FamilyMember[]) {
        for (const child of children) {
            if (child.age > this.age) {
                throw new Error("Child cannot be older than parent");
            }
        }
        this._children = children;
    }

    public getTreeData(): ITreeData {
        return {
            name: this.name,
            attributes: {
                age: this.age,
                shoeSize: this.shoeSize,
                gender: this.gender
            },
            children: this.children.map((child) => child.getTreeData())
        };
    }
}

export default FamilyMember;