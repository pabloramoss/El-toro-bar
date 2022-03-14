import axios from "axios";
import Papa from "papaparse";
import { IProduct } from "../types/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  list: async () =>{
    return axios.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vSbSy14M9k_RCc6t0V0eikXwrk9KeWGwjA4SA6CGBrk029MoG-4acmF8lw3bWR8UqEqq3IP5JoCDZJo/pub?output=csv", {
      responseType: "blob"
    }).then(
      response =>{
        return new Promise<IProduct[]>((resolve, reject)=>{
          Papa.parse(response.data, {
            header: true,
            complete: results => {
              const products = results.data as IProduct[]
              return resolve(products.map(product => ({
                ...product,
                price: Number(product.price)
              })));
            },
            error: (error)=> {
              return reject(error.message);
            }
          });
        })
      }
    );
  },
};