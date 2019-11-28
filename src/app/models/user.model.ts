export interface User {
  username: string,
  password: String,
  email: String,
  level: {
    type: Number,
    default: 2
  },
  token: String,

  // current order
  order: {
    movieId: Number,
    dateRent: Date,
    dateArrival: Date,
    daysRent: Number,
    price: Number
  },

  // historic of orders
  orders: [{
    _id: false,
    movieId: Number,
    dateRent: Date,
    daysRent: Number,
    price: Number
  }]

}