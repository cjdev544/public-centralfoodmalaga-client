export const types = {
  // UI
  uiIsLoading: '[UI] IsLoading',
  uiShowModal: '[UI] SetShowModal',

  // Auth
  login: '[Auth] Login',
  logout: '[Auth] Logout',
  updateName: '[Auth] UpdateName',
  updateEmail: '[Auth] UpdateEmail',

  // Data
  getRestaurants: '[Data] GetRestaurants',
  getProducts: '[Data] GetProducts',
  getProduct: '[Data] GetProduct',
  getShippingCost: '[Data] GetShippingCost',
  isOpenRestaurant: '[Data] IsOpenRestaurant',
  getDataHomepage: '[Data] GetDataHomepage',

  // Cart
  getProductsCart: '[Cart] GetProductsCart',
  addProductCart: '[Cart] AddProdutCart',
  updateProductCart: '[Cart] UpdateProductCart',
  removeProductCart: '[Cart] RemoveProductCart',
  removeAllProductsCart: '[Cart] RemoveAllProductsCart',

  // Data User
  getAddressesUser: '[DataUser] GetAddressesUser',
  createAddress: '[DataUser] CreateAddress',
  updateAddress: '[DataUser] UpdateAddress',
  deleteAddress: '[DataUser] DeleteAddress',

  // Orders
  getUserOrders: '[Orders] GetUserOrders',
  addNewOrder: '[Orders] AddNewOrder',
  changeOrder: '[Orders] ChangeOrder',
  getFirstBuyDiscount: '[Orders] GetFirstBuyDiscount',
  chsngeSumaryProduct: '[Orders] ChsngeSumaryProduct',
}
