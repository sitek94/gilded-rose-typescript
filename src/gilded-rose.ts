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
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      const { name, sellIn, quality } = item

      // TODO: A lot of duplication here, take care of it in the next step

      switch (item.name) {
        case AGED_BRIE:
          const agedBrieItem = new AgedBrie(name, sellIn, quality)
          agedBrieItem.updateQuality()
          this.items[i] = agedBrieItem
          break

        case SULFURAS:
          break

        case BACKSTAGE_PASSES:
          const backstagePassesItem = new BackstagePasses(name, sellIn, quality)
          backstagePassesItem.updateQuality()
          this.items[i] = backstagePassesItem
          break

        case CONJURED:
          const conjuredItem = new Conjured(name, sellIn, quality)
          conjuredItem.updateQuality()
          this.items[i] = conjuredItem
          break

        default:
          const normalItem = new Normal(name, sellIn, quality)
          normalItem.updateQuality()
          this.items[i] = normalItem
      }
    }

    return this.items
  }
}

class Normal extends Item {
  updateQuality() {
    this.sellIn--

    if (this.canDecreaseQuality()) {
      this.quality--
    }
    if (this.hasExpired() && this.canDecreaseQuality()) {
      this.quality--
    }
  }

  canDecreaseQuality() {
    return this.quality > 0
  }

  hasExpired() {
    return this.sellIn < 0
  }
}

class AgedBrie extends Item {
  updateQuality() {
    this.sellIn--

    if (this.quality < 50) {
      this.quality++
    }

    if (this.sellIn < 0 && this.quality < 50) {
      this.quality++
    }
  }
}

class BackstagePasses extends Item {
  updateQuality() {
    this.sellIn--
    if (this.sellIn < 0) {
      return (this.quality = 0)
    }

    if (this.quality < 50) {
      this.quality++
    }

    if (this.sellIn < 10 && this.quality < 50) {
      this.quality++
    }

    if (this.sellIn < 5 && this.quality < 50) {
      this.quality++
    }
  }
}

class Conjured extends Item {
  updateQuality() {
    this.sellIn--

    if (this.quality > 0) {
      this.quality -= 2
    }

    if (this.sellIn < 0 && this.quality > 0) {
      this.quality -= 2
    }
  }
}
