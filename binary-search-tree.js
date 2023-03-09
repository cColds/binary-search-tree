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

// Step 1: start > end, return null

// Step 2: otherwise, get mid
// Step 3: create a new Node with array[mid] to get root of the subarray
// Step 4: set left root to recursively call buildTree.
// Step 5: set right root to recursively call buildTree
// Step 6: return array[mid] to get mid back to Tree
// repeat all steps, or stop when step 1 is true

function buildTree(array) {
	const tree = [...new Set(array.sort())];

	if (0 > tree.length - 1) return null;

	const mid = Math.floor((tree.length - 1) / 2);
	const root = new Node(tree[mid]);

	root.left = buildTree(tree.slice(0, mid)); // -1
	root.right = buildTree(tree.slice(mid + 1, tree.length));

	return root;
}

let binaryTree = new Tree([1, 2, 3, 4, 5, 6, 7]);
console.dir(binaryTree, { depth: null });
