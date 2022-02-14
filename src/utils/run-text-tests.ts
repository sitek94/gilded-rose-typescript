import type { GildedRose, Item } from 'types'
import { ItemName } from 'types'

export function runTextTests(GildedRose: GildedRose, Item: Item) {
  const items = [
    new Item('+5 Dexterity Vest', 10, 20), //
    new Item(ItemName.AgedBrie, 2, 0), //
    new Item('Elixir of the Mongoose', 5, 7), //
    new Item(ItemName.Sulfuras, 0, 80), //
    new Item(ItemName.Sulfuras, -1, 80),
    new Item(ItemName.BackstagePasses, 15, 20),
    new Item(ItemName.BackstagePasses, 10, 49),
    new Item(ItemName.BackstagePasses, 5, 49),
    // this conjured item does not work properly yet
    new Item(ItemName.Conjured, 3, 6),
  ]

  const gildedRose = new GildedRose(items)
  const days: number = 10
  for (let i = 0; i < days; i++) {
    console.log('-------- day ' + i + ' --------')
    console.log('name, sellIn, quality')
    items.forEach((element) => {
      console.log(element.name + ' ' + element.sellIn + ' ' + element.quality)
    })
    console.log()
    gildedRose.updateQuality()
  }
}
