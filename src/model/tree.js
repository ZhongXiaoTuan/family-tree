import Person from './person';

export default class Tree {
  constructor(member = {}) {
    this.members = member;
    // this.tags = {};
    this.me = null;
    this.current = null;
  }

  add(person) {
    this.members[person.id] = person;
  }

  toString() {
    const cmpMembers = {};
    Object.values(this.members).forEach(person => {
      cmpMembers[person.id] = person.compress();
    });
    return JSON.stringify({
      members: cmpMembers,
      meId: this.me.id,
    });
  }

  has(person) {
    return Boolean(this.members[person.id]);
  }

  setMe(person) {
    if (!this.has(person)) {
      return false;
    }
    this.me = person;
    Object.values(this.members).forEach(one => {
      one.isMe = one === person;
    })
    return true;
  }

  setCurrent(person) {
    if (!this.has(person)) {
      return false;
    }
    const val = person === this.me ? null : person;
    this.current = val;
    Object.values(this.members).forEach(one => {
      one.isCurrent = one === val;
    });
    return true;
  }

  transpose() {
    if (this.current) {
      const me = this.me;
      this.setMe(this.current);
      this.setCurrent(me);
    }
  }

  relation() {
    // TODO: 关系计算
    return '未知';
  }

  // setTag(id, value, version) {
  //   const currentTag = this.tags[id];
  //   const person = this.members[id];
  //   if (person && (!currentTag || currentTag.version !== version)) {
  //     this.tags[id] = { value, version };
  //     const fellow = this.members[person.fellow];
  //     if (fellow) {
  //       this.setTag(fellow, value, version);
  //     }
  //     const mother = this.members[person.mother];
  //     if (mother) {
  //       this.setTag(mother, value - 1, version);
  //     }
  //     const father = this.members[person.father];
  //     if (father) {
  //       this.setTag(father, value -1, version);
  //     }
  //     person.offsprings.forEach(child => {
  //       this.setTag(this.members[child], value + 1, version);
  //     });
  //     person.exs.forEach(fellow => {
  //       this.setTag(this.members[fellow], value, version);
  //     });
  //   }
  // }

  // updateTags() {
  //   const version = (+new Date()).toString(36);
  //   if (!this.me) {
  //     return false;
  //   }
  //   this.setTag(this.me.id, 0, version);
  //   console.log(this.tags);
  // }
}
