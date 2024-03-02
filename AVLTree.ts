import AVLNode from "./AVLNode";

class AVLTree {
    public root: AVLNode | null;
    constructor() {
        this.root = null;
    }

    private getHeight(node: AVLNode | null): number {   // Method to return the height of the tree
        return node ? node.height: 0;
    }
    private updateHeight(node: AVLNode) : void {
        node.height = 1+Math.max(this.getHeight(node.left),
        this.getHeight(node.left));
    }

    private getBalancedFactor(node: AVLNode): number {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    public insert(key: number): void {      // Method to insert into the tree.
        this.root = this.insertData(this.root, key);
    }
    private insertData(node: AVLNode | null, key: number): AVLNode {
        if (!node) {
            return new AVLNode(key);
        } else if (key < node.key) {
            node.left = this.insertData(node.left, key);node;
        } else if (key > node.key) {
            node.right = this.insertData(node.right, key);node;
        } else {
            return node;
        }
        this.updateHeight(node);
        let balance: number = this.getBalancedFactor(node);
        if(balance > 1) {
            let select = node.left as AVLNode;
            if (key < select.key) {
                return this.rightRotate(node);
            } else {
                node.left = this.leftRotate(node.left as AVLNode);
                return this.rightRotate(node);
            }
        } else if (balance < -1) {
            let select = node.left as AVLNode;
            if (key > select.key) {
                return this.leftRotate(node);
            } else {
                node.right = this.rightRotate(node.left as AVLNode);
                return this.leftRotate(node);
            }
        }
        return node;
    }

    private rightRotate(node: AVLNode): AVLNode {
        let x: AVLNode = node.left as AVLNode;
        let T2 = x.right as AVLNode;
        x.right = node;
        node.left = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    }

    private leftRotate(node: AVLNode): AVLNode {
        let x: AVLNode = node.right as AVLNode;
        let T2 = x.left as AVLNode;
        x.right = node;
        node.left = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    }

    public search(value: number): boolean | undefined {   // Method to search for a node.
        var current = this.root, found = false;
        while(current && !found) {
            if(value < current.key) {
                current = current.left;
            }else if(value > current.key) {
                current = current.right;
            }else {
                found = true;
            }
        }
        if(!found) return false;
    }

    public countNode(): number {   // Method to count the total no.of nodes.
        var node = this.root, data = [], queue = [];
        queue.push(node.key);
        while(queue.length){
            node = queue.shift();
            data.push(node.key)
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
        }
        return data.length;
    }

    public deletion(value: number): void {  // Method to delete a node
        var remove = this.search(value);
        if(remove) {

        }
    }
}

export default AVLTree;