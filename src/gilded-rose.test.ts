import {
  AGED_BRIE,
  BACKSTAGE_PASSES,
  CONJURED,
  GildedRose,
  Item,
  SULFURAS,
} from 'gilded-rose'

describe('Gilded Rose', () => {
  describe('updateQuality()', () => {
    it('should decrease `sellIn` and `quality` by 1, when `sellIn > 0`', () => {
      const item: Item = new Item('common item', 5, 5)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(4)
      expect(gildedRose.items[0].quality).toBe(4)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(3)
      expect(gildedRose.items[0].quality).toBe(3)
    })

    it('should decrease `quality` by 2, when `sellIn <= 0`', () => {
      const item: Item = new Item('common item', 0, 6)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(4)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(2)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(0)
    })

    it('should NOT decrease `quality` below 0', () => {
      const item: Item = new Item('common item', 1, 0)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(0)
      expect(gildedRose.items[0].sellIn).toBe(0)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(0)
      expect(gildedRose.items[0].sellIn).toBe(-1)
    })

    it('should increase `quality` of "Aged Brie" by 1', () => {
      const item: Item = new Item(AGED_BRIE, 6, 0)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(1)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(2)
    })

    it('should increase `quality` of "Aged Brie" by 2, when `sellIn <= 0`', () => {
      const item: Item = new Item(AGED_BRIE, 0, 0)
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
      const item: Item = new Item(AGED_BRIE, 0, 49)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(50)

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(50)
    })

    it('should NOT decrease `sellIn` and `quality` of "Sulfuras"', () => {
      const item: Item = new Item(SULFURAS, 0, 80)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(0)
      expect(gildedRose.items[0].quality).toBe(80)
    })

    it('should increase `quality` of "Backstage passes" by 1, when `sellIn > 10`', () => {
      const item: Item = new Item(BACKSTAGE_PASSES, 13, 0)
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
      const item: Item = new Item(BACKSTAGE_PASSES, 10, 0)
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
      const item: Item = new Item(BACKSTAGE_PASSES, 5, 0)
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
      const item: Item = new Item(BACKSTAGE_PASSES, 0, 10)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].sellIn).toBe(-1)
      expect(gildedRose.items[0].quality).toBe(0)
    })

    it.skip('should decrease `quality` of "Conjured" item by 2, when `sellIn > 0`', () => {
      const item: Item = new Item(CONJURED, 4, 10)
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

    it.skip('should decrease `quality` of "Conjured" item by 4, when `sellIn <= 0`', () => {
      const item: Item = new Item(CONJURED, 0, 12)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(8)
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(4)
      gildedRose.updateQuality()
      expect(gildedRose.items[0].quality).toBe(0)
    })
  })
})
