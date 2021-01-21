const { log } = console;

function Group() {
  this.content = [];
}

Group.prototype.add = function (item) {
  this.content.includes(item) ? false : this.content.push(item);
};

Group.prototype.delete = function (item) {
  const { content } = this,
    index = content.indexOf(item);

  return content.splice(index, 1);
};

Group.prototype.has = function (item) {
  return this.content.includes(item);
};

Group.from = function (iterable) {
  let start = iterable[0],
    end = iterable[1],
    group = new Group();

  while (start !== end + 1) {
    group.add(start++);
  }

  return group;
};

function GroupIterator(group) {
  this.content = group.content;
  this.counter = -1;
}

GroupIterator.prototype.next = function () {
  let { content } = this;

  ++this.counter;

  if (this.counter === content.length)
    return {
      done: true,
    };

  return {
    value: content[this.counter],
    done: false,
  };
};

Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};
