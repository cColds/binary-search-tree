class Node {
	constructor(value, left = null, right = null) {
		this.value = value;
		this.left = left;
		this.right = right;
	}
}

class Tree {
	constructor(array) {
		this.root = buildTree(array);
	}
}

// Step 1: If left and right node are null (leaf nodes) / start > end, return null

// Step 2: otherwise, get mid
// Step 3: create a new Node with array[mid] to get root of the subarray
// Step 4: set left root to recursively call buildTree.
// Step 5: set right root to recursively call buildTree
// Step 6: return array[mid] to get mid back to Tree
// repeat all steps, or stop when step 1 is true

function buildTree(array) {
	const tree = [...new Set(array.sort())];

	if (0 > tree.length - 1) return null;
	console.log(tree);
	const mid = Math.floor(1 + (tree.length - 1) / 2);
	const root = new Node(tree[mid]);

	root.left = buildTree(tree.slice(0, mid));
	root.right = buildTree(tree.slice(mid, tree.length));

	return root;
}

let jim = new Tree([2, 3, 1, 6, 4, 5, 7]);
console.log(jim);
