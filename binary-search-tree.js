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

	insert(value, root = this.root) {
		if (root == null) {
			root = new Node(value);
			return root;
		}

		if (value < root.value) {
			root.left = this.insert(value, root.left);
		} else if (value > root.value) {
			root.right = this.insert(value, root.right);
		}

		return root;
	}

	delete(value, root = this.root) {
		// Base case

		if (root == null) {
			return root;
		}

		// Traverse tree

		if (value < root.value) {
			root.left = this.delete(value, root.left);
		} else if (value > root.value) {
			root.right = this.delete(value, root.right);
		} else {
			// Delete node

			// 0 / 1 child(ren) node(s)
			if (root.left == null) return root.right;
			if (root.right == null) return root.left;

			// if both condition fail, node must have two children

			let pointer = root.right;
			while (pointer.left != null) {
				pointer = pointer.left;
			}
			console.log(pointer);
			let preserveNode = root.left;
			root = pointer; // Get next node just bigger than the root
			root.left = preserveNode; // Keep rest of nodes
		}

		return root;
	}

	find(value, root = this.root) {
		if (root == null) return null;

		if (value < root.value) {
			return this.find(value, root.left);
		} else if (value > root.value) return this.find(value, root.right);

		return root;
	}

	prettyPrint(node, prefix = "", isLeft = true) {
		if (node.right != null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? "│   " : "    "}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
		if (node.left != null) {
			this.prettyPrint(
				node.left,
				`${prefix}${isLeft ? "    " : "│   "}`,
				true
			);
		}
	}
}

let binaryTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

binaryTree.prettyPrint(binaryTree.root);
