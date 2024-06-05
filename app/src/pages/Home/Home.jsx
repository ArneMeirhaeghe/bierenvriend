import { useEffect, useState } from "react";
import ErrorComponent from "../../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useProducts } from "../../contexts/ProductContext";
import NoResults from "../../components/NoResults/NoResults";
import Product from "../../models/Product";
import styles from "./Home.module.css";

function Home() {
  const {
    products,
    isLoading,
    error,
    user,
    fav,
    handleFavoriteToggle,
    handleBestelClick,
  } = useProducts();
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [packagings, setPackagings] = useState([]);
  const [types, setTypes] = useState([]);
  const [sortOption, setSortOption] = useState("az");

  const [formData, setFormData] = useState({
    search: "",
    category: "",
    maxPrice: "",
    minStock: "",
    region: "",
    packaging: "",
    type: "",
    producer: "",
    alcoholPercentage: "",
  });

  const handleSearch = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const uniqueCategories = new Set();
    Object.values(products).forEach((product) => {
      if (product.category) uniqueCategories.add(product.category);
    });
    setCategories([...uniqueCategories]);
  }, [products]);

  useEffect(() => {
    const uniqueRegions = new Set();
    Object.values(products).forEach((product) => {
      if (product.region) uniqueRegions.add(product.region);
    });
    setRegions([...uniqueRegions]);
  }, [products]);

  useEffect(() => {
    const uniquePackagings = new Set();
    Object.values(products).forEach((product) => {
      if (product.packaging) uniquePackagings.add(product.packaging);
    });
    setPackagings([...uniquePackagings]);
  }, [products]);

  useEffect(() => {
    const uniqueTypes = new Set();
    Object.values(products).forEach((product) => {
      if (product.type) uniqueTypes.add(product.type);
    });
    setTypes([...uniqueTypes]);
  }, [products]);

  const sortProducts = (data) => {
    return data.sort((a, b) => {
      if (!a || !b || !a.name || !b.name) return 0;
      if (sortOption === "new") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOption === "old") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortOption === "az") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "za") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  };

  const filter = () => {
    const dataCopy = Object.values(products);
    const filteredArray = dataCopy.filter(
      (dataItem) =>
        dataItem &&
        dataItem.name &&
        dataItem.name.toLowerCase().includes(formData.search.toLowerCase()) &&
        dataItem.category
          .toLowerCase()
          .includes(formData.category.toLowerCase()) &&
        (!formData.maxPrice || dataItem.price <= formData.maxPrice) &&
        (!formData.minStock || dataItem.stock >= formData.minStock) &&
        dataItem.region.toLowerCase().includes(formData.region.toLowerCase()) &&
        dataItem.packaging
          .toLowerCase()
          .includes(formData.packaging.toLowerCase()) &&
        dataItem.type.toLowerCase().includes(formData.type.toLowerCase()) &&
        dataItem.producer
          .toLowerCase()
          .includes(formData.producer.toLowerCase()) &&
        (!formData.alcoholPercentage ||
          dataItem.alcoholPercentage <= formData.alcoholPercentage)
    );

    const sortedArray = sortProducts(filteredArray);
    setFilteredData(sortedArray);
  };

  useEffect(() => {
    if (products) {
      const initialFilteredData = Object.values(products).map(
        (product) => new Product(product)
      );
      const sortedData = sortProducts(initialFilteredData);
      setFilteredData(sortedData);
    }
  }, [products]);

  useEffect(() => {
    if (products) filter();
  }, [formData, sortOption]);

  useEffect(() => {
    // Zet standaard de sorteeroptie op A-Z bij het laden van de pagina
    setSortOption("az");
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <ErrorComponent
        message={error.message || "Failed to fetch product details."}
      />
    );

  return (
    <div className={styles.producten}>
      <div className={styles.secnav}>
        <div className={styles.bread}>
          <a href="/">Producten</a> &gt;
        </div>
        <h1>producten</h1>
        <div>
          <input
            type="text"
            name="search"
            value={formData.search}
            onChange={handleSearch}
            placeholder="Zoeken"
            className={styles.search}
          />
        </div>
        <div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.sort}
          >
            <option value="new">Nieuwste</option>
            <option value="old">Oudste</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>
      </div>
      <div className={styles.container}>
        <section className={styles.filters}>
          <select
            name="category"
            value={formData.category}
            onChange={handleSearch}
            className={styles.filterItem}
          >
            <option value="">Categorie</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleSearch}
            placeholder="Prijs"
            className={styles.filterItem}
            min={0}
          />
          <select
            name="region"
            value={formData.region}
            onChange={handleSearch}
            className={styles.filterItem}
          >
            <option value="">Regio</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            name="packaging"
            value={formData.packaging}
            onChange={handleSearch}
            className={styles.filterItem}
          >
            <option value="">Verpakking</option>
            {packagings.map((packaging, index) => (
              <option key={index} value={packaging}>
                {packaging}
              </option>
            ))}
          </select>
          <select
            name="type"
            value={formData.type}
            onChange={handleSearch}
            className={styles.filterItem}
          >
            <option value="">Dranksoort</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="producer"
            value={formData.producer}
            onChange={handleSearch}
            placeholder="Producent"
            className={styles.filterItem}
          />
          <input
            type="number"
            name="alcoholPercentage"
            value={formData.alcoholPercentage}
            onChange={handleSearch}
            placeholder="Alcohol Percentage"
            className={styles.filterItem}
          />
        </section>
        <section className={styles.section}>
          {Array.isArray(filteredData) && filteredData.length !== 0 ? (
            filteredData.map((product) => {
              const favorite = fav.find((f) => f.productID === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  user={user}
                  isFav={!!favorite}
                  favoriteID={favorite ? favorite.id : null}
                  onFavoriteToggle={handleFavoriteToggle}
                  onBestelClick={handleBestelClick}
                />
              );
            })
          ) : (
            <NoResults />
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
