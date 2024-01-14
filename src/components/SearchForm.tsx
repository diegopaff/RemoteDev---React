type SearchFormProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchForm({
  searchText,
  setSearchText,
}: SearchFormProps) {
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(ev.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        onChange={handleChange}
      />
    </form>
  );
}
