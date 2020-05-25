import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getProduct,
} from "./controllers/products.ts";

const router = new Router();

router.get("/api/v1/products", getProducts);
router.delete("/api/v1/products/:id", deleteProduct);
router.post("/api/v1/products", addProduct);
router.put("/api/v1/products/:id", updateProduct);
router.get("/api/v1/products/:id", getProduct);

export default router;
