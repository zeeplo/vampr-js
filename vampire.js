class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      count += 1;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) return this;
    for (let child of this.offspring) {
      const nextChild = child.vampireWithName(name);
      if (nextChild) return nextChild;
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let count = 0;
    for (let child of this.offspring) {
      count += child.totalDescendents + 1;
    }
    return count;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennialVampiresArr = [];

    if (this.yearConverted > 1980) millennialVampiresArr.push(this);

    for (let child of this.offspring) {
      millennialVampiresArr = millennialVampiresArr.concat(child.allMillennialVampires);
    }

    return millennialVampiresArr;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;

