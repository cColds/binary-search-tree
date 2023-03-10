class Node {
	constructor(value, left = null, right = null) {
		this.value = value;
		this.left = left;
		this.right = right;
	}
}

class Tree {
	constructor(array) {
		this.root = this.buildTree(array);
	}

	buildTree(array) {
		const tree = [...new Set(array.sort((a, b) => a - b))];

		if (0 > tree.length - 1) return null;

		const mid = Math.floor((tree.length - 1) / 2);
		const root = new Node(tree[mid]);
		root.left = this.buildTree(tree.slice(0, mid));
		root.right = this.buildTree(tree.slice(mid + 1, tree.length));

		return root;
	}

	insert(value) {
		// create temp = this.root
		// while temp != null, run loop
		// if value > temp, temp = temp.right
		// else temp = temp.left

		// once loop is finished, create a new Node with value
		let temp = this.root;

		while (temp.left != null && temp.right != null) {
			temp = value > temp.value ? temp.right : temp.left;
		}

		temp[value > temp.value ? "right" : "left"] = new Node(value);
	}

	prettyPrint(node, prefix = "", isLeft = true) {
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? "│   " : "    "}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
		if (node.left !== null) {
			this.prettyPrint(
				node.left,
				`${prefix}${isLeft ? "    " : "│   "}`,
				true
			);
		}
	}
}

let binaryTree = new Tree([1, 2, 3, 4, 5, 6, 7]);
binaryTree.insert(92);
binaryTree.insert(45);

console.dir(binaryTree.root, { depth: null });
binaryTree.prettyPrint(binaryTree.root);
