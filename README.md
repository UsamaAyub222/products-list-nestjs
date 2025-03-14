# NestJS Analytics API with PostgreSQL and Redis

This project is a NestJS-based API that retrieves and analyzes product sales data. It uses **mysql** as the primary database and **Redis** for caching to improve performance. The API provides an endpoint to fetch the top-selling products based on aggregated sales data. 

Note: performance report file name is performance-report.txt

## Features

- **Product**: Represents a product stored in the database.
- **Order**: Represents sales orders for products.
- **Top-Selling Products**: Fetches the top 10 products based on total sales quantity.
- **Caching**: Uses Redis to cache the results of the top-selling products query for improved performance.
- **Database Optimization**: Implements optimized queries and indexes to reduce database load.

## Schema and Relationships

### Database Schema

- **Products Table**:
  - `id`: Primary key (auto-increment).
  - `name`: Product name.
  - `price`: Product price.
  - `created_at`: Timestamp of product creation.

- **Orders Table**:
  - `id`: Primary key (auto-increment).
  - `product_id`: Foreign key referencing the `products` table.
  - `quantity`: Quantity of the product sold.
  - `ordered_at`: Timestamp of the order.

### Relationships

- **One-to-Many**: A product can have many orders.
- **Many-to-One**: An order belongs to a single product.

---

## Built With

- **Framework**: NestJS
- **Database**: mysql
- **Caching**: Redis
- **ORM**: TypeORM
- **API Testing**: Postman

---

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js and npm

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/UsamaAyub222/products-list-nestjs.git
   cd nestjs-t1

---


# Performance Optimization

## Identified Bottlenecks

### 1. N+1 Queries
- **Issue**: The initial implementation fetched all products and then queried the database for each product's total sales, resulting in multiple queries.
- **Solution**: Replaced with a single query using `JOIN` and `GROUP BY`.

### 2. Slow Query Execution
- **Issue**: The query to calculate total sales was slow for large datasets.
- **Solution**: Added an index on the `product_id` column in the `orders` table.

### 3. High Database Load
- **Issue**: Frequent queries for the same data increased database load.
- **Solution**: Implemented Redis caching to store and serve frequently accessed data.

---

## Optimization Strategies

### 1. Database Optimization
- Added an index on the `product_id` column in the `orders` table.
- Optimized the query to fetch top-selling products using `JOIN` and `GROUP BY`.

### 2. Caching
- Used Redis to cache the results of the top-selling products query.
- Set a TTL (time-to-live) of 60 seconds for the cache.

### 3. Denormalization (Optional)
- Considered creating a `product_sales` table to precompute total sales for each product.

---

## Performance Report

### Before Optimization
- **Response Time**: ~8 seconds for 100 products and 10,000 orders.
- **Query Count**: 101 queries (1 for products + 100 for orders).

### After Optimization
- **Response Time**: ~150ms (with Redis caching).
- **Query Count**: 1 query (optimized query with `JOIN` and `GROUP BY`).

### Tools Used
- **TypeORM Query Logging**: Identified N+1 queries.
- **EXPLAIN**: Analyzed query execution plans.
- **Redis**: Implemented caching for frequently accessed data.

---

## Testing Instructions

1. **Run the Application**
   - Build the application:  
     ```bash
     docker-compose build
     ```
   - Start the application:  
     ```bash
     docker-compose up -d
     ```
   - Run seeder:  
     ```bash
     docker-compose exec app npm run seed
     ```
   - Access the API at:  
     [http://localhost:3000/analytics/top-products](http://localhost:3000/analytics/top-products)

---

## Trade-offs

### 1. Caching TTL vs. Real-Time Data:
- A shorter TTL ensures more up-to-date data but increases database load.
- A longer TTL reduces database load but may serve stale data.

### 2. Denormalization:
- Precomputing aggregates improves query performance but adds complexity to data management.

---