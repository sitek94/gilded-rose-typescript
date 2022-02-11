import { GildedRose, Item } from 'gilded-rose';

describe('Gilded Rose', () => {
  describe('updateQuality()', () => {
    it('should decrease `sellIn` and `quality` by 1', () => {
      const item: Item = new Item('name', 5, 6);
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
              Item {
                "name": "name",
                "quality": 5,
                "sellIn": 4,
              }
          `);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
              Item {
                "name": "name",
                "quality": 4,
                "sellIn": 3,
              }
          `);
    });

    it('should decrease `quality` by 2, when `sellIn <= 0`', () => {
      const item: Item = new Item('name', 1, 7);
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
              Item {
                "name": "name",
                "quality": 6,
                "sellIn": 0,
              }
          `);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
              Item {
                "name": "name",
                "quality": 4,
                "sellIn": -1,
              }
          `);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
              Item {
                "name": "name",
                "quality": 2,
                "sellIn": -2,
              }
          `);
    });

    it('should NOT decrease `quality` below 0', () => {
      const items: Item[] = [
        new Item('name1', 3, 1),
        new Item('name2', 1, 1),
        new Item('name3', 0, 0),
      ];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();

      expect(gildedRose.items).toMatchInlineSnapshot(`
              Array [
                Item {
                  "name": "name1",
                  "quality": 0,
                  "sellIn": 0,
                },
                Item {
                  "name": "name2",
                  "quality": 0,
                  "sellIn": -2,
                },
                Item {
                  "name": "name3",
                  "quality": 0,
                  "sellIn": -3,
                },
              ]
          `);
    });

    it('should increase `quality` of "Aged Brie" by 1', () => {
      const item: Item = new Item('Aged Brie', 6, 0);
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
        Item {
          "name": "Aged Brie",
          "quality": 4,
          "sellIn": 2,
        }
      `);
    });

    it('should increase `quality` of "Aged Brie" by 2, when `sellIn <= 0`', () => {
      const item: Item = new Item('Aged Brie', 0, 0);
      const gildedRose = new GildedRose([item]);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toMatchInlineSnapshot(`
        Item {
          "name": "Aged Brie",
          "quality": 8,
          "sellIn": -4,
        }
      `);
    });

    it('should NOT increase `quality` above 50', () => {
      const items: Item[] = [
        new Item('Aged Brie', 1, 49),
        new Item('Aged Brie', 0, 49),
        new Item('Aged Brie', 0, 50),
      ];
      const gildedRose = new GildedRose(items);

      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();

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
      `);
    });
  });
});
