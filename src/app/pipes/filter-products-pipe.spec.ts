import { IProduct } from "../products/product";
import { FilterProductsPipe } from "./filter-products-pipe";

describe('FilterProductsPipe', () => {
  let pipe: FilterProductsPipe;

  const mockProducts: IProduct[] = [
    { id: "1", productName: 'Laptop', productCode: 'LP001', description: 'High performance laptop', releaseDate: '2023-01-01', price: 1200, starRating: 4.5, imageUrl: 'assets/images/laptop.png' },
    { id: "2", productName: 'Phone', productCode: 'PH001', description: 'Latest smartphone', releaseDate: '2023-02-01', price: 800, starRating: 4.0, imageUrl: 'assets/images/phone.png' },
    { id: "3", productName: 'Tablet', productCode: 'TB001', description: 'Portable tablet device', releaseDate: '2023-03-01', price: 600, starRating: 4.2, imageUrl: 'assets/images/tablet.png' }
  ];

  beforeEach(() => {
    pipe = new FilterProductsPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all products if filter is empty', () => {
    const result = pipe.transform(mockProducts, '');
    expect(result.length).toBe(3);
    expect(result).toEqual(mockProducts);
  });

  it('should filter products by lowercase string', () => {
    const result = pipe.transform(mockProducts, 'lap');
    expect(result.length).toBe(1);
    expect(result[0].productName).toBe('Laptop');
  });

  it('should filter products by mixed-case string', () => {
    const result = pipe.transform(mockProducts, 'PhOnE');
    expect(result.length).toBe(1);
    expect(result[0].productName).toBe('Phone');
  });

  it('should return empty array if no match', () => {
    const result = pipe.transform(mockProducts, 'camera');
    expect(result.length).toBe(0);
  });

  it('should handle null or undefined filterBy safely', () => {
    const result = pipe.transform(mockProducts, null as unknown as string);
    expect(result.length).toBe(3);
  });
});
