class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.x = 0;
        this.y = 0;
    }
}

class ForwardList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    push_back(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.count++;
    }

    erase(it) {
        if (it.current === this.head) {
            this.head = this.head.next;
            it.current.next = null;
            it.current = this.head;
        } else {
            let current = this.head;
            while (current.next !== it.current) {
                current = current.next;
            }
            current.next = it.current.next;
            it.current.next = null;
            it.current = current.next;
        }
        this.count--;
    }

    print() {
        if (this.head === null) {
            console.log("[]");
        } else {
            let result = "[";
            let current = this.head;
            while (current.next !== null) {
                result += current.data + ", ";
                current = current.next;
            }
            result += current.data + "]";
            console.log(result);
        }
    }

    clear() {
        if (this.head !== null) {
            this.head = null;
            this.tail = null;
            this.count = 0;
        }
    }

    search(data) {
        let current = this.head;
        while (current !== null) {
            if (current.data === data) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    push_front(data) {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.count++;
    }

    // Iterator implementation
    [Symbol.iterator]() {
        let current = this.head;
        return {
            next: () => {
                const done = current === null;
                const value = done ? undefined : current.data;
                if (!done) {
                    current = current.next;
                }
                return { value, done };
            }
        };
    }
}
