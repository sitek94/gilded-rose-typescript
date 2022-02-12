import {
  AGED_BRIE,
  BACKSTAGE_PASSES,
  GildedRose,
  Item,
  SULFURAS,
} from 'gilded-rose'

/*
  TODO: Consider creating helpers for tests setup, e.g.

  const { items, waitDays } = setup([
   createSulfuras(),
   createCommonItem(5, 6)
  ])

  waitDays(3)

  expect(items).toMatchInlineSnapshot('...')
 */

describe('Gilded Rose', () => {
  describe('updateQuality()', () => {
    it('should decrease `sellIn` and `quality` by 1', () => {
      const item: Item = new Item('common item', 5, 6)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
        Item {
          "name": "common item",
          "quality": 5,
          "sellIn": 4,
        }
      `)

      gildedRose.updateQuality()

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
        Item {
          "name": "common item",
          "quality": 4,
          "sellIn": 3,
        }
      `)
    })

    it('should decrease `quality` by 2, when `sellIn <= 0`', () => {
      const item: Item = new Item('common item', 1, 7)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
        Item {
          "name": "common item",
          "quality": 6,
          "sellIn": 0,
        }
      `)

      gildedRose.updateQuality()

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
        Item {
          "name": "common item",
          "quality": 4,
          "sellIn": -1,
        }
      `)

      gildedRose.updateQuality()

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
        Item {
          "name": "common item",
          "quality": 2,
          "sellIn": -2,
        }
      `)
    })

    it('should NOT decrease `quality` below 0', () => {
      const items: Item[] = [
        new Item('common item 1', 3, 1),
        new Item('common item 2', 1, 1),
        new Item('common item 3', 0, 0),
      ]
      const gildedRose = new GildedRose(items)

      gildedRose.updateQuality()
      gildedRose.updateQuality()
      gildedRose.updateQuality()

      expect(gildedRose.items).toMatchInlineSnapshot(`
        Array [
          Item {
            "name": "common item 1",
            "quality": 0,
            "sellIn": 0,
          },
          Item {
            "name": "common item 2",
            "quality": 0,
            "sellIn": -2,
          },
          Item {
            "name": "common item 3",
            "quality": 0,
            "sellIn": -3,
          },
        ]
      `)
    })

    it('should increase `quality` of "Aged Brie" by 1', () => {
      const item: Item = new Item(AGED_BRIE, 6, 0)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      gildedRose.updateQuality()
      gildedRose.updateQuality()
      gildedRose.updateQuality()

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
        Item {
          "name": "Aged Brie",
          "quality": 4,
          "sellIn": 2,
        }
      `)
    })

    it('should increase `quality` of "Aged Brie" by 2, when `sellIn <= 0`', () => {
      const item: Item = new Item(AGED_BRIE, 0, 0)
      const gildedRose = new GildedRose([item])

      gildedRose.updateQuality()
      gildedRose.updateQuality()
      gildedRose.updateQuality()
      gildedRose.updateQuality()

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
        Item {
          "name": "Aged Brie",
          "quality": 8,
          "sellIn": -4,
        }
      `)
    })

    it('should NOT increase `quality` above 50', () => {
      const items: Item[] = [
        new Item(AGED_BRIE, 1, 49),
        new Item(AGED_BRIE, 0, 49),
        new Item(AGED_BRIE, 0, 50),
      ]
      const gildedRose = new GildedRose(items)

      gildedRose.updateQuality()
      gildedRose.updateQuality()
      gildedRose.updateQuality()

      expect(gildedRose.items).toMatchInlineSnapshot(`
        Array [
          Item {
            "name": "Aged Brie",
            "quality": 50,
            "sellIn": -2,
          },
          Item {
            "name": "Aged Brie",
            "quality": 50,
            "sellIn": -3,
          },
          Item {
            "name": "Aged Brie",
            "quality": 50,
            "sellIn": -3,
          },
        ]
      `)
    })

    it('should NOT decrease `sellIn` and `quality` of "Sulfuras"', () => {
      const items: Item[] = [
        new Item(SULFURAS, 0, 80),
        new Item(SULFURAS, -1, 80),
      ]
      const gildedRose = new GildedRose(items)

      gildedRose.updateQuality()

      expect(gildedRose.items).toMatchInlineSnapshot(`
        Array [
          Item {
            "name": "Sulfuras, Hand of Ragnaros",
            "quality": 80,
            "sellIn": 0,
          },
          Item {
            "name": "Sulfuras, Hand of Ragnaros",
            "quality": 80,
            "sellIn": -1,
          },
        ]
      `)
    })

    it('should increase `quality` of "Backstage passes" by 1, when `sellIn > 10`', () => {
      const items: Item[] = [
        new Item(BACKSTAGE_PASSES, 11, 0),
        new Item(BACKSTAGE_PASSES, 12, 0),
        new Item(BACKSTAGE_PASSES, 13, 0),
      ]
      const gildedRose = new GildedRose(items)

      gildedRose.updateQuality()

      expect(gildedRose.items).toMatchInlineSnapshot(`
        Array [
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 1,
            "sellIn": 10,
          },
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 1,
            "sellIn": 11,
          },
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 1,
            "sellIn": 12,
          },
        ]
      `)
    })

    it('should increase `quality` of "Backstage passes" by 2, when `5 < sellIn <= 10`', () => {
      const items: Item[] = [
        new Item(BACKSTAGE_PASSES, 6, 0),
        new Item(BACKSTAGE_PASSES, 7, 0),
        new Item(BACKSTAGE_PASSES, 8, 0),
        new Item(BACKSTAGE_PASSES, 9, 0),
        new Item(BACKSTAGE_PASSES, 10, 0),
      ]
      const gildedRose = new GildedRose(items)

      gildedRose.updateQuality()

      expect(gildedRose.items).toMatchInlineSnapshot(`
        Array [
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 2,
            "sellIn": 5,
          },
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 2,
            "sellIn": 6,
          },
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 2,
            "sellIn": 7,
          },
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 2,
            "sellIn": 8,
          },
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 2,
            "sellIn": 9,
          },
        ]
      `)
    })

    it('should increase `quality` of "Backstage passes" by 3 when `0 < sellIn <= 5``', () => {
      const items: Item[] = [
        new Item(BACKSTAGE_PASSES, 1, 0),
        new Item(BACKSTAGE_PASSES, 2, 0),
        new Item(BACKSTAGE_PASSES, 3, 0),
        new Item(BACKSTAGE_PASSES, 4, 0),
      ]
      const gildedRose = new GildedRose(items)

      gildedRose.updateQuality()

      expect(gildedRose.items).toMatchInlineSnapshot(`
        Array [
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 3,
            "sellIn": 0,
          },
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 3,
            "sellIn": 1,
          },
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 3,
            "sellIn": 2,
          },
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 3,
            "sellIn": 3,
          },
        ]
      `)
    })

    it('should set `quality` of "Backstage passes" to 0, when `sellIn <= 0`', () => {
      const items: Item[] = [
        new Item(BACKSTAGE_PASSES, 1, 20),
        new Item(BACKSTAGE_PASSES, 2, 20),
        new Item(BACKSTAGE_PASSES, 3, 20),
      ]
      const gildedRose = new GildedRose(items)

      gildedRose.updateQuality()
      gildedRose.updateQuality()
      gildedRose.updateQuality()
      gildedRose.updateQuality()

      expect(gildedRose.items).toMatchInlineSnapshot(`
        Array [
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 0,
            "sellIn": -3,
          },
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 0,
            "sellIn": -2,
          },
          Item {
            "name": "Backstage passes to a TAFKAL80ETC concert",
            "quality": 0,
            "sellIn": -1,
          },
        ]
      `)
    })
  })
})
