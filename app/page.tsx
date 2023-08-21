"use client"

import ProductCard from '@/components/ProductCard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Roboto, Montserrat } from 'next/font/google'

const roboto = Roboto({
  weight: "400",
  subsets: ['latin']
})


export interface Product {
  id: number;
  title: string;
  description: string;
  brand: string;
  price: number;
  images: string[];
  category: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name'); // default sort by name

  useEffect(() => {

    const getData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products")

        setProducts(response.data.products)

        setFilteredProducts(response.data.products)

      } catch (error) {
        console.log(error)
      }
    }

    getData();

  }, []);

  const filterProducts = () => {
    let filtered: Product[] = products

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-');
      filtered = filtered.filter((product) => product.price >= +min && product.price <= +max);
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedPriceRange]);

  const sortProducts = (value: string) => {
    setSortBy(value);

    const sorted = [...filteredProducts].sort((a, b) => {
      if (value === 'price') {
        return a.price - b.price;
      }
      // sort by name
      return a.title.localeCompare(b.title);
    });

    setFilteredProducts(sorted);

  };

  return (
    <div className='flex flex-col gap-20 py-10 bg-black w-full h-[100vh] text-white overflow-y-scroll'>
      <div className='flex flex-col gap-10 items-center justify-center'>
        <h1 className={`${roboto.className} text-2xl md:text-3xl lg:text-4xl font-bold`}>Products List</h1>
        <div className='flex flex-col md:flex-row gap-10'>
          <div >
            <label htmlFor="category">Filter by Category: </label>
            <select className='rounded-full text-black p-2 bg-gray-400 ml-2'
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option className='text-center' value="">All</option>
              <option className='text-center' value="smartphones">Smartphones</option>
              <option className='text-center' value="laptops">Laptops</option>
              <option className='text-center' value="fragrances">Fragrances</option>
              <option className='text-center' value="groceries">Groceries</option>
              <option className='text-center' value="furniture">Furniture</option>
            </select>
          </div>

          <div>
            <label htmlFor="priceRange">Filter by Price Range: </label>
            <select className='rounded-full text-black  p-2 bg-gray-400 ml-2'
              id="priceRange"
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
            >
              <option className='text-center ' value="">All</option>
              <option className='text-center' value="0-10">0-10</option>
              <option className='text-center' value="10-50">10-50</option>
              <option className='text-center' value="50-100">50-100</option>
            </select>
          </div>

          <div>
            <label htmlFor="sortBy">Sort by: </label>
            <select className='rounded-full text-black p-2 bg-gray-400 ml-2'
              id="sortBy"
              value={sortBy}
              onChange={(e) => sortProducts(e.target.value)}
            >
              <option className='text-center' value="name">Name</option>
              <option className='text-center' value="price">Price</option>
            </select>
          </div>

        </div>
      </div>

      <div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {(filteredProducts.map((product, index) => (
          <ProductCard product={product} key={index} />
        )))}
      </div>
    </div>
  );
}