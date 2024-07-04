// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


export function renderListWithTemplate(templateFn, parentElement, list, clear = true, position = "afterbegin") {
  if (clear){
    parentElement.replaceChildren();
  }

  const htmlStrings =  list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderWithTemplate(templateFn, parentElement, data, clear = true, position = "afterbegin") {
  if (clear){
    parentElement.replaceChildren();
  }

  const html = templateFn(data);
  parentElement.insertAdjacentHTML(position, html);
}

export function updateQuantity(productId, change) {
  const input = document.getElementById(`input-quantity-${productId}`);
  const currentValue = parseInt(input.value, 10);

  let newValue = currentValue + change;
  if(newValue >= 1){
      input.value = currentValue + change;
  }    
}