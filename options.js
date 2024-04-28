function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    campus: document.querySelector("#campus-selection").value,
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#campus-selection").value =
      result.campus || "west-lafayette";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("campus");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
