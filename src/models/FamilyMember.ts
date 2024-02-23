class FamilyMember{
	name: string;
	age: number;
	shoeSize: number;
	private _children: FamilyMember[] = [];
	gender: "M" | "F";

	constructor(name: string, age: number, shoeSize: number, children: FamilyMember[], gender: "M" | "F"){
		this.name = name;
		this.age = age;
		this.shoeSize = shoeSize;
		this.children = children;
		this.gender = gender;
	}

	get children(){
		return this._children;
	}

	set children(children: FamilyMember[]){
		for(const child of children){
			if(child.age < this.age){
				throw new Error("Child cannot be older than parent");
			}
		}
		this._children = children;
	}
}

export default FamilyMember;