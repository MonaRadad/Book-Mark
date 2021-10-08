let $ = document;
const modalShow = $.getElementById("show-modal");
const modal = $.getElementById("modal");
const closeModal = $.getElementById("close-modal");
const websiteNameEl = $.getElementById("website-name");
const websiteUrlEl = $.getElementById("website-url");
const btnSave = $.querySelector("button");
const bookmarksContainer = $.getElementById("bookmarks-container");
// console.log(btnSave)

let bookMarks = [];

const showModal = () => {
  // console.log('clicked')
  modal.classList.add("show-modal");
};

const modalClose = () => {
  modal.classList.remove("show-modal");
};

const buildBookmark = () => {
  bookmarksContainer.innerHTML = "";

  bookMarks.forEach((bookmark) => {
    const name = bookmark.name;
    const url = bookmark.url;

    // Item
    const item = document.createElement("div");
    item.classList.add("item");

    // CloseIcon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fa", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    // closeIcon.onclick = deleteBookmark(url)
    closeIcon.addEventListener("click", () => {
      deleteBookmark(url);
    });

    // link & favicon container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");

    // Link
    const link = document.createElement("a");
    link.setAttribute("href", "https://" + url);
    link.setAttribute("target", "_blank");
    link.textContent = name;

    // img (favicon)
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      "https://s2.googleusercontent.com/s2/favicons?domain=" + url
    );
    favicon.setAttribute("alt", name);

    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);

    bookmarksContainer.appendChild(item);
  });
};

const fetchBookmarks = () => {
  if (localStorage.getItem("bookmarks")) {
    bookMarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookMarks = [];
    localStorage.setItem("bookmarks", JSON.stringify(bookMarks));
  }
  buildBookmark();
};

const storeBookmark = (e) => {
  e.preventDefault();
  // console.log("Click Shod")
  let nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  // console.log(nameValue, urlValue)

  if (!inputsValidation(nameValue, urlValue)) {
    return false;
  }

  const bookmarkObj = {
    name: nameValue,
    url: urlValue,
  };

  bookMarks.push(bookmarkObj);
  localStorage.setItem("bookmarks", JSON.stringify(bookMarks));
  buildBookmark();
  websiteNameEl.value = "";
  websiteUrlEl.value = "";
  modalClose();

  // console.log(bookMarks)
};

const inputsValidation = (name, url) => {
  if (name === "" || url === "") {
    alert("Please fill both inputs");
    return false;
  } else if (name.length > 30 || url.length > 45) {
    alert("The values entered are too high");
    return false;
  }
  return true;
};

// delete function for bookmarks
const deleteBookmark = (inputUrl) => {
  // console.log(inputUrl)
  let deleteBookmarkConfirm = confirm("Are you sure you want to delete it?");

  if (deleteBookmarkConfirm) {
    bookMarks.forEach((bookmark, index) => {
      if (bookmark.url == inputUrl) {
        bookMarks.splice(index, 1);
      }
    });
    localStorage.setItem("bookmarks", JSON.stringify(bookMarks));
    fetchBookmarks();
  }
};

// Events
modalShow.addEventListener("click", showModal);
closeModal.addEventListener("click", modalClose);
btnSave.addEventListener("click", storeBookmark);

fetchBookmarks();
