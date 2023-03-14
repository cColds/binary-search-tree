# Binary Search Tree

# Description

My [Binary Search Tree](https://en.wikipedia.org/wiki/Binary_search_tree) implementation. It uses a `Tree` class to build a binary tree of nodes, with several methods, and a `Node` class to create a node.

# Node

## Constructor

-   `value` sets the node's value
-   `left` sets the node's left node
-   `right` sets the node's right node

# Tree

## Constructor

-   `root` retrieves the root

## Methods

-   `insert(value)` inserts a new node with the given value into the tree (no duplicates)
-   `remove(value)` removes the node of a given value from the tree
-   `find(value)` returns the node of a given value in the tree
-   `levelOrder()` traverses each node of the tree in level order
-   `inorder()` traverses each node of the tree inorder
-   `preorder()` traverses each node of the tree preorder
-   `postorder()` traverses each node of the tree postorder
-   `height()` returns the height of a node -- defined as the longest path between the node and a leaf node
-   `depth()` returns the depth of a node -- defined as the distance between the node and the root
-   `isBalanced()` returns true/false based on whether or not the tree is balanced
-   `rebalance()` rebalances the tree
-   `prettyPrint` prints the tree to the console in a binary tree hierarchy
