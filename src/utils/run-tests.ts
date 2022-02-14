import type { GildedRose, Item } from 'types'
import { ItemName } from 'types'

export function runTests(GildedRose: GildedRose, Item: Item) {
  describe('Gilded Rose', () => {
    it('should decrease `sellIn` and `quality` by 1, when `sellIn > 0`', () => {
      const item = new Item('common item', 3, 10)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(2)
      expect(gildedRose.items[0].quality).toBe(9)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(1)
      expect(gildedRose.items[0].quality).toBe(8)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(0)
      expect(gildedRose.items[0].quality).toBe(7)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(-1)
      // `sellIn` is not greater than 0, so `quality` should not be decreased
      // by 1 anymore
      expect(gildedRose.items[0].quality).not.toBe(6)
    })

    it('should decrease `quality` by 2, when `sellIn <= 0`', () => {
      const item = new Item('common item', 0, 6)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(4)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(2)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(0)
    })

    it('should NOT decrease `quality` below 0', () => {
      const item = new Item('common item', 1, 0)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(0)
      expect(gildedRose.items[0].sellIn).toBe(0)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(0)
      expect(gildedRose.items[0].sellIn).toBe(-1)
    })

    it('should increase `quality` of "Aged Brie" by 1', () => {
      const item = new Item(ItemName.AgedBrie, 6, 0)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(1)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(2)
    })

    it('should increase `quality` of "Aged Brie" by 2, when `sellIn <= 0`', () => {
      const item = new Item(ItemName.AgedBrie, 0, 0)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(2)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(4)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(6)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(8)
    })

    it('should NOT increase `quality` above 50', () => {
      const item = new Item(ItemName.AgedBrie, 0, 49)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(50)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(50)
    })

    it('should NOT decrease `sellIn` and `quality` of "Sulfuras"', () => {
      const item = new Item(ItemName.Sulfuras, 0, 80)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(0)
      expect(gildedRose.items[0].quality).toBe(80)
    })

    it('should increase `quality` of "Backstage passes" by 1, when `sellIn > 10`', () => {
      const item = new Item(ItemName.BackstagePasses, 13, 0)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(12)
      expect(gildedRose.items[0].quality).toBe(1)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(11)
      expect(gildedRose.items[0].quality).toBe(2)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(10)
      expect(gildedRose.items[0].quality).toBe(3)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(9)
      expect(gildedRose.items[0].quality).not.toBe(4)
    })

    it('should increase `quality` of "Backstage passes" by 2, when `5 < sellIn <= 10`', () => {
      const item = new Item(ItemName.BackstagePasses, 10, 0)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(9)
      expect(gildedRose.items[0].quality).toBe(2)
      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(8)
      expect(gildedRose.items[0].quality).toBe(4)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(7)
      expect(gildedRose.items[0].quality).toBe(6)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(6)
      expect(gildedRose.items[0].quality).not.toBe(6)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(5)
      expect(gildedRose.items[0].quality).not.toBe(8)
    })

    it('should increase `quality` of "Backstage passes" by 3 when `0 < sellIn <= 5``', () => {
      const item = new Item(ItemName.BackstagePasses, 5, 0)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(4)
      expect(gildedRose.items[0].quality).toBe(3)
      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(3)
      expect(gildedRose.items[0].quality).toBe(6)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(2)
      expect(gildedRose.items[0].quality).toBe(9)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(1)
      expect(gildedRose.items[0].quality).toBe(12)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(0)
      expect(gildedRose.items[0].quality).toBe(15)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(-1)
      expect(gildedRose.items[0].quality).not.toBe(18)
    })

    it('should set `quality` of "Backstage passes" to 0, when `sellIn <= 0`', () => {
      const item = new Item(ItemName.BackstagePasses, 0, 10)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(-1)
      expect(gildedRose.items[0].quality).toBe(0)
    })

    it('should decrease `quality` of "Conjured" item by 2, when `sellIn > 0`', () => {
      const item = new Item(ItemName.Conjured, 4, 10)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(8)
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(6)
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(4)
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(2)
    })

    it('should decrease `quality` of "Conjured" item by 4, when `sellIn <= 0`', () => {
      const item = new Item(ItemName.Conjured, 0, 12)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(8)
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(4)
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(0)
    })
  })
}
