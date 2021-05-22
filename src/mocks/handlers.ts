import { rest } from 'msw';
import { API_BASE_URL } from '../constants/API';
import { CartItem } from '../types';
import { CART_ITEM_LIST_MOCK, ORDER_LIST_MOCK, PRODUCT_LIST_MOCK } from './mockData';

let cartItemList = CART_ITEM_LIST_MOCK;
let orderList = ORDER_LIST_MOCK;

export const handlers = [
  rest.get(API_BASE_URL + '/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(PRODUCT_LIST_MOCK));
  }),

  rest.get(API_BASE_URL + '/customers/:userId/carts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartItemList));
  }),

  rest.delete(API_BASE_URL + '/customers/:userId/carts/:id', (req, res, ctx) => {
    const { id } = req.params;

    if (cartItemList.every((item) => item.cart_id !== id)) {
      return res(ctx.status(404), ctx.text("there's no id in db!"));
    }

    cartItemList = cartItemList.filter((item) => item.cart_id !== id);

    return res(ctx.status(200));
  }),

  rest.put(API_BASE_URL + '/customers/:userId/carts/:id?', (req, res, ctx) => {
    const { id } = req.params;

    if (cartItemList.every((item) => item.cart_id !== id)) {
      return res(ctx.status(404), ctx.json(req.body));
    }

    cartItemList = cartItemList.map((item) =>
      item.cart_id === id ? (req.body as CartItem) : item
    );

    return res(ctx.status(200), ctx.json(req.body));
  }),

  rest.get(API_BASE_URL + '/customers/:userId/orders', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(orderList));
  }),
];
