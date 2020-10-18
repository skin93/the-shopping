import moment from 'moment'

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id
    this.items = items
    this.totalAmount = totalAmount
    this.date = date
  }

  // works for iOS only
  // get readableDate() {
  //   return this.date.toLocaleDateString('en-EN', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //   })
  // }

  get readableDate() {
    return moment(this.date).format('MMMM-DD-YYY, hh:mm')
  }
}

export default Order
