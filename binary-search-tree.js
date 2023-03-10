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
		// while temp left/right != null, run loop
		// if value > temp.value and temp.right != null, temp = temp.right, continue
		// else if value < temp.value and temp.left != null, temp = temp.left, continue
		// otherwise if both conditions are false, break out of the loop

		// once loop is complete, create a new Node with value
		let temp = this.root;

		while (temp.left != null || temp.right != null) {
			if (value > temp.value && temp.right != null) {
				temp = temp.right;
				continue;
			} else if (value < temp.value && temp.left != null) {
				temp = temp.left;
				continue;
			}
			break;
		}
		console.log(temp);
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

let binaryTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
binaryTree.insert(20);
binaryTree.insert(25);

binaryTree.insert(15);
binaryTree.insert(-5);

binaryTree.prettyPrint(binaryTree.root);
