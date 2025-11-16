class LegoData {
  constructor() {
    this.sets = [];
    this.themes = [];
  }

  initialize() {
    return new Promise((resolve, reject) => {
      try {
        const themeData = [
          { id: "100", name: "Classic Town" },
          { id: "200", name: "Technic" },
          { id: "300", name: "Star Wars" },
          { id: "400", name: "City" }
        ];

        const setData = [
          {
            set_num: "001",
            name: "Starter Set",
            year: "2020",
            theme_id: "100",
            theme: "Classic Town",
            num_parts: "50",
            img_url: "https://fakeimg.pl/300x300?text=Starter"
          }
        ];

        this.themes = [...themeData];
        this.sets = [...setData];

        resolve();

      } catch (err) {
        reject(err);
      }
    });
  }

  getAllSets() {
    return this.sets.slice();
  }

  getAllThemes() {
    return Promise.resolve(this.themes.slice());
  }

  getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
      const set = this.sets.find(s => s.set_num == setNum);
      if (set) resolve(set);
      else reject("Set not found");
    });
  }

  getThemeById(id) {
    return new Promise((resolve, reject) => {
      const theme = this.themes.find(t => t.id == id);
      if (theme) resolve(theme);
      else reject("Unable to find requested theme");
    });
  }

  addSet(newSet) {
    return new Promise((resolve, reject) => {
      if (!newSet || !newSet.set_num) return reject("Invalid set data");

      const exists = this.sets.some(s => s.set_num == newSet.set_num);
      if (exists) return reject("Set already exists");

      this.sets.push({
        set_num: newSet.set_num,
        name: newSet.name,
        year: newSet.year,
        theme_id: newSet.theme_id,
        theme: newSet.theme,
        num_parts: newSet.num_parts,
        img_url: newSet.img_url
      });

      resolve();
    });
  }

  deleteSetByNum(setNum) {
    return new Promise((resolve, reject) => {
      const index = this.sets.findIndex(s => s.set_num == setNum);

      if (index === -1) return reject("Set not found");

      this.sets.splice(index, 1);
      resolve();
    });
  }
}

module.exports = LegoData;
