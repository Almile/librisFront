import  GenreSelector  from "../components/GenreSelector"
function HomePage() {
  const handleGenreSelection = (selectedGenres) => {
    console.log(selectedGenres)
  }
    return (
      <main>
        <GenreSelector onSave={handleGenreSelection} />

      </main>
    )
}

export default HomePage