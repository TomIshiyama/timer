import { PreferenceIDB } from "@renderer/components/page/preference/type";
import Dexie, { Table } from "dexie";

// There is no longer a document for SolidJS. So, I really inspired the following link of React.
// see. https://dexie.org/docs/Tutorial/React

export class MySubClassedDexie extends Dexie {
  // 'preference' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  preference!: Table<PreferenceIDB>;

  constructor() {
    super("myDatabase");
    this.version(4).stores({
      preference: "id, work, shortBreak, longBreak, longBreakInterval, sectionLimit"
    });
  }
}

export const db = new MySubClassedDexie();
