export const AGED_BRIE = 'Aged Brie'
export const SULFURAS = 'Sulfuras, Hand of Ragnaros'
export const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert'
export const CONJURED = 'Conjured Mana Cake'

export class Item {
  name: string
  sellIn: number
  quality: number

  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

export class GildedRose {
  items: Array<Item>

  constructor(items = [] as Array<Item>) {
    this.items = items
  }

  updateQuality() {
    this.items.forEach((item) => {
      switch (item.name) {
        case AGED_BRIE:
          return this.updateAgedBrieItem(item)

        case SULFURAS:
          return this.updateSulfurasItem()

        case BACKSTAGE_PASSES:
          return this.updateBackstagePassesItem(item)

        case CONJURED:
          return this.updateConjuredItem(item)

        default:
          return this.updateNormalItem(item)
      }
    })

    return this.items
  }

  updateNormalItem(item: Item) {
    item.sellIn--

    if (item.quality > 0) {
      item.quality--
    }
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality--
    }
  }

  updateAgedBrieItem(item: Item) {
    item.sellIn--

    if (item.quality < 50) {
      item.quality++
    }

    if (item.sellIn < 0 && item.quality < 50) {
      item.quality++
    }
  }

  updateSulfurasItem() {}

  updateBackstagePassesItem(item: Item) {
    item.sellIn--
    if (item.sellIn < 0) {
      return (item.quality = 0)
    }

    if (item.quality < 50) {
      item.quality++
    }

    if (item.sellIn < 10 && item.quality < 50) {
      item.quality++
    }

    if (item.sellIn < 5 && item.quality < 50) {
      item.quality++
    }
  }

  updateConjuredItem(item: Item) {
    item.sellIn--

    if (item.quality > 0) {
      item.quality -= 2
    }

    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 2
    }
  }
}
