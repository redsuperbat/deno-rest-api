import { Product } from "../types.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Response, RouteParams, Request } from "https://deno.land/x/oak/mod.ts";

let products: Product[] = [
  {
    id: "1",
    name: "First Product",
    description: "This product is mousssy",
    price: 29.22,
  },
  {
    id: "2",
    name: "Second Product",
    description: "For your best intrests",
    price: 400.22,
  },
  {
    id: "3",
    name: "Third Product",
    description: "Glossy finish",
    price: 35.22,
  },
  {
    id: "4",
    name: "Fourth Product",
    description: "Eyyyy LMAO",
    price: 1000,
  },
];

// @desc Get all products
// @route GET /api/v1/products

const getProducts = ({ response }: { response: Response }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @desc Get one product
// @route GET /api/v1/products/id

const getProduct = (
  { params, response }: { params: RouteParams; response: Response },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);
  if (product) {
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = { success: false, msg: "No product found" };
  }
};

// @desc Add product
// @route POST /api/v1/products

const addProduct = async (
  { response, request }: { response: Response; request: Request },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = { success: false, msg: "No data" };
  } else {
    const product = body.value as Product;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = { success: true, data: product };
  }
};

// @desc Update product
// @route PUT /api/v1/products/id

const updateProduct = async (
  { response, params, request }: {
    response: Response;
    params: RouteParams;
    request: Request;
  },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);
  if (product) {
    const body = await request.body();
    const updateData: { name?: string; description?: string; price?: number } =
      body.value;
    console.log(updateData, params);
    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );
    response.status = 203;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = { success: false, msg: "No product found" };
  }
};

// @desc Delete product
// @route DELETE /api/v1/products/id

const deleteProduct = (
  { response, params }: { response: Response; params: RouteParams },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    products = products.filter((p) => p.id !== params.id);
    response.status = 203;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = { success: false, msg: "No product found" };
  }
};

export { getProducts, updateProduct, deleteProduct, addProduct, getProduct };
