// global variables
const QUOTES_URL = "http://localhost:3000/quotes";
const QUERY_STR = "?_embed=likes";
const quoteList = document.getElementById("quote-list");
const newQuoteForm = document.getElementById("new-quote-form");

const handleSubmit = (e) => {
  e.preventDefault();
};

const handleDelete = (e, _id) => {
  deleteJSON(`${QUOTES_URL}/${_id}`)
    .then((deletedQuote) => {
      if (deletedQuote) {
        getAllQuotes();
      }
    })
    .catch((err) => console.log("Error: ", err));
};

const appendQuoteCards = (quotesArr) => {
  quoteList.innerHTML = "";
  quotesArr.forEach(({ id, quote, author }) => {
    const li = document.createElement("li");
    li.id = `quote-${id}-li`;
    li.classList.add("quote-card");

    const blockquote = document.createElement("blockquote");
    blockquote.classList.add("blockquote");

    const p = document.createElement("p");
    p.classList.add("mb-0");
    p.textContent = quote;

    const footer = document.createElement("footer");
    footer.classList.add("blockquote-footer");
    footer.textContent = author;

    const br = document.createElement("br");

    const likeBtn = document.createElement("button");
    likeBtn.classList.add("btn-success");
    const span = document.createElement("span");
    span.textContent = "0"; //TODO add like logic - fetch all likes, append values
    likeBtn.append("Likes: ", span);

    const delBtn = document.createElement("button");
    delBtn.classList.add("btn-danger");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", (e) => handleDelete(e, id));

    blockquote.append(p, footer, br, likeBtn, delBtn);
    li.appendChild(blockquote);
    quoteList.appendChild(li);
  });
};

const getAllQuotes = () => {
  getJSON(QUOTES_URL + QUERY_STR)
    .then((allQuotes) => appendQuoteCards(allQuotes))
    .catch((err) => console.log("Error: ", err));
};

const init = () => {
  getAllQuotes();
  newQuoteForm.addEventListener("submit", handleSubmit);
};

init();
