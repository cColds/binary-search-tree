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

	delete(value) {
		// STEP 1: if current.left == null && current.right == null
		// set previous pointer of current to null

		// ONE CHILD NODE
		// STEP 2: else if current.left == null && current.right != null || current.left != null && current.right == null
		// copy current[left / right] in a  variable
		// set previous pointer of current node to the copied node

		// TWO CHILD NODES
		// STEP 3: else if current.left != null && current.right != null
		// current.value is the one to delete and it has two children
		// create root = current
		// set current to current.right
		// loop until current.left is null
		// previous = current
		// if current.left != null
		// current = current.left
		// root.right.right =
		// maybe recursion
		let previous = null;
		let current = this.root;
		while (current.value !== value) {
			if (current.value < value && current.right != null) {
				previous = current;
				current = current.right;
				continue;
			} else if (current.value > value && current.left != null) {
				previous = current;
				current = current.left;
				continue;
			}

			break;
		}

		if (current.left == null && current.right == null) {
			previous[value > previous.value ? "right" : "left"] = null;
		} else if (
			(current.left == null && current.right != null) ||
			(current.left != null && current.right == null)
		) {
			const copyCurrentChildNode =
				current[current.left != null ? "left" : "right"];

			previous[
				previous.right.value === current.value ? "right" : "left"
			] = copyCurrentChildNode;
		}
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

let binaryTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
binaryTree.insert(15);
binaryTree.insert(20);
binaryTree.prettyPrint(binaryTree.root);
