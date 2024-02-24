interface IFamilyMember {
    name: string;
    age: number;
    shoeSize: number;
    gender: "M" | "F";
    children: IFamilyMember[];

    getTreeData(): ITreeData;
}

interface ITreeData {
    name: string;
    attributes: {
        age: number;
        shoeSize: number;
        gender: "M" | "F";
    };
    children: ITreeData[];
}

export type { IFamilyMember, ITreeData };