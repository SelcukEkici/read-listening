import React, { useState } from "react";
import { toast } from "react-toastify";
import BookCard from "./companents/BookCards";
import { ADD_TYPE } from "./companents/buttonType";
import CustomButton from "./companents/CustomButton";
const App = () => {
  const [bookName, setBookName] = useState("");

  const [bookList, setBookList] = useState([]);
  //console.log(new Date().toLocaleString())
  const addBook = (e) => {
    e.preventDefault();

    const newBook = {
      id: new Date().getTime(),
      bookTitle: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    setBookList([...bookList, newBook]);
    setBookName("");

    toast.success("Kitap Basarıyla Eklendi");
  };
  const handleDelete = (deleteId) => {
    const filteredList = bookList.filter((book) => book.id !== deleteId);
    setBookList(filteredList);

    toast.error("Kitapliktan  Kaldırıldı")
  };

  const handleReadChange = (book) => {
    const updateBook = { ...book, isRead: !book.isRead };
    const cloneBookList = [...bookList];

    const bookIndex = cloneBookList.findIndex((item) => item.id === book.id);

    cloneBookList.splice(bookIndex, 1, updateBook);
    setBookList(cloneBookList);
  };

  const handleEdit = (book, newTitle) => {
    const updated = { ...book, bookTitle: newTitle };

    const newList = bookList.map((book) =>
      book.id !== updated.id ? book : updated
    );
    setBookList(newList);
    toast.info ("Kitap Güncelendi")
  };

  return (
    <div>
      <header className="bg-dark text-light py-2 text-center fs-5">
        Kitap Kurdu
      </header>
      <div className="container border pb-5">
        <form className="d-flex gap-3 mt-4" onSubmit={addBook}>
          <input
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Kitap Adı Giriniz "
            className="form-control shadow"
          />
          <CustomButton type={ADD_TYPE} title={"Ekle"} />
        </form>
        <div className="d-flex flex-column gap-5 mt-3">
          {bookList.length === 0 ? (
            <p>Henüz herhangi bir kitap eklenmedi</p>
          ) : (
            bookList.map((book) => {
              // console.log("kitap", book)
              return (
                <BookCard
                  readUpdateClick={() => handleReadChange(book)}
                  deleteClick={() => handleDelete(book.id)}
                  handleEdit={handleEdit}
                  bookInfo={book}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
