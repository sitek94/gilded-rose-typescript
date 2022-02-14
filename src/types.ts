export enum ItemName {
  AgedBrie = 'Aged Brie',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
  BackstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
  Conjured = 'Conjured Mana Cake',
}

export class ItemClass {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}
}

export class GildedRoseClass {
  constructor(public items: ItemClass[] = []) {}

  updateQuality() {}
}

export type Item = typeof ItemClass
export type GildedRose = typeof GildedRoseClass
