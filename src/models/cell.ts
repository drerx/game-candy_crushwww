enum CellAction {
	NORMAL = '',
	SELECTED = 'click',
	HORIZON = 'line',
	VERTICAL = 'column',
	WRAP = 'wrap',
}

function cellActionRandom(): CellAction {
	const v = randNumber(0, 2);
	return [CellAction.VERTICAL, CellAction.HORIZON, CellAction.WRAP][v];
}

class Cell {
	public mesh: MeshBase;
	public index:number;
	public crossing: boolean; //是否是十字消
	public colorIndex:number = -1;
	public action: CellAction = CellAction.NORMAL;

	constructor(mesh: MeshBase, index:number) {
		this.mesh = mesh;
		this.index = index;
		this.crossing = false;
	}

	public get color(): any {
		return this.colorIndex >= 0 && this.colorIndex < this.mesh.cellColors.length ? this.mesh.cellColors[this.colorIndex] : null;
	}

	public get row(): number {
		return this.mesh.row(this.index);
	}

	public get col(): number {
		return this.mesh.col(this.index);
	}

	public get block():boolean {
		return this.mesh.blocks.includes(this.index);
	}

	public sameColor(cell: Cell) : boolean {
		return !this.block && !cell.block ? this.colorIndex == cell.colorIndex : false;
	}

	public swap(toCell: Cell) : void {
		this.mesh.cells[toCell.index] = this;
		this.mesh.cells[this.index] = toCell;

		let index: number = this.index;
		this.index = toCell.index;
		toCell.index = index;
	}

	public to(toIndex: number) : number {
		this.mesh.cells[toIndex] = this;
		this.mesh.cells[this.index] = null;

		let index: number = this.index;
		this.index = toIndex;
		return index;
	}

}