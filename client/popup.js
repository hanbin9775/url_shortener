const shortenerBtn = document.getElementsByTagName("button")[0];
const popup = document.getElementsByClassName('popup')[0];
const input = document.getElementsByTagName('input')[0];
const urlContainer = document.getElementsByClassName('urlContainer')[0];

let isConverted = false;

// When the button is clicked, inject setPageBackgroundColor into current page
shortenerBtn.addEventListener("click", async () => {
  isConverted ? refresh() : convertUrl();
});

// The body of this function will be execuetd as a content script inside the
// current page
async function convertUrl() {
  input.style.display = 'none';
  urlContainer.style.display = 'block';

  // get convertedUrl

  const url = "https://shrt-hanbin9775.vercel.app/api/url";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      originalUrl: input.value
    }),
  };
  urlContainer.innerHTML = 'processing...';
  const { shortenUrl } = await fetch(url, options).then((response) => response.json())

  urlContainer.innerHTML = shortenUrl;
  shortenerBtn.innerHTML = 'Refresh';
  isConverted = true;
}

function refresh() {
  input.style.display = 'block';
  urlContainer.style.display = 'none';
  shortenerBtn.innerHTML = 'Shorten';
  isConverted = false;
}