import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogImage, setDogImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Kunin ang lahat ng dog breeds mula sa API pagka-load ng page
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        setBreeds(Object.keys(data.message));
      })
      .catch((err) => console.error("Error fetching breeds:", err));
  }, []);

  // Function para kumuha ng random image ng napiling breed gamit ang API
  const fetchDogImage = async (breed) => {
    if (!breed) return;
    setLoading(true);
    try {
      const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      const data = await res.json();
      setDogImage(data.message);
    } catch (err) {
      console.error("Error fetching image:", err);
    } finally {
      setLoading(false);
    }
  };

  // Kapag nagbago ang pinili sa dropdown
  const handleBreedChange = (e) => {
    const breed = e.target.value;
    setSelectedBreed(breed);
    if (breed) {
      fetchDogImage(breed);
    } else {
      setDogImage("");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        {/* Dropdown sa taas para sa Select Breed */}
        <select value={selectedBreed} onChange={handleBreedChange}>
          <option value="">Select Breed</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed.charAt(0).toUpperCase() + breed.slice(1)}
            </option>
          ))}
        </select>

        {/* Lalagyan ng Image sa gitna */}
        <div className="image-box">
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : dogImage ? (
            <img src={dogImage} alt={selectedBreed} />
          ) : (
            <p className="placeholder-text">Pumili ng breed sa taas</p>
          )}
        </div>

        {/* Fetch Again Button sa ibaba */}
        <button
          onClick={() => fetchDogImage(selectedBreed)}
          disabled={!selectedBreed || loading}
        >
          Fetch Again
        </button>
      </div>
    </div>
  );
}

export default App;