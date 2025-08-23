import { categories } from '@/data';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Load environment variable
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: async (headers) => {
      return new Promise((resolve) => {
        
        async function checkToken() {
          const clerk = window.Clerk;
          if (clerk) {
            const token = await clerk.session?.getToken();
            headers.set("Authorization", `Bearer ${token}`);
            resolve(headers);
          } else {
            setTimeout(checkToken, 500);
          }
        }
        checkToken();
        
      });
    },
  }),
  endpoints: (build) => ({
    // products
    getFilteredProducts: build.query({
      query: (filterValues) => {
        
        const { categorySlug, colorId, priceSort, page, limit } = filterValues;

        const queryParams = new URLSearchParams();
        if(categorySlug) queryParams.append('categorySlug', categorySlug);
        if(colorId) queryParams.append('colorId', colorId);
        if(priceSort) queryParams.append('priceSort', priceSort);
        if(page) queryParams.append("page", page);
        if(limit) queryParams.append("limit", limit);

        return `products/filter?${queryParams.toString()}`;
      }
    }),
    createProduct: build.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
    }),
    getProductById: build.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    getProductsBySearch: build.query({
      query: (query) => `/products/search?search=${query}`,
    }),

    // categories
    getAllCategories: build.query({
      query: () => `/categories`,
    }),

    // colors
    getAllColors: build.query({
      query: () => `/colors`,
    }),
    createColor: build.mutation({
      query: (color) => ({
        url: "/colors",
        method: "POST",
        body: color,
      }),
    }),

    // orders
    createOrder: build.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
    }),
    getOrdersByLoggedUserId: build.query({
      query: () => ({ // logged logged userId get from the backend which sending by the frontend's Clerk Bearer token 
        url:"/orders/logged-user-orders",
        method: "GET",
      })
    }),
    getOrders: build.query({
      query: () => ({
        url:"/orders",
        method: "GET",
      })
    }),
    getSalesLast7Days: build.query({
      query: () => ({
        url:"/orders/sales/last-seven-days",
        method: "GET",
      })
    }),
    getSalesLast30Days: build.query({
      query: () => ({
        url:"/orders/sales/last-thirty-days",
        method: "GET",
      })
    }),
    
    // payments
    getCheckoutSessionStatus: build.query({
      query: (sessionId) => `/payments/session-status?session_id=${sessionId}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetFilteredProductsQuery, 
  useGetProductByIdQuery, 
  useCreateOrderMutation, 
  useCreateProductMutation, 
  useGetAllColorsQuery, 
  useCreateColorMutation, 
  useGetAllCategoriesQuery, 
  useGetProductsBySearchQuery, 
  useGetCheckoutSessionStatusQuery,
  useGetOrdersByLoggedUserIdQuery,
  useGetOrdersQuery,
  useGetSalesLast7DaysQuery,
  useGetSalesLast30DaysQuery
} = Api;