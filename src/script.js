document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Menghentikan pengiriman form default

    const formData = new FormData(this); // Membuat objek FormData dari form

    try {
      const response = await fetch("http://localhost:3000/search", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat mengirim permintaan");
      }

      const results = await response.json();
      displayResults(results); // Tampilkan hasil pencarian ke pengguna
    } catch (error) {
      console.error("Error:", error);
      // TODO: Handle error jika terjadi kesalahan saat mengirim permintaan
    }
  });

function displayResults(results) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    const noResultsElement = document.createElement("p");
    noResultsElement.textContent = "Tidak ada hasil ditemukan";
    resultsContainer.appendChild(noResultsElement);
  } else {
    results.forEach((result) => {
      const resultElement = document.createElement("div");
      resultElement.classList.add("result-item");

      const imageElement = document.createElement("img");
      imageElement.src = result.image; // URL gambar dari hasil pencarian
      imageElement.alt = result.name; // Deskripsi alternatif untuk gambar

      const nameElement = document.createElement("p");
      nameElement.textContent = result.name;

      resultElement.appendChild(imageElement);
      resultElement.appendChild(nameElement);

      resultsContainer.appendChild(resultElement);
    });
  }
}
