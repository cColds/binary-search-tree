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

	#levelOrder(callback, root = this.root, queue = []) {
		if (root == null) return;
		queue.push(root);
		let nodeTraverseOrder = [];
		while (queue.length) {
			const current = queue[0];
			if (current.left != null) queue.push(current.left);
			if (current.right != null) queue.push(current.right);
			nodeTraverseOrder.push(queue.shift());
		}

		return typeof callback !== "function"
			? nodeTraverseOrder
			: callback(nodeTraverseOrder);
	}

	levelOrder(callback) {
		return this.#levelOrder(callback);
	}

	#preorder(nodeTraverseOrder, root = this.root) {
		if (root == null) return null;
		nodeTraverseOrder.push(root.value);
		this.#preorder(nodeTraverseOrder, root.left);
		this.#preorder(nodeTraverseOrder, root.right);

		return root;
	}

	preorder(callback) {
		const nodeTraverseOrder = [];
		this.#preorder(nodeTraverseOrder);
		return typeof callback !== "function"
			? nodeTraverseOrder
			: callback(nodeTraverseOrder);
	}

	inorder() {}

	postorder(callback) {}

	prettyPrint(node, prefix = "", isLeft = true) {
		if (node == null) return null;

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

const binaryTree = new Tree([1, 2, 3, 4, 5, 8]);

console.log(binaryTree.preorder((nodes) => nodes.map((node) => node * 10)));

binaryTree.prettyPrint(binaryTree.root);
